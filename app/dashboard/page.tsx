import Dashboard from "./Dashboard";

export default async function page() {
  return (
    <Dashboard
      ordersPendingCount={0}
      ordersDeliveredCount={0}
      ordersCompletedCount={0}
      booksCount={0}
      authorsCount={0}
      genresCount={0}
    />
  );
}
