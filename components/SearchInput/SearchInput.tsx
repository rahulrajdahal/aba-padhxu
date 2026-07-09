"use client";

import { useDebounce } from "@/hooks";
import { Search } from "@meistericons/react";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Input, { InputProps } from "../Input/Input";

interface SearchInputProps extends InputProps {}

export default function SearchInput(props: SearchInputProps) {
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const defaultQuery = searchParams.get("query") ?? "";
  const [query, setQuery] = useState<string>();
  const lastQuery = useDebounce(String(query), 700);

  const handleOnChange: React.ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (e) => setQuery(e.target.value);

  useEffect(() => {
    if (searchParams.get("query")) {
      searchRef.current?.focus();
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (lastQuery !== "undefined") {
      params.set("query", String(lastQuery));
      params.delete("page");

      if (lastQuery === "") {
        params.delete("query");
      }
      redirect(`?${params.toString()}`);
    }
  }, [lastQuery]);

  return (
    <Input
      ref={searchRef}
      type="search"
      label="Search"
      iconLeft={<Search size={24} />}
      onChange={handleOnChange}
      defaultValue={defaultQuery}
      {...props}
    />
  );
}
