"use client";

import { Button, Input } from "@/components";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { updateEmailAddress } from "./actions";

type EmailAddressSettingsProps = {
  emailAddress?: string;
};

export default function EmailAddressSettings({
  emailAddress,
}: EmailAddressSettingsProps) {
  const handleUpdateEmailAddress = async (
    prevState: unknown,
    formData: FormData,
  ) => {
    const state = await updateEmailAddress(prevState, formData);

    if (state.type === "success") {
      toast.success("User Email Address Updated");
      return;
    }

    if (state.type === "error") {
      toast.error(state.message);
      return;
    }

    return state;
  };

  const [state, formAction, isPending] = useActionState(
    handleUpdateEmailAddress,
    null,
  );

  return (
    <form action={formAction} className="space-y-3 w-1/2">
      <Input
        type="email"
        label="Email Address"
        name="email"
        defaultValue={emailAddress}
        required
        errors={state?.errors?.email}
      />
      <Input
        type="password"
        label="Password"
        name="password"
        required
        errors={state?.errors?.password}
      />
      <Button type="submit" isLoading={isPending}>
        {isPending ? "Updating..." : "Update Email Address"}
      </Button>
    </form>
  );
}
