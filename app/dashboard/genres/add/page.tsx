"use client";

import { Button, Input, Textarea } from "@/components";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { addGenre } from "../actions";

export default function page() {
  const router = useRouter();

  const handleAddGenre = async (prevState: unknown, formData: FormData) => {
    const state = await addGenre(prevState, formData);

    if (state.type === "success") {
      toast.success(state.message);
      router.push(`${routes.dashboard}${routes.genres}`);
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, isPending] = useActionState(handleAddGenre, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input name="name" label="Name" errors={state?.errors?.name} />
      <Textarea
        rows={5}
        name="description"
        label="Description"
        errors={state?.errors?.description}
      />

      <div className="flex w-full gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Genre"}
        </Button>

        <Button type="reset" variant="outline" disabled={isPending}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
