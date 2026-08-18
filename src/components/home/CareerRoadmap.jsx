import { motion } from "framer-motion";
import Container from "../common/Container";

const tracks = [
  {
    label: "Software Development",
    steps: [
      { num: "01", title: "Foundations", skills: ["HTML", "CSS", "JavaScript"] },
      { num: "02", title: "Frontend",    skills: ["React", "State", "APIs"] },
      { num: "03", title: "Backend",     skills: ["Node / Java", "REST APIs", "Auth"] },
      { num: "04", title: "Database",    skills: ["SQL", "MongoDB", "ORM"] },
      { num: "05", title: "Deployment",  skills: ["Docker", "CI/CD", "Cloud"] },
    ],
  },
];

const CareerRoadmap = () => {
  const track = tracks[0];

  return (
    <section className="section-base bg-[#F7F8FA] border-b border-[#E5E7EB]">
      <Container>

        {/* Header */}
        <div className="mb-12">
          <span className="section-tag">CAREER ROADMAP</span>
          <h2 className="text-[28px] md:text-[36px] font-heading font-extrabold text-[#0F172A] leading-tight tracking-tight">
            {track.label}
          </h2>
        </div>

        {/* Steps — horizontal rail */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 relative">

          {/* Connector line — desktop only */}
          <div
            className="absolute top-[22px] left-0 right-0 h-px bg-[#E5E7EB] hidden sm:block"
            style={{ width: "calc(100% - 48px)", left: "24px" }}
          />

          {track.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative pt-12 sm:pt-[52px] pb-6 sm:pr-6"
            >
              {/* Step dot */}
              <div className="absolute top-0 left-0 sm:left-0 w-[44px] h-[44px] rounded-full bg-white border-2 border-[#E5E7EB] flex items-center justify-center">
                <span className="text-[11px] font-black text-[#006EDB]">{step.num}</span>
              </div>

              <h3 className="text-[16px] font-heading font-bold text-[#0F172A] mb-3">
                {step.title}
              </h3>

              <ul className="space-y-1.5">
                {step.skills.map((s) => (
                  <li key={s} className="text-[13px] text-[#64748B] font-medium">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
};

export default CareerRoadmap;
