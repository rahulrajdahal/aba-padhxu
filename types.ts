import { Author, Book, BookOnOrder, Genre, Order, User } from "@prisma/client";

// BOOK
export type BookWithAuthor = Book & { author: Author };
export type BookWithAuthorAndGenre = BookWithAuthor & { genre: Genre };

// ORDER
export type OrderWithUser = Order & { user: User };
export type OrderWithUserAndItems = OrderWithUser & { items: BookOnOrderWithBook[] };

// BOOK ON ORDER
export type BookOnOrderWithBook = BookOnOrder & { book: Book };
export type BookOnOrderWithBookAndOrder = BookOnOrderWithBook & {
    order: Order;
};
