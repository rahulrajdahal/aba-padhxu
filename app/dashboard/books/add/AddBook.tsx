"use client";

import { Button, Input } from "@/components";
import Textarea from "@/components/Textarea/Textarea";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { addBook } from "../actions";

interface AddBookProps {}

export default function AddBook({}: Readonly<AddBookProps>) {
  const router = useRouter();

  const handleAddBook = async (prevState: unknown, formData: FormData) => {
    const state = await addBook(prevState, formData);

    if (state?.type === "success") {
      toast.success(state.message);
      return router.push(`${routes.dashboard}${routes.books}`);
    }

    if (state?.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, pending] = useActionState(handleAddBook, null);

  return (
    <form action={formAction} title="Add Book">
      <Input
        label="Title"
        errors={state?.errors?.title}
        name="title"
        required
      />
      <Input
        label="ISBN13"
        errors={state?.errors?.isbn13}
        name="isbn13"
        required
        maxLength={13}
        minLength={13}
        type="number"
      />
      <Textarea
        label="Book description"
        errors={state?.errors?.description}
        name="description"
        rows={5}
      />
      <Input
        label="Author"
        errors={state?.errors?.author}
        name="author"
        required
      />
      <Input label="Genre" errors={state?.errors?.genre} name="genre" />
      <Input
        label="Publisher"
        errors={state?.errors?.publisher}
        name="publisher"
      />
      <Input
        label="Published Date"
        errors={state?.errors?.publishedDate}
        name="publishedDate"
        type="date"
      />
      <Input
        name="image"
        type="file"
        label="Image"
        accept="image/*"
        required
        errors={state?.errors?.image}
      />

      <Button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Adding..." : "Add Book"}
      </Button>
    </form>
  );
}
