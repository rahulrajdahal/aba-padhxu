"use server";

import { signJWT } from "@/utils/auth";
import {
  devUpload,
  getErrorResponse,
  getSuccessResponse,
  isValidFileType,
  prodUpload,
} from "@/utils/helpers";
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
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid Email"),
});
const resetPasswordSchema = z
  .object({
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
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
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
      return getErrorResponse(
        "Validation Error",
        400,
        "Error",
        Object.entries(validateBody.error.flatten().fieldErrors).map(
          ([key, errorValue]) => ({ [key]: errorValue[0] })
        )[0]
      );
    }

    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    if (!avatar || avatar.name === "undefined") {
      return getErrorResponse("Avatar not found", 400);
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
        return getErrorResponse("Error uploading image", 400);
      }
      avatarImage = (upload as { secure_url: string })?.secure_url;
    }

    const user = await prisma.user.create({
      data: { avatar: avatarImage, ...body },
    });

    if (!user) {
      return getErrorResponse("Error registering user", 400);
    }

    return getSuccessResponse("User Registered");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return getErrorResponse(error.message);
      }
    }
    return getErrorResponse();
  }
}

export const login = async (prevState: unknown, formData: FormData) => {
  try {
    const body = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validateBody = loginSchema.safeParse(body);
    if (!validateBody.success) {
      return getErrorResponse(
        "Validation Error",
        400,
        "Error",
        Object.entries(validateBody.error.flatten().fieldErrors).map(
          ([key, errorValue]) => ({ [key]: errorValue[0] })
        )[0]
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      return getErrorResponse("Invalid Credentials", 400);
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

    (await cookies()).set(cookieOptions);
    (await cookies()).set({ name: "userId", value: user.id });
    (await cookies()).set({ name: "role", value: user.role });
    (await cookies()).set({
      name: "loggedIn",
      value: "true",
      maxAge,
    });

    return getSuccessResponse("Login successful.");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return getErrorResponse(error.message);
      }
    }
    return getErrorResponse();
  }
};

export const forgotPassword = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const body = {
      email: formData.get("email") as string,
    };

    const validateBody = forgotPasswordSchema.safeParse(body);
    if (!validateBody.success) {
      return getErrorResponse(
        "Validation Error",
        400,
        "Error",
        Object.entries(validateBody.error.flatten().fieldErrors).map(
          ([key, errorValue]) => ({ [key]: errorValue[0] })
        )[0]
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      return getErrorResponse("Email does not exist.", 400);
    }

    return getSuccessResponse("A password reset link was sent to your email.");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return getErrorResponse(error.message);
      }
    }
    return getErrorResponse();
  }
};

export const resetPassword = async (prevState: unknown, formData: FormData) => {
  try {
    const body = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const validateBody = resetPasswordSchema.safeParse(body);
    if (!validateBody.success) {
      return getErrorResponse(
        "Validation Error",
        400,
        "Error",
        Object.entries(validateBody.error.flatten().fieldErrors).map(
          ([key, errorValue]) => ({ [key]: errorValue[0] })
        )[0]
      );
    }

    return getSuccessResponse("Your password was reset. Login to continue.");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return getErrorResponse(error.message);
      }
    }
    return getErrorResponse();
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("loggedIn");
  (await cookies()).delete("role");

  redirect(routes.login);
};
