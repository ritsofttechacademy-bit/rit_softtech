import { motion } from "framer-motion";
import Container from "../common/Container";

const steps = [
  {
    num: "01",
    title: "Choose Program",
    desc: "Select a technology path aligned with your career goals."
  },
  {
    num: "02",
    title: "Learn with Experts",
    desc: "Attend structured instructor-led training and live demonstrations."
  },
  {
    num: "03",
    title: "Practice Daily",
    desc: "Strengthen your skills through exercises and practical assignments."
  },
  {
    num: "04",
    title: "Build Projects",
    desc: "Apply your learning by creating portfolio-ready applications."
  },
  {
    num: "05",
    title: "Prepare",
    desc: "Practice technical assessments, resumes and mock interviews."
  },
  {
    num: "06",
    title: "Career Grow",
    desc: "Receive structured support while exploring relevant opportunities."
  }
];

const LearningProcess = () => {
  return (
    <section className="section-standard bg-white editorial-divider">
      <Container>

        {/* Header */}
        <div className="mb-12">
          <span className="section-label">Learning Process</span>
          <h2
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 800,
              color: "var(--navy)",
              lineHeight: 1.15,
              letterSpacing: "-0.018em",
            }}
          >
            Your Journey from Learning to Career Readiness
          </h2>
        </div>

        {/* 3x2 Grid */}
        <div className="grid-12 row-gap-8 lg:row-gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="col-span-12 sm:col-span-6 lg:col-span-4"
              style={{
                paddingTop: "var(--space-6)",
                borderTop: "1px solid var(--border)",
                marginBottom: "var(--space-8)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "42px",
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontWeight: 800,
                  color: "#E5E7EB",
                  lineHeight: 1,
                  marginBottom: "var(--space-4)",
                  userSelect: "none",
                }}
              >
                {step.num}
              </span>
              <h3
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--navy)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  maxWidth: "280px",
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
};

export default LearningProcess;
