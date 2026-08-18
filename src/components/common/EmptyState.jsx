import { Link } from "react-router-dom";
import { FolderSearch } from "lucide-react";
import Button from "./Button";

/**
 * EmptyState — placeholder for empty lists, search results, etc.
 */
const EmptyState = ({
  icon: Icon = FolderSearch,
  title = "No Results Found",
  description = "We couldn't find what you're looking for.",
  actionText,
  onAction,
  actionHref,
  actionTo,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 md:p-12 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-muted">
        <Icon className="w-8 h-8" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold text-navy mb-2">{title}</h3>
      <p className="text-secondary max-w-sm mb-6">{description}</p>

      {actionText && (
        <Button
          onClick={onAction}
          href={actionHref}
          to={actionTo}
          variant="secondary"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
