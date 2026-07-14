import { mergeClassNames } from "@/lib/mergeClassNames";
import InputError from "../Input/InputError/InputError";

interface SwitchProps extends React.ComponentPropsWithRef<"input"> {
  label: string;
  errors?: string[];
}

export default function Switch({
  label,
  className = "",
  ref,
  errors,
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

      {errors && errors.length > 0 ? (
        <div className="flex flex-col">
          {errors.map((error, idx) => (
            <InputError key={idx}>{error}</InputError>
          ))}
        </div>
      ) : null}
    </fieldset>
  );
}
