"use client";

import { Button, Input } from "@/components";
import { Author } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
import CreateableSelect from "react-select/creatable";
import { addBook } from "../action";

export default function AddBook({
  authors,
}: {
  authors: Pick<Author, "name" | "id">[];
}) {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(addBook, null);
  const authorOptions = authors.map(({ name }) => ({
    label: name,
    value: name,
  }));

  return (
    <form action={formAction}>
      <strong className="text-2xl font-bold">Add Book </strong>
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
        label="Book Image"
        error={state?.errors?.image}
        inputProps={{ type: "file", name: "image", required: true }}
      />
      <CreateableSelect
        closeMenuOnSelect={false}
        name="author"
        placeholder="Select Author"
        options={authorOptions}
      />
      <Input
        label="Published Date"
        error={state?.errors?.publisedDate}
        inputProps={{ name: "publishedDate", required: true }}
      />
      <Button type="submit" disabled={pending} aria-disabled={pending}>
        Add Book
      </Button>
    </form>
  );
}
