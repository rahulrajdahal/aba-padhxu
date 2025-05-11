"use client";

import { Button, Form, Input } from "@/components";
import { BookWithAuthorAndGenre } from "@/types";
import { routes } from "@/utils/routes";
import { Author, Genre } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import CreateableSelect from "react-select/creatable";
import { updateBook } from "../actions";

export default function Page({
  book,
  authors,
  genres,
}: Readonly<{
  book: BookWithAuthorAndGenre;
  authors: Pick<Author, "name" | "id">[];
  genres: Pick<Genre, "title" | "id">[];
}>) {
  const { name, description, author, publishedDate, id, genre } = book;

  const router = useRouter();

  const handleBookUpdate = async (prevState: unknown, formData: FormData) => {
    formData.append("id", id);

    const state = await updateBook(prevState, formData);

    if (state?.type === "success") {
      toast.success(state.message);
      return router.push(`${routes.dashboard}${routes.books}`);
    }

    if (state?.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const authorDefault = { label: author?.name, value: author?.name };
  const authorOptions = authors.map(({ name }) => ({
    label: name,
    value: name,
  }));
  const genreDefault = { label: genre?.title, value: genre?.title };
  const genreOptions = genres.map(({ title }) => ({
    label: title,
    value: title,
  }));

  const [state, formAction, pending] = useActionState(handleBookUpdate, null);

  return (
    <Form action={formAction} title="Edit Book">
      <Input
        label="Book Title"
        error={state?.errors?.name}
        inputProps={{ name: "name", defaultValue: name }}
      />
      <Input
        label="Book description"
        error={state?.errors?.description}
        inputProps={{
          name: "description",
          defaultValue: description,
        }}
      />
      <Input
        label="Book Image"
        error={state?.errors?.image}
        inputProps={{ type: "file", name: "image" }}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="genre" className="text-base font-semibold">
          Book Genre
        </label>
        <CreateableSelect
          closeMenuOnSelect={false}
          name="genre"
          placeholder="Select Genre"
          options={genreOptions}
          defaultValue={genreDefault}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="author" className="text-base font-semibold">
          Author
        </label>
        <CreateableSelect
          closeMenuOnSelect={false}
          name="author"
          placeholder="Select Author"
          options={authorOptions}
          defaultValue={authorDefault}
        />
      </div>

      <Input
        label="Published Date"
        error={state?.errors?.publishedDate}
        inputProps={{
          name: "publishedDate",
          defaultValue: publishedDate,
          type: "date",
        }}
      />
      <Button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Updating..." : "Update Book"}
      </Button>
    </Form>
  );
}
