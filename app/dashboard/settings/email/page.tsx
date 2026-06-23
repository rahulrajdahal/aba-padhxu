import { fetchUserEmail } from "./actions";
import EmailAddressSettings from "./EmailAddressSettings";

export default async function page() {
  const { data } = await fetchUserEmail();

  return <EmailAddressSettings emailAddress={data as string} />;
}
