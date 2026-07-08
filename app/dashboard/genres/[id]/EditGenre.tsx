"use client";

import { Button, Input, Textarea } from "@/components";
import { Genre } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { updateGenreById } from "../actions";

interface EditGenreProps {
  genre: Genre;
}

export default function EditGenre({ genre }: EditGenreProps) {
  const router = useRouter();

  const handleUpdateGenre = async (prevState: unknown, formData: FormData) => {
    const state = await updateGenreById(genre.id, formData);

    if (state.type === "success") {
      toast.success("Genre updated");
      router.push(`${routes.dashboard}${routes.genres}`);
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, isPending] = useActionState(
    handleUpdateGenre,
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input
        name="name"
        label="Name"
        errors={state?.errors?.name}
        defaultValue={genre.name}
      />
      <Textarea
        rows={5}
        name="description"
        label="Description"
        errors={state?.errors?.description}
        defaultValue={genre?.description ?? ""}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update Genre"}
      </Button>
    </form>
  );
}
