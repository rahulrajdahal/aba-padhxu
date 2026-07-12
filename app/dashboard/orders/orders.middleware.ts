import EmailTemplate from "@/emails/EmailTemplate";
import { User } from "@/generated/prisma/client/client";
import { sendEmail } from "@/lib/email";
import { logger } from "@/lib/logger";
import { errorResponse, okResponse, serverError } from "@/lib/responses";
import { render } from "@react-email/components";

export const sendOrderEmail = async (
  user: Pick<User, "email" | "id">,
  message = "An order email was just sent!",
) => {
  try {
    const emailHtml = await render(
      EmailTemplate({
        title: "Order Confirmation",
        heading: "Order Confirmation",
        body: `Your order has been confirmed.`,
      }),
    );

    await sendEmail("Order Confirmation", user.email, emailHtml);

    return okResponse(message);
  } catch (error) {
    logger.error("Error sending mail", error);
    if (error instanceof Error) {
      return errorResponse(error.message);
    }
    return serverError();
  }
};
