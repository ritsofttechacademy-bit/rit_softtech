import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, ArrowRight,
  Brain, BarChart2, Code2, Cloud, GitBranch, Shield,
  CheckSquare, Database, Layers, TrendingUp, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../../data/categories";
import { courses } from "../../data/courses";
import { courseUrl, ROUTES } from "../../constants/routes";
import Container from "../common/Container";

const ICON_MAP = {
  Brain, BarChart2, Code2, Cloud, GitBranch, Shield,
  CheckSquare, Database, Layers, TrendingUp
};

const CategoryIcon = ({ name, className = "w-4 h-4" }) => {
  const Icon = ICON_MAP[name] || Zap;
  return <Icon className={className} />;
};

const CoursesMegaMenu = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const activeCourses = useMemo(() => {
    return courses
      .filter(c => c.category === activeCategory.title)
      .slice(0, 8);
  }, [activeCategory]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute left-0 right-0 top-[72px] z-[200] bg-white border-b border-border shadow-md"
          onMouseLeave={onClose}
        >
          <Container>
            <div className="flex" style={{ height: "460px" }}>
              
              {/* ── Left: Category List (260px) ── */}
              <div style={{ width: "260px", borderRight: "1px solid var(--border)", padding: "32px 32px 32px 0", display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                  Categories
                </p>
                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {categories.map((cat) => {
                    const isActive = activeCategory.id === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat)}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          width: "100%",
                          textAlign: "left",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? "var(--blue)" : "var(--navy)",
                          backgroundColor: isActive ? "#EFF6FF" : "transparent",
                          transition: "all 0.2s"
                        }}
                      >
                        <CategoryIcon name={cat.icon} className="w-4 h-4" />
                        <span style={{ flex: 1 }}>{cat.title}</span>
                        {isActive && <ChevronRight className="w-4 h-4 text-blue-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Middle: Courses Grid (flex-1) ── */}
              <div style={{ flex: 1, padding: "32px 40px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--navy)" }}>{activeCategory.title}</h3>
                  </div>
                  <Link 
                    to={`${ROUTES.COURSES}?category=${activeCategory.title}`}
                    style={{ fontSize: "13px", fontWeight: 700, color: "var(--blue)", display: "flex", alignItems: "center", gap: 4 }}
                  >
                    View all {activeCourses.length} courses <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1 content-start">
                  {activeCourses.map(course => (
                    <Link
                      key={course.id}
                      to={courseUrl(course.slug)}
                      className="group"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                        padding: "16px",
                        borderRadius: "8px",
                        transition: "background-color 0.2s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F7F8FA"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--blue)" }}>
                        <CategoryIcon name={course.icon} className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)", marginBottom: "4px", lineHeight: 1.3 }} className="group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </h4>
                        <div style={{ fontSize: "12px", color: "var(--muted)" }}>{course.duration}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* ── Right: Featured/Enquire (280px) ── */}
              <div style={{ width: "280px", borderLeft: "1px solid var(--border)", padding: "32px 0 32px 32px", display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
                  Not sure where to start?
                </p>
                <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "24px", lineHeight: 1.5 }}>
                  Talk to our career counselors to find the best program for your goals.
                </p>
                <Link
                  to={ROUTES.COURSES}
                  className="btn-primary w-full justify-center mb-4"
                  style={{ height: "42px" }}
                >
                  Browse all programs
                </Link>
                <button
                  className="btn-outline w-full justify-center"
                  style={{ height: "42px" }}
                >
                  Request Callback
                </button>
              </div>

            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoursesMegaMenu;
