import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, helpText, options, placeholder, id, ...props },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${selectId}-error` : undefined;
    const helpId = helpText ? `${selectId}-help` : undefined;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-800"
          >
            {label}
            {props.required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 bg-white",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          aria-describedby={cn(errorId, helpId)}
          aria-invalid={error ? "true" : "false"}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helpText && !error && (
          <p id={helpId} className="text-xs text-gray-600">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select, type SelectProps, type SelectOption };
