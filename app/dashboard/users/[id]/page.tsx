import { User, UserProfile } from "@/generated/prisma/client/client";
import { notFound } from "next/navigation";
import { fetchUserWithProfileById } from "../actions";
import EditUser from "./EditUser";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const { data } = await fetchUserWithProfileById(id);

  return <EditUser user={data as User & UserProfile} />;
}
