interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  stat: number;
  title: string;
  icon: React.ReactNode;
}

export default function DashboardCard({
  stat,
  title,
  icon,
  ...props
}: Readonly<DashboardCardProps>) {
  return (
    <div
      {...props}
      className={`${props?.className} flex flex-col bg-blue-500 text-white rounded-lg p-4`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <strong className="text-4xl font-bold ">{stat}</strong>
      </div>
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}
