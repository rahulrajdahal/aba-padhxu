import { authUser } from "@/app/(auth)/middleware";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import GeneralSettings from "./GeneralSettings";

export default async function page() {
  const user = await authUser();

  if (!user) redirect(routes.login);

  return (
    <GeneralSettings
      user={{
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar,
      }}
    />
  );
}
