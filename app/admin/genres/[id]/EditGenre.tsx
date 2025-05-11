"use client";

import { Button, Form, Input } from "@/components";
import { routes } from "@/utils/routes";
import { Genre } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { updateGenre } from "../actions";

export default function EditGenre({
  genre,
}: Readonly<{
  genre: Genre;
}>) {
  const router = useRouter();

  const { title, id } = genre;

  const handleUpdateGenre = async (prevState: unknown, formData: FormData) => {
    formData.append("id", id);

    const state = await updateGenre(prevState, formData);

    if (state?.type === "success") {
      toast.success(state.message);
      return router.push(`${routes.dashboard}${routes.genres}`);
    }
    if (state?.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, pending] = useActionState(handleUpdateGenre, null);

  return (
    <Form action={formAction} title="Edit Genre">
      <Input
        label="Title"
        error={state?.errors?.title}
        inputProps={{ name: "title", required: true, defaultValue: title }}
      />

      <Button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Updating..." : "Update Genre"}
      </Button>
    </Form>
  );
}
