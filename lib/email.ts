import { generateToken } from "@/app/dashboard/tokens/middleware";
import { createToken } from "@/app/dashboard/tokens/tokens.service";
import EmailTemplate from "@/emails/EmailTemplate";
import { User } from "@/generated/prisma/client/client";
import { transporter } from "@/utils/nodemailer";
import { routes } from "@/utils/routes";
import { render } from "@react-email/components";
import { logger } from "./logger";
import { errorResponse, okResponse } from "./responses";

export const sendEmail = async (
  subject: string,
  to: string,
  emailHTML: string,
) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      html: emailHTML,
    };

    await new Promise((resolve, reject) =>
      transporter.sendMail(mailOptions, function (error: unknown) {
        if (error) {
          reject(new Error("Error sending mail."));
        } else {
          resolve(true);
        }
      }),
    );
  } catch (error) {
    logger.error("Error sending mail", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong.");
  }
};

export const sendConfirmationEmail = async (
  user: Pick<User, "email" | "id">,
  message: string = "An confirmation email was just sent!",
) => {
  try {
    const emailToken = generateToken();

    await createToken({
      token: emailToken,
      type: "EMAIL_CONFIRMATION",
      userId: user.id,
    });

    const emailHtml = await render(
      EmailTemplate({
        title: "Sign up with Aba Padhxu",
        heading: "Email Confirmation",
        body: `Follow the provided link to activate your account. ${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${routes.confirmEmail}/${emailToken}`,
      }),
    );

    await sendEmail("Confirmation Email", user.email, emailHtml);

    return okResponse(message);
  } catch (error) {
    logger.error("Error sending mail", error);
    return errorResponse(
      "An unexpected error occurred while sending the email. Please try again later.",
    );
  }
};

export const sendForgotPasswordEmail = async (
  user: Pick<User, "email" | "id">,
) => {
  try {
    const resetToken = generateToken();
    await createToken({
      token: resetToken,
      type: "PASSWORD_RESET",
      userId: user.id,
    });

    const emailHtml = await render(
      EmailTemplate({
        title: "Password reset request",
        heading: "Reset Password",
        body: `Follow the provided link to reset your account password. ${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${routes.resetPassword}/${resetToken}`,
      }),
    );

    await sendEmail("Reset Password in Aba Padhxu", user.email, emailHtml);

    return okResponse("A reset password link has been sent to your email.");
  } catch (error) {
    logger.error("Error sending mail", error);
    return errorResponse(
      "An unexpected error occurred while sending the email. Please try again later.",
    );
  }
};

export const sendResetPasswordEmail = async (to: string) => {
  try {
    const emailHtml = await render(
      EmailTemplate({
        title: "Password Updated",
        heading: "Your Password has been updated!",
        body: "Your Aba Padhxu account's password was recently updated. If you did not make this change, please contact our support team immediately.",
      }),
    );

    await sendEmail("Password Updated in Aba Padhxu", to, emailHtml);

    return okResponse("Your password has been updated successfully.");
  } catch (error) {
    logger.error("Error sending mail", error);
    return errorResponse(
      "An unexpected error occurred while sending the email. Please try again later.",
    );
  }
};
