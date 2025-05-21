"use client";

import { Button, Form, Input } from "@/components";
import { routes } from "@/utils/routes";
import { Author, Genre } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import CreateableSelect from "react-select/creatable";
import { addBook } from "../actions";

interface AddBookProps {
  authors: Pick<Author, "name" | "id">[];
  genres: Pick<Genre, "title" | "id">[];
}

export default function AddBook({ authors, genres }: Readonly<AddBookProps>) {
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
  const authorOptions = authors.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const genreOptions = genres.map(({ title }) => ({
    label: title,
    value: title,
  }));

  return (
    <Form action={formAction} title="Add Book">
      <Input
        label="Book Title"
        error={state?.errors?.name}
        inputProps={{ name: "name", required: true }}
      />
      <Input
        label="Book description"
        error={state?.errors?.description}
        inputProps={{ name: "description", required: true }}
      />
      <Input
        label="Book Price"
        error={state?.errors?.price}
        inputProps={{ name: "price", type: "number", required: true }}
      />
      <Input
        label="Book Quantity"
        error={state?.errors?.quantity}
        inputProps={{ name: "quantity", type: "number", required: true }}
      />
      <Input
        label="Book Image"
        error={state?.errors?.image}
        inputProps={{ type: "file", name: "image", required: true }}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="genre" className="text-base font-semibold">
          Book Genre
        </label>
        <CreateableSelect
          closeMenuOnSelect={false}
          name="genre"
          placeholder="Select genre"
          options={genreOptions}
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
        />
      </div>
      <Input
        label="Published Date"
        error={state?.errors?.publishedDate}
        inputProps={{ name: "publishedDate", required: true }}
      />
      <Button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Adding..." : "Add Book"}
      </Button>
    </Form>
  );
}
