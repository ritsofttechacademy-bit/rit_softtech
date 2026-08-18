import { companies } from "../../data/companies";
import Container from "../common/Container";

// Duplicate the array so it can seamlessly scroll
const marqueeCompanies = [...companies, ...companies];

const HiringPartners = () => {
  return (
    <section className="section-compact bg-[#F7F8FA] editorial-divider">
      <Container>
        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden">
          {/* Left/Right Fade Overlays */}
          <div 
            className="absolute top-0 bottom-0 left-0 w-24 md:w-48 z-10 pointer-events-none" 
            style={{ background: "linear-gradient(to right, #F7F8FA, transparent)" }}
          />
          <div 
            className="absolute top-0 bottom-0 right-0 w-24 md:w-48 z-10 pointer-events-none" 
            style={{ background: "linear-gradient(to left, #F7F8FA, transparent)" }}
          />

          <div 
            className="flex items-center animate-marquee whitespace-nowrap min-w-max"
            style={{ gap: "clamp(60px, 8vw, 100px)", paddingInline: "40px" }}
          >
            {marqueeCompanies.map((company, index) => (
              <div 
                key={`${company.id}-${index}`} 
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "80px",
                  filter: "grayscale(100%)",
                  opacity: 0.4,
                  userSelect: "none"
                }}
              >
                {/* Simulated Text Logo */}
                <span
                  style={{
                    fontFamily: "'Manrope', system-ui, sans-serif",
                    fontSize: "24px",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "var(--navy)"
                  }}
                >
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HiringPartners;
