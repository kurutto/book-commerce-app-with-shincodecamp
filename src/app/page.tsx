import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { nextAuthOptions } from "./lib/next-auth/options";
import { Purchase, User } from "./types/types";

export default async function Home() {
  const { contents } = await getAllBooks();
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User; //user:Userではなくas Userと型キャストにすることで存在するときだけUserの型をつけることができる。
  let purchaseBookIds: string[];
  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: "no-store" }
    );
    const purchasesData = await response.json();
    purchaseBookIds = purchasesData.map(
      (purchaseBook: Purchase) => purchaseBook.bookId
    );
  }
  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchaseBookIds?.includes(book.id)}
          />
        ))}
      </main>
    </>
  );
}
