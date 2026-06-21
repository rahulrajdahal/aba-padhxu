interface HeadingsProps {
  heading: string;
  body: string;
}
export default function Headings({ heading, body }: HeadingsProps) {
  return (
    <div className="space-y-2.5 mb-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {heading}
      </h1>
      <p className="text-sm text-slate-500">{body}</p>
    </div>
  );
}
