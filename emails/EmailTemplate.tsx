import { Head, Heading } from "@react-email/components";
import React from "react";

interface EmailTemplateProps extends React.ComponentPropsWithoutRef<"div"> {
  title: string;
  heading: string;
  body: string;
}

export default function EmailTemplate({
  title,
  heading,
  body,
}: Readonly<EmailTemplateProps>) {
  return (
    <div className="flex flex-col gap-12 items-start">
      <Head>
        <title>{title}</title>
      </Head>
      <Heading as="h2">{heading}</Heading>

      <p className="text-base">{body}</p>
    </div>
  );
}
