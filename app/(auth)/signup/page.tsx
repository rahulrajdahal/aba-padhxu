"use client";

import { Button, Form, Input } from "@/components";
import { routes } from "@/utils/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useState } from "react";
import toast from "react-hot-toast";
import { signup } from "../actions";

export default function Page() {
  const router = useRouter();

  const [preview, setPreview] = useState("");

  const handleSignup = async (prevState: unknown, formData: FormData) => {
    const state = await signup(prevState, formData);

    if (state.type === "success") {
      toast.success(state.message);
      return router.push(routes.login);
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, pending] = useActionState(handleSignup, null);

  const handleAvatarOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files?.length > 0) setPreview(URL.createObjectURL(files[0]));
  };

  return (
    <Form action={formAction} className="gap-6" title="Sign up">
      <Input
        label="Full Name"
        error={state?.errors?.name}
        inputProps={{
          name: "name",
          required: true,
          placeholder: "Rajesh Hamal",
        }}
      />
      <Input
        label="Email"
        error={state?.errors?.email}
        inputProps={{
          type: "email",
          name: "email",
          required: true,
          placeholder: "rajesh@hamal.com",
        }}
      />
      <div>
        <label htmlFor="role">Role</label>
        <select title="Role" defaultValue={"USER"} name="role" id="role">
          {["SELLER", "USER"].map((role) => (
            <option key={role} value={role} className="mt-0.5 capitalize">
              {role}
            </option>
          ))}
        </select>
      </div>
      <Input
        label="Avatar"
        error={state?.errors?.avatar}
        inputProps={{
          name: "avatar",
          onChange: handleAvatarOnChange,
          type: "file",
          required: true,
        }}
      />
      {preview && (
        <Image
          src={preview}
          alt="avatar"
          className="h-12 w-12 rounded-full object-cover"
          width={24}
          height={24}
        />
      )}
      <Input
        label="Password"
        error={state?.errors?.password}
        inputProps={{ type: "password", name: "password", required: true }}
      />
      <Input
        label="Confirm Password"
        error={state?.errors?.password}
        inputProps={{
          type: "password",
          name: "confirmPassword",
          required: true,
        }}
      />
      <Button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Signing up..." : "Signup"}
      </Button>

      <span className="flex items-center gap-1">
        Already have an account?
        <Button variant="text" linkProps={{ href: routes.login }}>
          Login Instead.
        </Button>
      </span>
    </Form>
  );
}
