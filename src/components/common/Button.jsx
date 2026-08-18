import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

/**
 * Button — reusable button with variants
 *
 * variant: "primary" | "secondary" | "ghost" | "outline" | "danger"
 * size: "sm" | "md" | "lg"
 * as: "button" | "a" | Link (via `to` prop)
 * arrow: show arrow icon
 * loading: show spinner
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  arrow = false,
  loading = false,
  disabled = false,
  to,
  href,
  onClick,
  type = "button",
  ...props
}) => {
  const baseClass = "btn";

  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    outline: "border border-navy text-navy hover:bg-navy hover:text-white btn px-6 py-3 text-sm",
    danger: "btn bg-red-600 text-white hover:bg-red-700 px-6 py-3 text-sm",
  };

  const sizes = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  };

  const cls = `${variants[variant]} ${sizes[size]} ${loading || disabled ? "opacity-60 pointer-events-none" : ""} ${className}`;

  const content = (
    <>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
      {arrow && !loading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${cls}`} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`group ${cls}`} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={`group ${cls}`} onClick={onClick} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
};

export default Button;
