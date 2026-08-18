import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../common/Container";
import { ROUTES } from "../../constants/routes";

const reasons = [
  { n: "01", text: "Practical curriculum aligned to real job requirements" },
  { n: "02", text: "Experienced trainers with active industry background" },
  { n: "03", text: "Project-based learning for a strong portfolio" },
  { n: "04", text: "Structured career preparation and interview support" },
];

const modes = [
  {
    title: "Classroom Training",
    desc: "Instructor-led sessions at our training center.",
    link: ROUTES.COURSES,
  },
  {
    title: "Live Online",
    desc: "Attend instructor-led sessions remotely with recordings.",
    link: ROUTES.COURSES,
  },
  {
    title: "Corporate Training",
    desc: "Customized programs for technology teams.",
    link: ROUTES.CORPORATE_TRAINING,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white editorial-divider" style={{ paddingBlock: "64px" }}>
      <Container>
        <div className="grid-12 gap-y-10">

          {/* Left — 5 cols: Why Nexora */}
          <motion.div
            className="col-span-12 lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "12px" }}>
              Why Nexora
            </span>
            <h2 style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.2, letterSpacing: "-0.015em", maxWidth: "340px", marginBottom: "32px" }}>
              Training focused on practical skills.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {reasons.map((r) => (
                <div key={r.n} style={{ display: "flex", alignItems: "flex-start", gap: "16px", paddingBottom: "20px", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#CBD5E1", flexShrink: 0, paddingTop: "2px" }}>{r.n}</span>
                  <p style={{ fontSize: "15px", color: "var(--navy)", fontWeight: 500, lineHeight: 1.5 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — 7 cols: Training Modes */}
          <motion.div
            className="col-span-12 lg:col-span-7 lg:pl-[8%]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "12px" }}>
              Learning Options
            </span>
            <h2 style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.2, letterSpacing: "-0.015em", marginBottom: "32px" }}>
              Three ways to learn.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0px", borderTop: "1px solid var(--border)" }}>
              {modes.map((mode, i) => (
                <Link
                  key={i}
                  to={mode.link}
                  className="group"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0", borderBottom: "1px solid var(--border)", textDecoration: "none" }}
                >
                  <div>
                    <h3 style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "17px", fontWeight: 700, color: "var(--navy)", marginBottom: "4px" }} className="group-hover:text-blue-600 transition-colors">
                      {mode.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--muted)" }}>{mode.desc}</p>
                  </div>
                  <ArrowRight style={{ width: 16, height: 16, color: "#CBD5E1", flexShrink: 0, marginLeft: "16px" }} className="group-hover:text-blue-500 transition-colors" />
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
