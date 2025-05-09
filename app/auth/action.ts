"use server";

import { signJWT } from "@/utils/auth";
import { devUpload, isValidFileType, prodUpload } from "@/utils/helpers";
import prisma from "@/utils/prisma";
import { routes } from "@/utils/routes";
import { UserRoles } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const signupSchema = z
  .object({
    email: z.string().email("Invalid Email"),
    password: z
      .string()
      .regex(/.*[A-Z].*/, "One uppercase character")
      .regex(/.*[a-z].*/, "One lowercase character")
      .regex(/.*\d.*/, "One number")
      .regex(
        /.*[`~<>?,./!@#$%^&*()\-_+="'|{}[\];:\\].*/,
        "One special character"
      )
      .min(8, "Must be at least 8 characters in length"),
    confirmPassword: z.string(),
    avatar: z
      .any()
      .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
      .refine((file) => isValidFileType(file?.name), "Not a valid image."),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signup(prevState: any, formData: FormData) {
  try {
    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: (formData.get("role") as UserRoles) ?? "USER",
    };
    const avatar = formData.get("avatar") as unknown as File;

    const validateBody = signupSchema.safeParse({
      ...body,
      avatar,
      confirmPassword: formData.get("confirmPassword") as string,
    });
    if (!validateBody.success) {
      return {
        errors: Object.entries(validateBody.error.flatten().fieldErrors).map(
          ([key, errorValue]) => ({ [key]: errorValue[0] })
        )[0],
      };
    }

    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    if (!avatar || avatar.name === "undefined") {
      throw new Error("Avatar not found");
    }
    const bytes = await avatar.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let avatarImage: string;

    if (process.env.NODE_ENV === "development") {
      const uploadDIR = `${process.cwd()}/public/uploads/users`;

      avatarImage = await devUpload(uploadDIR, avatar.name, buffer);
    } else {
      const upload = await prodUpload(buffer, avatar.type, "users", {
        transformation: { width: 60, height: 60, crop: "thumb" },
      });

      if (!upload) {
        throw new Error("Error uploading image");
      }
      avatarImage = (upload as { secure_url: string })?.secure_url;
    }

    const user = await prisma.user.create({
      data: { avatar: avatarImage, ...body },
    });

    if (!user) {
      throw new Error("Error registering user");
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(error.message);
      }
    }
    throw new Error("Server Error");
  }

  redirect(routes.login);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = async (prevState: any, formData: FormData) => {
  try {
    const body = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validateBody = loginSchema.safeParse(body);
    if (!validateBody.success) {
      return {
        errors: Object.entries(validateBody.error.flatten().fieldErrors).map(
          ([key, errorValue]) => ({ [key]: errorValue[0] })
        )[0],
      };
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      throw new Error("Invalid Credentials");
    }

    const accessToken = await signJWT(
      { sub: user.id, isSuperAdmin: user.isSuperAdmin, role: user.role },
      { exp: `${process.env.JWT_EXPIRES}m` }
    );
    const maxAge = parseInt(process.env.JWT_EXPIRES as string) * 60;
    const cookieOptions = {
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge,
    };

    cookies().set(cookieOptions);
    cookies().set({ name: "userId", value: user.id });
    cookies().set({ name: "role", value: user.role });
    cookies().set({
      name: "loggedIn",
      value: "true",
      maxAge,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(error.message);
      }
    }

    throw new Error("Server Error");
  }

  redirect(routes.home);
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("loggedIn");
  (await cookies()).delete("role");

  redirect(routes.login);
};
