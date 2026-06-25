"use client";

import { Button, Form, Input } from "@/components";
import { Book } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { updateBookById } from "../actions";

export default function EditBookPage({
  book,
}: Readonly<{
  book: Book;
}>) {
  const {
    title,
    isbn13,
    description,
    author,
    publishedDate,
    genre,
    publisher,
  } = book;

  const router = useRouter();
  const handleBookUpdate = async (prevState: unknown, formData: FormData) => {
    const state = await updateBookById(book.id, formData);

    if (state?.type === "success") {
      toast.success("Book updated successfully!");
      return router.push(`${routes.dashboard}${routes.books}`);
    }

    if (state?.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, pending] = useActionState(handleBookUpdate, null);

  return (
    <Form action={formAction} title="Edit Book">
      <Input
        label="Book Title"
        errors={state?.errors?.title}
        name="title"
        defaultValue={title}
      />
      <Input
        label="Book ISBN13"
        errors={state?.errors?.isbn13}
        name="isbn13"
        defaultValue={isbn13}
      />
      <Input
        label="Book description"
        errors={state?.errors?.description}
        name="description"
        defaultValue={description ?? ""}
      />
      <Input
        label="Book Image"
        errors={state?.errors?.image}
        name="image"
        type="file"
        accept="image/*"
      />

      <Input
        label="Book Genre"
        errors={state?.errors?.genre}
        name="genre"
        defaultValue={genre ?? ""}
      />

      <Input
        label="Author"
        errors={state?.errors?.author}
        name="author"
        defaultValue={author}
      />

      <Input
        label="Publisher"
        errors={state?.errors?.publisher}
        name="publisher"
        defaultValue={publisher ?? ""}
      />

      <Input
        label="Published Date"
        errors={state?.errors?.publishedDate}
        name="publishedDate"
        defaultValue={publishedDate?.toISOString().split("T")[0]}
        type="date"
      />

      <Button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Updating..." : "Update Book"}
      </Button>
    </Form>
  );
}
