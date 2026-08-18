import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../common/Container";
import { ROUTES } from "../../constants/routes";

const modes = [
  {
    title: "Classroom Training",
    description: "Immersive in-person learning at our state-of-the-art facility with direct access to instructors.",
    image: "https://images.unsplash.com/photo-1577563908411-50cb98976fea?q=80&w=800&auto=format&fit=crop",
    features: [
      "Face-to-face interaction",
      "Dedicated high-performance lab",
    ],
    link: ROUTES.COURSES
  },
  {
    title: "Live Online Training",
    description: "Interactive virtual classrooms from the comfort of your home with real-time feedback.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    features: [
      "Real-time instructor interaction",
      "Recorded sessions for revision",
    ],
    link: ROUTES.COURSES
  },
  {
    title: "Corporate Training",
    description: "Customized technology skill development programs delivered for enterprise teams.",
    image: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=800&auto=format&fit=crop",
    features: [
      "Tailored technology curriculum",
      "Flexible schedule and delivery",
    ],
    link: ROUTES.CORPORATE
  }
];

const TrainingModes = () => {
  return (
    <section className="section-standard bg-white editorial-divider">
      <Container>

        <div className="mb-12">
          <span className="section-label">Learning Options</span>
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
            Flexible Training Modes
          </h2>
        </div>

        <div className="grid-12">
          {modes.map((mode, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="col-span-12 md:col-span-4 group"
            >
              {/* Image leads */}
              <div
                style={{
                  height: "230px",
                  borderRadius: "var(--radius-card)",
                  overflow: "hidden",
                  backgroundColor: "var(--surface)",
                  marginBottom: "var(--space-5)",
                }}
              >
                <img 
                  src={mode.image} 
                  alt={mode.title} 
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 700ms",
                  }}
                  className="group-hover:scale-105"
                  loading="lazy" 
                />
              </div>
              
              {/* Content underneath, no card shell */}
              <div>
                <h3
                  style={{
                    fontFamily: "'Manrope', system-ui, sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--navy)",
                    marginBottom: "var(--space-2)",
                    lineHeight: 1.3,
                  }}
                >
                  {mode.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--muted)",
                    lineHeight: 1.6,
                    marginBottom: "var(--space-4)",
                  }}
                >
                  {mode.description}
                </p>
                
                <div style={{ marginBottom: "var(--space-6)" }}>
                  {mode.features.map((feature, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--muted)",
                        marginBottom: "6px",
                      }}
                    >
                      <span style={{ color: "var(--blue)" }}>·</span> {feature}
                    </div>
                  ))}
                </div>
                
                <Link
                  to={mode.link}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--blue)",
                  }}
                >
                  Explore <ArrowRight style={{ width: 16, height: 16 }} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrainingModes;
