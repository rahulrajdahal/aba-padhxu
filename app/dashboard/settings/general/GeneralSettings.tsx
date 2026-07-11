"use client";

import { Button, Input } from "@/components";
import { UserProfile } from "@/generated/prisma/client/client";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { updateUserProfile } from "../../user_profiles/actions";
import AvatarUpload from "../components/AvatarUpload/AvatarUpload";

type GeneralSettingsProps = {
  user: Pick<UserProfile, "firstName" | "lastName" | "phoneNumber" | "avatar">;
};

export default function GeneralSettings({ user }: GeneralSettingsProps) {
  const { firstName, lastName, phoneNumber, avatar } = user;

  const handleUpdateInformation = async (
    prevState: unknown,
    formData: FormData,
  ) => {
    const state = await updateUserProfile(prevState, formData);

    if (state.type === "success") {
      toast.success("Profile updated successfully");
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, isPending] = useActionState(
    handleUpdateInformation,
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-10">
      <div className="flex items-center gap-8">
        <div className="w-full">
          <AvatarUpload
            name={`${firstName} ${lastName}`}
            initialAvatarUrl={`/uploads/users/${avatar}`}
            errors={state?.errors?.avatar}
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Input
            type="text"
            label="First Name"
            name="firstName"
            placeholder="Rajesh"
            defaultValue={firstName}
            errors={state?.errors?.firstName}
          />

          <Input
            type="text"
            label="Last Name"
            name="lastName"
            placeholder="Hamal"
            defaultValue={lastName}
            errors={state?.errors?.lastName}
          />

          <Input
            type="tel"
            label="Phone Number (Optional)"
            name="phoneNumber"
            placeholder="+977 1234-567189"
            defaultValue={phoneNumber || ""}
            errors={state?.errors?.phoneNumber}
          />
        </div>
      </div>

      <div className="flex items-center md:col-span-2 pt-8">
        <Button type="submit" isLoading={isPending}>
          {isPending ? "Updating..." : "Update Information"}
        </Button>
      </div>
    </form>
  );
}
