"use client";

import { Button, Form, Input } from "@/components";
import { routes } from "@/utils/routes";
import { Author } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { updateAuthor } from "../actions";

type EditAuthorProps = {
  author: Author;
};

export default function EditAuthor({ author }: Readonly<EditAuthorProps>) {
  const router = useRouter();

  const { name, id } = author;

  const handleUpdateAuthor = async (prevState: unknown, formData: FormData) => {
    formData.append("id", id);

    const state = await updateAuthor(prevState, formData);

    if (state?.type === "success") {
      toast.success(state.message);
      router.push(`${routes.dashboard}${routes.authors}`);
    }

    if (state?.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, pending] = useActionState(handleUpdateAuthor, null);

  return (
    <Form action={formAction} title="Edit Author">
      <Input
        label="Name"
        error={state?.errors?.name}
        inputProps={{
          name: "name",
          required: true,
          defaultValue: name,
          placeholder: "Prashant R Dahal",
        }}
      />
      <Input
        label="Avatar"
        error={state?.errors?.avatar}
        inputProps={{ type: "file", name: "avatar", accept: "image/*" }}
      />

      <Button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Updating..." : "Update Author"}
      </Button>
    </Form>
  );
}
