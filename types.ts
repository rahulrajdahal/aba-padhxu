import { Author, Book, Genre } from "@prisma/client";

export type BookWithAuthor = Book & { author: Author };
export type BookWithAuthorAndGenre = BookWithAuthor & { genre: Genre };
