import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Accordion — accessible expandable items
 * Props:
 *   items: Array<{ id, question/title, answer/content }>
 *   allowMultiple: bool (default false)
 */
const Accordion = ({ items = [], allowMultiple = false, className = "" }) => {
  const [openIds, setOpenIds] = useState([]);

  const toggle = (id) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const isOpen = (id) => openIds.includes(id);

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`border rounded-card overflow-hidden transition-colors duration-200 ${
            isOpen(item.id) ? "border-primary-200 bg-primary-50/30" : "border-border bg-white"
          }`}
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            onClick={() => toggle(item.id)}
            aria-expanded={isOpen(item.id)}
          >
            <span className="font-semibold text-navy text-sm md:text-base leading-snug">
              {item.question || item.title}
            </span>
            <motion.span
              animate={{ rotate: isOpen(item.id) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 text-muted"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen(item.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div className="px-5 pb-4 text-secondary text-sm md:text-base leading-relaxed border-t border-border/50 pt-3">
                  {item.answer || item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
