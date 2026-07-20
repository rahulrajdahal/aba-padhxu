"use client";

import { BookCondition } from "@/generated/prisma/client/enums";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";
import Select from "./Select/Select";

export default function ConditionSelect() {
  const searchParams = useSearchParams();

  const handleConditionOnChange: React.ChangeEventHandler<
    HTMLSelectElement,
    HTMLSelectElement
  > = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("condition", e.target.value);
    if (params.get("condition") === "") params.delete("condition");
    redirect(`?${params.toString()}`);
  };
  const defaultCondition = searchParams.get("condition") ?? "";

  return (
    <Select
      label="Condition"
      options={[
        { label: "All", value: "" },
        ...Object.values(BookCondition).map((condition) => ({
          label: condition,
          value: condition,
        })),
      ]}
      onChange={handleConditionOnChange}
      defaultValue={defaultCondition}
    />
  );
}
