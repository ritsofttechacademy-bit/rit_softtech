import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../common/Container";
import { ROUTES } from "../../constants/routes";
import { trainers } from "../../data/trainers";

const featured = trainers[0];

const ExpertTrainers = () => {
  return (
    <section className="bg-[#F7F8FA] editorial-divider" style={{ paddingBlock: "64px" }}>
      <Container>

        <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "36px" }}>
          Meet Our Trainers
        </span>

        <div className="grid-12 items-center">

          {/* Photo — 5 cols */}
          <motion.div
            className="col-span-12 lg:col-span-5 mb-8 lg:mb-0"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", height: "380px", backgroundColor: "var(--surface)" }}>
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                alt={featured.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          </motion.div>

          {/* Content — 7 cols */}
          <motion.div
            className="col-span-12 lg:col-span-7 lg:pl-[8%]"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--muted)", marginBottom: "8px" }}>
              {featured.experience} Experience
            </div>
            <h2 style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.2, letterSpacing: "-0.015em", marginBottom: "6px" }}>
              {featured.name}
            </h2>
            <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--blue)", marginBottom: "20px" }}>
              {featured.designation}
            </div>
            <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.65, marginBottom: "24px", maxWidth: "440px" }}>
              {featured.bio}
            </p>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "32px" }}>
              {(featured.technologies || []).slice(0, 3).map((tech, i) => (
                <span key={i} style={{ fontSize: "13px", fontWeight: 600, color: "var(--navy)" }}>
                  · {tech}
                </span>
              ))}
            </div>

            <Link
              to={ROUTES.TRAINERS}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "14px", fontWeight: 700, color: "var(--blue)" }}
            >
              Meet All Trainers <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default ExpertTrainers;
