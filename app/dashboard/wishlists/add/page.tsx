"use client";

import { Button, Input, Select, Switch, Textarea } from "@/components";
import { routes } from "@/utils/routes";
import { Money } from "@meistericons/react";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { addListing } from "../actions";

export default function page() {
  const handleAddListing = async (prevState: unknown, formData: FormData) => {
    const state = await addListing(prevState, formData);

    if (state.type === "success") {
      toast.success(state.message);
      return redirect(routes.listings);
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, isPending] = useActionState(handleAddListing, null);

  return (
    <form action={formAction} method="POST" className="p-6 sm:p-10 space-y-6">
      <Input
        label="Select Book (ISBN or Title)"
        name="bookId"
        required
        placeholder="Search by Title, Author, or ISBN..."
        helperText="Links your listing to our global book registry database."
        errors={state?.errors?.bookId}
      />

      <div className="flex items-center gap-6">
        <Select
          options={[
            { value: "NEW", label: "New" },
            { value: "LIKE_NEW", label: "Like New" },
            { value: "VERY_GOOD", label: "Very Good" },
            { value: "GOOD", label: "Good" },
            { value: "ACCEPTABLE", label: "Acceptable" },
          ]}
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
          defaultValue="1"
          value="1"
          errors={state?.errors?.quantity}
        />
      </div>

      <Input
        label="Selling Price"
        name="price"
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
