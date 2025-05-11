interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title: string;
}

export default function Form({ title, ...props }: Readonly<FormProps>) {
  return (
    <form {...props} className={`flex flex-col gap-4 ${props.className}`}>
      <strong className="h3">{title}</strong>

      {props.children}
    </form>
  );
}
