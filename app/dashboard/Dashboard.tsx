import { DashboardCard } from "@/components";
import {
  Bookmark,
  BoxCheck,
  CaretDoubleRight,
  Cart,
  Scooter,
  Users,
} from "@meistericons/react";

type DashboardProps = Readonly<{
  ordersPendingCount: number;
  ordersDeliveredCount: number;
  ordersCompletedCount: number;
  booksCount: number;
  authorsCount: number;
  genresCount: number;
}>;

export default function Dashboard({
  ordersDeliveredCount,
  ordersCompletedCount,
  ordersPendingCount,
  booksCount,
  authorsCount,
  genresCount,
}: DashboardProps) {
  const stats = [
    {
      stat: ordersPendingCount,
      title: `Order${ordersPendingCount > 1 ? "s" : ""} Pending`,
      icon: <Cart className="h-12 w-12" />,
    },
    {
      stat: ordersDeliveredCount,
      title: `Order${ordersDeliveredCount > 1 ? "s" : ""} Delivering`,
      icon: <Scooter className="h-12 w-12" />,
    },
    {
      stat: ordersCompletedCount,
      title: `Order${ordersCompletedCount > 1 ? "s" : ""} Completed`,
      icon: <BoxCheck className="h-12 w-12" />,
    },
    {
      stat: booksCount,
      title: `Book${booksCount > 1 ? "s" : ""}`,
      icon: <Bookmark className="h-12 w-12" />,
    },
    {
      stat: authorsCount,
      title: `Author${authorsCount > 1 ? "s" : ""}`,
      icon: <Users className="h-12 w-12" />,
    },
    {
      stat: genresCount,
      title: `Genre${genresCount > 1 ? "s" : ""}`,
      icon: <CaretDoubleRight className="h-12 w-12" />,
    },
  ];
  return (
    <div className="flex gap-4 items-center w-full px-8">
      {stats.map((stat) => (
        <DashboardCard
          key={stat.title}
          stat={stat.stat}
          title={stat.title}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
