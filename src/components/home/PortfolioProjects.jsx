import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../common/Container";
import { ROUTES } from "../../constants/routes";

// Static curated projects for homepage
const featuredProjects = [
  {
    id: "e-commerce",
    course: "Full Stack Development",
    title: "Enterprise E-Commerce Platform",
    description: "Built a complete digital storefront with product catalog, authentication, shopping cart, and Stripe checkout integration. Includes a custom admin dashboard for order management.",
    tech: "React · Node.js · PostgreSQL · Tailwind",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    link: ROUTES.COURSES
  },
  {
    id: "ml-predictive",
    course: "Data Science & AI",
    title: "Predictive Analytics Dashboard",
    description: "Developed a machine learning model to predict customer churn based on historical usage data. Integrated the model into a React dashboard with live D3.js data visualizations.",
    tech: "Python · Scikit-Learn · React · D3.js",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    link: ROUTES.COURSES
  },
  {
    id: "cloud-infra",
    course: "Cloud & DevOps",
    title: "Scalable Microservices Architecture",
    description: "Designed and deployed a highly available microservices infrastructure on AWS. Implemented containerization with Docker, orchestration with Kubernetes, and automated CI/CD pipelines.",
    tech: "AWS · Kubernetes · Docker · Jenkins",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    link: ROUTES.COURSES
  }
];

const PortfolioProjects = () => {
  return (
    <section className="section-large bg-[#F7F8FA] editorial-divider">
      <Container>

        {/* Header */}
        <div className="mb-[112px] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="section-label">Portfolio</span>
            <h2
              style={{
                fontFamily: "'Manrope', system-ui, sans-serif",
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 800,
                color: "var(--navy)",
                lineHeight: 1.15,
                letterSpacing: "-0.018em",
                maxWidth: "480px"
              }}
            >
              Real applications built by our learners.
            </h2>
          </div>
          <Link
            to={ROUTES.COURSES}
            className="btn-outline hidden md:inline-flex"
            style={{ backgroundColor: "white" }}
          >
            Explore Programs
          </Link>
        </div>

        {/* Alternating Projects */}
        <div className="space-y-[112px]">
          {featuredProjects.map((project, i) => {
            const isReversed = i % 2 !== 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="grid-12 items-center"
              >
                {/* Image — 7 cols */}
                <div 
                  className={`col-span-12 lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'} mb-8 lg:mb-0`}
                >
                  <div
                    style={{
                      aspectRatio: "16/10",
                      borderRadius: "var(--radius-card)",
                      overflow: "hidden",
                      backgroundColor: "white",
                      border: "1px solid var(--border)"
                    }}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content — 5 cols */}
                <div 
                  className={`col-span-12 lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'} ${isReversed ? 'lg:pr-[5%]' : 'lg:pl-[5%]'}`}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--blue)",
                      marginBottom: "var(--space-3)"
                    }}
                  >
                    {project.course}
                  </div>
                  
                  <h3
                    style={{
                      fontFamily: "'Manrope', system-ui, sans-serif",
                      fontSize: "clamp(22px, 2vw, 28px)",
                      fontWeight: 800,
                      color: "var(--navy)",
                      marginBottom: "var(--space-4)",
                      lineHeight: 1.2
                    }}
                  >
                    {project.title}
                  </h3>
                  
                  <p
                    style={{
                      fontSize: "15px",
                      color: "var(--muted)",
                      lineHeight: 1.65,
                      marginBottom: "var(--space-5)"
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--navy)",
                      marginBottom: "var(--space-6)"
                    }}
                  >
                    {project.tech}
                  </div>

                  <Link
                    to={project.link}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--blue)",
                    }}
                  >
                    Explore Related Program <ArrowRight style={{ width: 15, height: 15 }} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-[64px] md:hidden">
          <Link
            to={ROUTES.COURSES}
            className="btn-outline w-full"
            style={{ backgroundColor: "white" }}
          >
            Explore Programs
          </Link>
        </div>

      </Container>
    </section>
  );
};

export default PortfolioProjects;
