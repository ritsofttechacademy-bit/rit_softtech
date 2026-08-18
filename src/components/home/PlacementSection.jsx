import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../common/Container";
import { ROUTES } from "../../constants/routes";
import { placements } from "../../data/placements";
import { companies } from "../../data/companies";

const stats = [
  { value: "92%",    label: "Career support success" },
  { value: "15,000+", label: "Learners supported" },
  { value: "2,500+",  label: "Hiring connections" },
];

// 3 recent placements for the right column
const recentPlacements = placements.slice(0, 3);

// Marquee companies
const marqueeItems = [...companies, ...companies];

const PlacementSection = () => {
  return (
    <section className="bg-white editorial-divider" style={{ paddingBlock: "64px" }}>
      <Container>

        {/* Section label */}
        <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "36px" }}>
          Career Outcomes
        </span>

        {/* Typographic stats */}
        <div className="grid-12 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="col-span-12 sm:col-span-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <div style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "6px" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--muted)" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured story left + placement list right */}
        <div className="grid-12 mb-12">

          {/* Featured student story — 7 cols */}
          <motion.div
            className="col-span-12 lg:col-span-7 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", height: "340px", backgroundColor: "var(--surface)", position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop"
                alt="Student success story"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* Overlay card */}
              <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px", backgroundColor: "rgba(255,255,255,0.96)", borderRadius: "8px", padding: "16px 20px" }}>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--navy)", marginBottom: "4px" }}>Anjali Reddy</div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--blue)", marginBottom: "8px" }}>Software Developer at Wipro · Python Full Stack</div>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.5 }}>
                  "Structured training and project work made me job-ready in 4 months."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Recent placements — 5 cols */}
          <div className="col-span-12 lg:col-span-5 lg:pl-[6%] flex flex-col justify-center">
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--muted)", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Recent Placements
            </div>
            <div style={{ borderTop: "1px solid var(--border)" }}>
              {recentPlacements.map((p, i) => (
                <div
                  key={p.id}
                  style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderBottom: "1px solid var(--border)" }}
                >
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: p.imageColor || "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "white", flexShrink: 0 }}>
                    {p.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--navy)", marginBottom: "2px" }}>{p.name}</div>
                    <div style={{ fontSize: "13px", color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {p.role} · {p.company}
                    </div>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#16A34A", backgroundColor: "#F0FDF4", padding: "3px 8px", borderRadius: "4px", flexShrink: 0 }}>
                    {p.package}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to={ROUTES.PLACEMENTS}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "14px", fontWeight: 700, color: "var(--blue)", marginTop: "20px" }}
            >
              View all placements <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
          </div>

        </div>

        {/* Compact logo marquee */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "28px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "20px" }}>
            Our learners work at
          </div>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "80px", background: "linear-gradient(to right, white, transparent)", zIndex: 10, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "80px", background: "linear-gradient(to left, white, transparent)", zIndex: 10, pointerEvents: "none" }} />
            <div className="flex animate-marquee whitespace-nowrap" style={{ gap: "56px" }}>
              {marqueeItems.map((company, index) => (
                <span
                  key={`${company.id}-${index}`}
                  style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "18px", fontWeight: 800, color: "var(--navy)", opacity: 0.3, userSelect: "none", flexShrink: 0 }}
                >
                  {company.name}
                </span>
              ))}
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
};

export default PlacementSection;
