"use client";

import { Button, Input, Select, Switch, Textarea } from "@/components";
import { Book } from "@/generated/prisma/client/client";
import { BookCondition } from "@/generated/prisma/client/enums";
import { routes } from "@/utils/routes";
import { Money } from "@meistericons/react";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { addListing } from "../actions";

interface AddListingPageProps {
  books: Book[];
}

export default function AddListingPage({ books }: AddListingPageProps) {
  const handleAddListing = async (prevState: unknown, formData: FormData) => {
    const state = await addListing(prevState, formData);

    if (state.type === "success") {
      toast.success(state.message);
      return redirect(`${routes.dashboard}${routes.listings}`);
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, isPending] = useActionState(handleAddListing, null);

  return (
    <form action={formAction} method="POST" className="p-6 sm:p-10 space-y-6">
      <Select
        label="Select Book (ISBN or Title)"
        name="bookId"
        required
        errors={state?.errors?.bookId}
        options={[
          { value: "", label: "Search a book Title" },
          ...books?.map((book) => ({
            value: book.id,
            label: `${book.title} - ${book.author}`,
          })),
        ]}
      />

      <div className="flex items-center gap-6">
        <Select
          options={Object.entries(BookCondition).map(([key, value]) => ({
            value: value,
            label: key,
          }))}
          label="Condition"
          name="condition"
          required
          errors={state?.errors?.condition}
        />

        <Input
          type="number"
          label="Quantity"
          name="quantity"
          required
          min="1"
          errors={state?.errors?.quantity}
        />
      </div>

      <Input
        label="Selling Price"
        name="priceCents"
        required
        placeholder="0.00"
        min="0.00"
        step="0.01"
        type="number"
        iconLeft={<Money />}
        helperText="Enter the regular decimal price. It will be stored safely as cents."
        errors={state?.errors?.priceCents}
      />

      <Textarea
        label="Listing Description"
        name="description"
        rows={4}
        required
        placeholder="Mention any highlighting, notes, cover wear, or specific edition details..."
        errors={state?.errors?.description}
      />

      <Switch name="isActive" label="Make listing active immediately?" />

      <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
        <Button type="button" variant="outline" disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending}>
          {isPending ? "Posting..." : "Post Listing"}
        </Button>
      </div>
    </form>
  );
}
