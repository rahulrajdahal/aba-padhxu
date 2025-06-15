"use client";

import { Card, PageLayout } from "@/components";
import { useIsPushNotification } from "@/hooks";
import { BookWithAuthorAndGenre } from "@/types";
import { routes } from "@/utils/routes";
import { useEffect } from "react";
import toast from "react-hot-toast";

type BooksProps = {
  books: BookWithAuthorAndGenre[];
};

export default function Books({ books }: Readonly<BooksProps>) {
  const { isSupported } = useIsPushNotification();

  useEffect(() => {
    if (!isSupported) {
      toast.error("Push notifications not supported in this browser.");
    }
  }, []);

  return (
    <PageLayout className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {books.map((book) => (
        <Card key={book.id} book={book} href={`${routes.books}/${book.slug}`} />
      ))}
    </PageLayout>
  );
}
