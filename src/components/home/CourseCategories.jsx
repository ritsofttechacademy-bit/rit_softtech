import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../common/Container";
import { categories } from "../../data/categories";
import { ROUTES } from "../../constants/routes";

// Show max 8 categories
const displayCategories = categories.slice(0, 8);

const CourseCategories = () => {
  return (
    <section className="bg-[#F7F8FA] editorial-divider" style={{ paddingBlock: "64px" }}>
      <Container>

        <div className="mb-8">
          <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "12px" }}>
            Categories
          </span>
          <h2 style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.2, letterSpacing: "-0.015em" }}>
            Browse programs by technology area.
          </h2>
        </div>

        {/* 2-col grid, 8 rows total */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}>
          {displayCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
            >
              <Link
                to={`${ROUTES.COURSES}?category=${cat.title}`}
                className="group flex items-center justify-between"
                style={{
                  height: "66px",
                  padding: "0 20px",
                  borderRight: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                  textDecoration: "none",
                  backgroundColor: "white",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#F7F8FA"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}
              >
                <div className="flex items-center gap-4">
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#CBD5E1", minWidth: "24px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--navy)" }} className="group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--muted)" }}>
                    {cat.courseCount} Programs
                  </span>
                  <ArrowRight style={{ width: 14, height: 14, color: "#CBD5E1" }} className="group-hover:text-blue-500 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
};

export default CourseCategories;
