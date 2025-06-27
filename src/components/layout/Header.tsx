import { CreditCardIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  title: string;
  subtitle?: string;
  resourceLinks?: Array<{
    href: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    variant?: "github" | "npm" | "vnpay" | "docs" | "default";
  }>;
}

export function Header({ title, subtitle, resourceLinks }: HeaderProps) {
  const getLinkStyles = (variant?: string) => {
    const baseStyles =
      "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 hover:shadow-md";

    switch (variant) {
      case "github":
        return `${baseStyles} bg-gray-900 text-white hover:bg-gray-800`;
      case "npm":
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700`;
      case "vnpay":
        return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700`;
      case "docs":
        return `${baseStyles} bg-green-700 text-white hover:bg-green-800`;
      default:
        return `${baseStyles} bg-indigo-600 text-white hover:bg-indigo-700`;
    }
  };

  const getIcon = (
    variant?: string,
    IconComponent?: React.ComponentType<{ className?: string }>
  ) => {
    if (IconComponent) {
      return (
        <IconComponent className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      );
    }

    // Default icons based on variant
    switch (variant) {
      case "github":
        return (
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "npm":
        return (
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M0 7v5h6.5v1.5H4.5V15H11V7H0zm6.5 6H2V8.5h4.5V13zM11 7v8h6.5V7H11zm6 7.5h-5V8.5h5V14.5zM17.5 7v8H24V7h-6.5zm6 7.5h-5V8.5h5V14.5z" />
          </svg>
        );
      case "vnpay":
      case "docs":
        return (
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        );
    }
  };

  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <CreditCardIcon
          className="w-12 h-12 text-blue-600 mr-3 flex-shrink-0"
          aria-hidden="true"
        />
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
      </div>

      {subtitle && (
        <p className="text-gray-700 text-lg mb-6 font-medium">{subtitle}</p>
      )}

      {resourceLinks && resourceLinks.length > 0 && (
        <nav
          aria-label="External resources"
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          {resourceLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={getLinkStyles(link.variant)}
              aria-label={`Visit ${link.label}`}
            >
              {getIcon(link.variant, link.icon)}
              <span className="whitespace-nowrap">{link.label}</span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
