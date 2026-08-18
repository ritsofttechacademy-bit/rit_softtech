import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../common/Container";
import { ROUTES } from "../../constants/routes";
import { useInquiry } from "../../context/InquiryContext";

const Hero = () => {
  const { openInquiry } = useInquiry();

  return (
    <section className="bg-white border-b" style={{ borderColor: "var(--border)" }}>
      <Container>
        <div
          className="grid-12 items-center"
          style={{ paddingTop: "40px", paddingBottom: "56px", minHeight: "520px" }}
        >
          {/* ── Left: 5 cols ── */}
          <motion.div
            className="col-span-12 lg:col-span-5 flex flex-col justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--blue)",
                marginBottom: "16px",
              }}
            >
              Career-Focused IT Training
            </span>

            <h1
              style={{
                fontFamily: "'Manrope', system-ui, sans-serif",
                fontSize: "clamp(32px, 3.5vw, 46px)",
                fontWeight: 800,
                color: "var(--navy)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                maxWidth: "480px",
                marginBottom: "20px",
              }}
            >
              Practical IT Training for Modern Careers.
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "var(--muted)",
                lineHeight: 1.6,
                maxWidth: "400px",
                marginBottom: "32px",
              }}
            >
              Learn software development, AI, cloud and data through structured instructor-led training.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => openInquiry()}
                className="btn-primary"
                style={{ height: "44px", padding: "0 24px", fontSize: "15px" }}
              >
                Explore Courses
              </button>
              <Link
                to={ROUTES.BATCHES}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--navy)",
                }}
              >
                View Batches <ArrowRight style={{ width: 15, height: 15 }} />
              </Link>
            </div>

            <div
              style={{
                marginTop: "28px",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--muted)",
              }}
            >
              ⭐ 4.8 learner feedback across 15,000+ students
            </div>
          </motion.div>

          {/* ── Right: 7 cols ── */}
          <motion.div
            className="col-span-12 lg:col-span-7 mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              style={{
                borderRadius: "var(--radius-card)",
                overflow: "hidden",
                height: "clamp(280px, 32vw, 440px)",
                backgroundColor: "var(--surface)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop&fit=crop&crop=right"
                alt="IT training classroom"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
