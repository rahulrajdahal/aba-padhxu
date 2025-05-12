"use server";

import EmailTemplate from "@/emails/EmailTemplate";
import { signJWT, verifyJWT } from "@/utils/auth";
import {
  devUpload,
  getErrorResponse,
  getSuccessResponse,
  isValidFileType,
  prodUpload,
} from "@/utils/helpers";
import { transporter } from "@/utils/nodemailer";
import prisma from "@/utils/prisma";
import { routes } from "@/utils/routes";
import { User, UserRoles } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { render } from "@react-email/components";
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

    const existingUser = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (existingUser) {
      if (!existingUser.emailConfirmed) {
        return await sendConfirmationEmail(existingUser);
      }
      return getErrorResponse("User already exists", 400);
    }

    const user = await prisma.user.create({
      data: { avatar: avatarImage, ...body },
    });

    if (!user) {
      return getErrorResponse("Error registering user", 400);
    }

    return await sendConfirmationEmail(user)

  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return getErrorResponse(error.message);
      }
    }
    return getErrorResponse();
  }
}


const sendConfirmationEmail = async (
  user: Pick<User, "email" | "id" | "role">, message = "An confirmation email was just sent!"
) => {
  try {
    const emailToken = await signJWT(
      { email: user.email, sub: user.id, role: user.role },
      { exp: "3600s" }
    );

    const tokenBody = { token: emailToken, email: user.email };
    await prisma.token.create({ data: tokenBody });

    const emailHtml = await render(
      EmailTemplate({
        title: "Sign up with Aba Padhxu",
        heading: "Email Confirmation",
        body: `Follow the provided link to activate your account. http://localhost:3000/auth/confirm-email/${emailToken}`,
      })
    );

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: user.email,
      subject: "Sign up with Aba Padhxu",
      html: emailHtml,
    };

    await new Promise((resolve, reject) =>
      transporter.sendMail(mailOptions, function (error: unknown) {
        if (error) {
          reject(new Error("Error sending mail."));
        } else {
          resolve(true);
        }
      })
    );

    return getSuccessResponse(message);
  } catch (error) {
    if (error instanceof Error) {
      return getErrorResponse(error.message);
    }
    return getErrorResponse("Error sending mail", 500, error);
  }
};

export const confirmEmail = async (emailToken: string) => {
  try {
    const token = await prisma.token.findFirst({
      where: { token: emailToken },
    });

    if (!token || token.token !== emailToken) {
      return getErrorResponse("Invalid request.");
    }

    if (!(await verifyJWT(emailToken))) {
      return getErrorResponse("Invalid request.");
    }

    const user = await prisma.user.findFirst({ where: { email: token.email } });

    if (!user) {
      return getErrorResponse("Invalid request.");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailConfirmed: true },
    });

    await prisma.token.delete({ where: { id: token.id } });

    return getSuccessResponse("User Email confirmed. Login to continue.");
  } catch (error) {
    return getErrorResponse("Server Error", 500, error);
  }
};

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

    if (!user.emailConfirmed) {
      return await sendConfirmationEmail(user, "User email not confirmed. Please check your email for confirmation link.")
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

    const validatedFields = forgotPasswordSchema.safeParse(body);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return getErrorResponse(
        "Validation Error",
        undefined,
        validatedFields.error.flatten().fieldErrors
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return getErrorResponse("Email not registered.", 400);
    }

    const hashToken = await signJWT(
      { email: user.email, sub: user.email, role: user.role },
      { exp: "3600s" }
    );

    const tokenBody = { token: hashToken, email: user.email };

    await prisma.token.create({ data: tokenBody });

    const emailHtml = await render(
      EmailTemplate({
        title: "Password reset request",
        heading: "Reset Password",
        body: `Follow the provided link to reset your account password. http://localhost:3000/auth/reset-password/${hashToken}`,
      })
    );

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: user.email,
      subject: "Reset Password in Aba Padhxu",
      html: emailHtml,
    };

    await new Promise((resolve, reject) =>
      transporter.sendMail(mailOptions, function (error: any) {
        if (error) {
          reject(new Error("Error sending mail"));
        } else {
          resolve(true);
        }
      })
    );

    return getSuccessResponse(
      "A reset password link has been sent to your email."
    );
  } catch (error) {
    return getErrorResponse("Server Error", 500, error);
  }
};

export const resetPassword = async (prevState: unknown, formData: FormData) => {
  try {
    const body = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const validatedFields = resetPasswordSchema.safeParse(body);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return getErrorResponse(
        "Validation Error",
        undefined,
        validatedFields.error.flatten().fieldErrors
      );
    }

    const token = await prisma.token.findFirst({
      where: {
        token: formData.get("token") as string,
      },
    });

    if (!token) {
      return getErrorResponse("Invalid request.");
    }

    const user = await prisma.user.findFirst({ where: { email: token.email } });

    await prisma.token.delete({ where: { id: token.id } });

    if (!user) {
      return getErrorResponse("Invalid request.");
    }

    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: body.password },
    });

    return getSuccessResponse("Password updated.");
  } catch (error) {
    return getErrorResponse("Server Error", 500, error);
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("loggedIn");
  (await cookies()).delete("role");

  redirect(routes.login);
};

export const getNavbarProps = async () => {
  const role = (await cookies()).get("role")?.value as UserRoles;
  const isLoggedIn = (await cookies()).get("loggedIn")?.value === 'true';

  const count = (await cookies())?.get("cartItems")?.value
    ? JSON.parse((await cookies())?.get("cartItems")?.value as string).length
    : 0;

  return { role, isLoggedIn, count };
}