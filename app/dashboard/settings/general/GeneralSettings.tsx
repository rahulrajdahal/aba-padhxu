import { Button, Input } from "@/components";
import { UserProfile } from "@/generated/prisma/client/client";

type GeneralSettingsProps = {
  user: Pick<UserProfile, "firstName" | "lastName" | "phoneNumber">;
};

export default function GeneralSettings({ user }: GeneralSettingsProps) {
  const { firstName, lastName, phoneNumber } = user;

  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Input
        type="text"
        label="First Name"
        name="firstName"
        placeholder="Rajesh"
        defaultValue={firstName}
      />

      <Input
        type="text"
        label="Last Name"
        name="lastName"
        placeholder="Hamal"
        defaultValue={lastName}
      />

      <Input
        type="tel"
        label="Phone Number (Optional)"
        name="phoneNumber"
        placeholder="+977 1234-567189"
        defaultValue={phoneNumber || ""}
      />

      <div className="flex items-center md:col-span-2 pt-8">
        <Button type="submit">Update Information</Button>
      </div>
    </form>
  );
}
