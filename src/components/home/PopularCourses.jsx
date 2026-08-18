import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../common/Container";
import { courses } from "../../data/courses";
import { courseUrl, ROUTES } from "../../constants/routes";

// 5 curated homepage programs
const popularSlugs = [
  "python-full-stack-development",
  "java-full-stack-development",
  "data-science",
  "generative-ai",
  "aws-cloud",
];

const popularCourses = popularSlugs
  .map(s => courses.find(c => c.slug === s))
  .filter(Boolean);

const PopularCourses = () => {
  return (
    <section className="bg-white editorial-divider" style={{ paddingBlock: "64px" }}>
      <Container>
        <div className="grid-12 mb-8">
          {/* Left heading — 4 cols */}
          <div className="col-span-12 lg:col-span-4">
            <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "12px" }}>
              Popular Programs
            </span>
            <h2 style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.2, letterSpacing: "-0.015em" }}>
              Practical programs for technology careers.
            </h2>
          </div>

          {/* CTA right — pushed right on desktop */}
          <div className="col-span-12 lg:col-span-8 hidden lg:flex items-end justify-end">
            <Link to={ROUTES.COURSES} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "14px", fontWeight: 700, color: "var(--blue)" }}>
              View all {courses.length} courses <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
          </div>
        </div>

        {/* Course rows */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {popularCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                to={courseUrl(course.slug)}
                className="group"
                style={{ display: "block", borderBottom: "1px solid var(--border)", textDecoration: "none" }}
              >
                <div
                  className="grid-12 items-center"
                  style={{ minHeight: "80px", paddingBlock: "12px" }}
                >
                  {/* Index */}
                  <div className="col-span-1">
                    <span style={{ fontSize: "13px", fontWeight: 800, color: "#CBD5E1" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="col-span-11 md:col-span-5">
                    <h3
                      style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "16px", fontWeight: 700, color: "var(--navy)", lineHeight: 1.3 }}
                      className="group-hover:text-blue-600 transition-colors"
                    >
                      {course.title}
                    </h3>
                  </div>

                  {/* Meta */}
                  <div className="hidden md:flex col-span-4 gap-4 items-center">
                    <span style={{ fontSize: "13px", color: "var(--muted)" }}>{course.duration}</span>
                    <span style={{ color: "#CBD5E1" }}>·</span>
                    <span style={{ fontSize: "13px", color: "var(--muted)" }}>{Array.isArray(course.mode) ? course.mode[0] : course.mode}</span>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex col-span-2 justify-end text-[#CBD5E1] group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
                    <ArrowRight style={{ width: 18, height: 18 }} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 lg:hidden">
          <Link to={ROUTES.COURSES} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "14px", fontWeight: 700, color: "var(--blue)" }}>
            View all {courses.length} courses <ArrowRight style={{ width: 15, height: 15 }} />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default PopularCourses;
