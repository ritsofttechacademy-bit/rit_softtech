import { motion } from "framer-motion";

/**
 * SectionHeader — Reusable section title block
 * Props: tag, title, subtitle, align ("left" | "center")
 */
const SectionHeader = ({
  tag,
  title,
  subtitle,
  align = "center",
  className = "",
  light = false,
}) => {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      className={`flex flex-col ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      {tag && (
        <span className="section-tag">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 inline-block" />
          {tag}
        </span>
      )}
      {title && (
        <h2
          className={`font-heading font-bold leading-tight text-balance max-w-3xl ${
            light ? "text-white" : "text-navy"
          }`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${
            light ? "text-white/80" : "text-secondary"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
