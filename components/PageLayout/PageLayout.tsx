type PageLayoutProps = React.HTMLAttributes<HTMLDivElement>;

export default function PageLayout({ ...props }: Readonly<PageLayoutProps>) {
  return (
    <div {...props} className={`${props.className} px-[12.5%]`}>
      {props.children}
    </div>
  );
}
