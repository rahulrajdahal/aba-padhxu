import { mergeClassNames } from "@/lib/mergeClassNames";

interface SwitchProps extends React.ComponentPropsWithRef<"input"> {
  label: string;
}

export default function Switch({
  label,
  className = "",
  ref,
  ...props
}: SwitchProps) {
  return (
    <fieldset>
      <label className="relative flex items-center cursor-pointer select-none">
        <input
          ref={ref}
          type="checkbox"
          className={mergeClassNames("peer sr-only", className)}
          {...props}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>
      </label>
    </fieldset>
  );
}
