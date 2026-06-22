"use client";

import { routes } from "@/utils/routes";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { confirmEmail } from "../../actions";

export default function page() {
  const { token } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleConfirmEmail = useCallback(async () => {
    setLoading(true);
    const { type, message } = await confirmEmail(
      decodeURIComponent(token as string),
    );
    setLoading(false);

    if (type === "success") {
      toast.success("Email Confirmed! Login to continue.");
      return router.push(routes.login);
    }
    if (type === "error") {
      toast.error(message);
      return router.push(routes.login);
    }
  }, [token]);

  useEffect(() => {
    handleConfirmEmail();
  }, [handleConfirmEmail]);

  return (
    <>
      <h1>Confirm Email </h1>
      <p>You will be redirected when email is confirmed.</p>

      {loading && <span>Redirecting...</span>}
    </>
  );
}
