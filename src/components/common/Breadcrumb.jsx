import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

/**
 * Breadcrumb — page navigation trail
 * items: Array<{ label, href? }>
 * light: true for white text (on dark/image backgrounds)
 */
const Breadcrumb = ({ items = [], light = false, className = "" }) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li>
          <Link
            to="/"
            className={`flex items-center gap-1 font-medium transition-colors ${
              light
                ? "text-white/70 hover:text-white"
                : "text-muted hover:text-primary-600"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1">
            <ChevronRight
              className={`w-3.5 h-3.5 ${light ? "text-white/40" : "text-border"}`}
            />
            {item.href && idx < items.length - 1 ? (
              <Link
                to={item.href}
                className={`font-medium transition-colors ${
                  light
                    ? "text-white/70 hover:text-white"
                    : "text-muted hover:text-primary-600"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`font-medium ${
                  light ? "text-white" : "text-navy"
                }`}
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
