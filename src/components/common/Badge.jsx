// Badge — small labeled chip
const Badge = ({ children, variant = "blue", className = "" }) => {
  const variants = {
    blue: "badge-blue",
    purple: "badge-purple",
    orange: "badge-orange",
    green: "badge-green",
    red: "badge-red",
    gray: "badge bg-slate-100 text-slate-600",
    cyan: "badge bg-cyan-50 text-cyan-700",
    new: "badge bg-emerald-50 text-emerald-700",
    bestseller: "badge bg-orange-100 text-orange-700",
    hot: "badge bg-red-100 text-red-700",
  };

  return (
    <span className={`${variants[variant] || variants.blue} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
