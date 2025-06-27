import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helpText, id, ...props }, ref) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${textareaId}-error` : undefined;
    const helpId = helpText ? `${textareaId}-help` : undefined;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
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
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 bg-white placeholder-gray-500 resize-vertical",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          aria-describedby={cn(errorId, helpId)}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
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

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
