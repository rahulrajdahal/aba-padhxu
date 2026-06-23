"use client";

import { logout } from "@/app/(auth)/actions";
import { Button } from "@/components";
import PasswordInput from "@/components/Input/Password/PasswordInput";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { updatePassword } from "./actions";

export default function UpdatePasswordSettings() {
  const handleUpdatePassword = async (
    prevState: unknown,
    formData: FormData,
  ) => {
    const state = await updatePassword(prevState, formData);

    if (state.type === "success") {
      toast.success("User Password Updated");
      await logout();
      return;
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, isPending] = useActionState(
    handleUpdatePassword,
    null,
  );

  return (
    <form action={formAction} className="space-y-3 w-1/2">
      <PasswordInput
        label="Old Password"
        name="oldPassword"
        required
        errors={state?.errors?.oldPassword}
      />
      <PasswordInput
        label="New Password"
        name="newPassword"
        required
        errors={state?.errors?.newPassword}
      />
      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        required
        errors={state?.errors?.confirmPassword}
      />
      <Button type="submit" isLoading={isPending}>
        {isPending ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
