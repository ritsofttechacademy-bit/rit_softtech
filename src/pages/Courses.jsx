import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import { courses } from "../data/courses";
import { categories } from "../data/categories";
import { courseUrl } from "../constants/routes";

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (activeCategory && c.category !== activeCategory && c.categorySlug !== activeCategory) return false;
      if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (cat) => {
    if (activeCategory === cat) {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <main>
      {/* ── Minimal Header ── */}
      <section className="bg-white border-b border-[#E5E7EB] pt-[112px] pb-[64px]">
        <Container>
          <span className="section-label">All Programs</span>
          <h1
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              color: "var(--navy)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "600px",
              marginBottom: "var(--space-4)"
            }}
          >
            Explore our technology training programs.
          </h1>
          <p style={{ fontSize: "16px", color: "var(--muted)", maxWidth: "500px" }}>
            Comprehensive courses designed with industry input to build practical skills for modern technology careers.
          </p>
        </Container>
      </section>

      {/* ── Main Layout ── */}
      <section className="bg-white py-12">
        <Container>
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#F7F8FA] border border-[#E5E7EB] rounded-[8px] text-[14px] focus:outline-none focus:border-[#2563EB]"
              />
            </div>
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="px-4 py-2.5 border border-[#E5E7EB] rounded-[8px] text-[14px] font-bold text-[#0F172A] flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "40px" }}>
            
            {/* ── 260px Sidebar ── */}
            <aside 
              className={`lg:block ${isMobileFiltersOpen ? "block" : "hidden"}`}
              style={{ width: "260px", flexShrink: 0 }}
            >
              <div className="sticky top-[112px]">
                
                {/* Desktop Search */}
                <div className="hidden lg:block relative mb-8">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-[#F7F8FA] border border-[#E5E7EB] rounded-[8px] text-[14px] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--navy)", marginBottom: "16px" }}>
                  Categories
                </div>
                
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    style={{
                      textAlign: "left",
                      fontSize: "14px",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      fontWeight: !activeCategory ? 600 : 500,
                      color: !activeCategory ? "var(--blue)" : "var(--muted)",
                      backgroundColor: !activeCategory ? "#EFF6FF" : "transparent"
                    }}
                    className="hover:bg-[#F7F8FA]"
                  >
                    All Programs ({courses.length})
                  </button>
                  {categories.map(cat => {
                    const isActive = activeCategory === cat.title || activeCategory === cat.slug;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.title)}
                        style={{
                          textAlign: "left",
                          fontSize: "14px",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? "var(--blue)" : "var(--muted)",
                          backgroundColor: isActive ? "#EFF6FF" : "transparent"
                        }}
                        className="hover:bg-[#F7F8FA]"
                      >
                        {cat.title} <span className="text-[#94A3B8] ml-1">({cat.courseCount ?? cat.count})</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>

            {/* ── Results List ── */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--muted)", marginBottom: "var(--space-6)" }}>
                Showing {filteredCourses.length} programs
              </div>
              
              <div className="border-t border-[#E5E7EB]">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course, i) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <Link
                        to={courseUrl(course.slug)}
                        className="group"
                        style={{
                          display: "block",
                          paddingBlock: "32px",
                          borderBottom: "1px solid var(--border)",
                          textDecoration: "none"
                        }}
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--blue)", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                              {course.category}
                            </div>
                            
                            <h3
                              style={{
                                fontFamily: "'Manrope', system-ui, sans-serif",
                                fontSize: "clamp(20px, 2vw, 24px)",
                                fontWeight: 800,
                                color: "var(--navy)",
                                marginBottom: 12,
                                lineHeight: 1.25,
                                transition: "color 200ms"
                              }}
                              className="group-hover:text-blue-600"
                            >
                              {course.title}
                            </h3>
                            
                            <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.6, maxWidth: "600px", marginBottom: 16 }}>
                              {course.description}
                            </p>
                            
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "13px", fontWeight: 600, color: "var(--muted)" }}>
                              <span style={{ color: "var(--navy)" }}>{course.duration}</span>
                              <span style={{ color: "#CBD5E1" }}>·</span>
                              <span>{Array.isArray(course.mode) ? course.mode.join(" / ") : course.mode}</span>
                              <span style={{ color: "#CBD5E1" }}>·</span>
                              <span>{course.level}</span>
                            </div>
                            
                            <div className="mt-4" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                              {(course.skills || []).slice(0, 4).map(skill => (
                                <span key={skill} style={{ fontSize: "12px", fontWeight: 600, color: "#64748B", backgroundColor: "#F1F5F9", padding: "4px 10px", borderRadius: "4px" }}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="hidden md:flex flex-shrink-0 mt-4 text-[#CBD5E1] transition-all duration-200 group-hover:text-blue-600 group-hover:translate-x-1">
                            <ArrowRight style={{ width: 24, height: 24 }} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-16 text-center">
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>No programs found</div>
                    <p style={{ color: "var(--muted)" }}>Try adjusting your filters or search query.</p>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Courses;
