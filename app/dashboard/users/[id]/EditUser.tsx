"use client";

import { Button, Input, Switch } from "@/components";
import PasswordInput from "@/components/Input/Password/PasswordInput";
import { User, UserProfile } from "@/generated/prisma/client/client";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { updateUserWithProfileById } from "../actions";

interface EditUserProps {
  user: User & UserProfile;
}

export default function EditUser({ user }: EditUserProps) {
  const handleUpdateUser = async (prevState: unknown, formData: FormData) => {
    const state = await updateUserWithProfileById(user.id, formData);

    if (state.type === "error") {
      toast.error(state.message);
    }

    if (state.type === "success") {
      toast.success("User data updated successfully");
      redirect(`${routes.dashboard}${routes.users}`);
    }

    return state;
  };

  const [state, formAction, isPending] = useActionState(
    handleUpdateUser,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div className="flex items-center gap-8">
        <Input
          name="firstName"
          required
          label="First Name"
          type="text"
          errors={state?.errors?.firstName}
          defaultValue={user.firstName}
        />
        <Input
          defaultValue={user.lastName}
          name="lastName"
          required
          label="Last Name"
          type="text"
          errors={state?.errors?.lastName}
        />
      </div>

      <div className="flex items-center gap-8">
        <Input
          defaultValue={user.email}
          name="email"
          required
          label="Email"
          type="email"
          errors={state?.errors?.email}
        />
        <Input
          name="phoneNumber"
          label="Phone Number"
          type="text"
          defaultValue={user?.phoneNumber ?? ""}
          errors={state?.errors?.phoneNumber}
        />
      </div>

      <PasswordInput
        name="password"
        label="Password"
        errors={state?.errors?.password}
      />
      <PasswordInput
        name="confirmPassword"
        label="Confirm Password"
        errors={state?.errors?.confirmPassword}
      />

      <div className="flex items-center gap-8">
        <Switch
          label="Seller?"
          name="isSeller"
          defaultChecked={user?.isSeller}
        />
        <Switch label="Admin?" name="isAdmin" defaultChecked={user?.isAdmin} />
      </div>

      <Button isLoading={isPending} type="submit">
        {isPending ? "Updating..." : "Update User"}
      </Button>
    </form>
  );
}
