import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Tabs — horizontal tab navigation
 * Props:
 *   tabs: Array<{ id, label, icon? }>
 *   defaultTab: id of default active tab
 *   onChange: (tabId) => void
 *   variant: "underline" | "pill"
 */
const Tabs = ({
  tabs = [],
  defaultTab,
  onChange,
  variant = "underline",
  className = "",
  children,
}) => {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  const handleChange = (id) => {
    setActive(id);
    onChange?.(id);
  };

  if (variant === "pill") {
    return (
      <div className={className}>
        <div className="flex flex-wrap gap-2" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => handleChange(tab.id)}
              className={`relative px-5 py-2 rounded-pill text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary ${
                active === tab.id
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-white border border-border text-secondary hover:border-primary-300 hover:text-primary-600"
              }`}
            >
              {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`ml-1.5 text-xs ${active === tab.id ? "text-white/80" : "text-muted"}`}>
                  ({tab.count})
                </span>
              )}
            </button>
          ))}
        </div>
        {children && <div className="mt-6">{children(active)}</div>}
      </div>
    );
  }

  // Underline variant (default)
  return (
    <div className={className}>
      <div className="flex overflow-x-auto no-scrollbar border-b border-border" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => handleChange(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary ${
              active === tab.id
                ? "text-primary-600"
                : "text-secondary hover:text-navy"
            }`}
          >
            {tab.icon && tab.icon}
            {tab.label}
            {active === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                layoutId="tab-underline"
                transition={{ duration: 0.2 }}
              />
            )}
          </button>
        ))}
      </div>
      {children && <div className="mt-6">{children(active)}</div>}
    </div>
  );
};

export default Tabs;
