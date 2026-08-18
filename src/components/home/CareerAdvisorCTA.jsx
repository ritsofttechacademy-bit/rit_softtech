import { Link } from "react-router-dom";
import Container from "../common/Container";
import { useInquiry } from "../../context/InquiryContext";
import { ROUTES } from "../../constants/routes";

const CareerAdvisorCTA = () => {
  const { openInquiry } = useInquiry();

  return (
    <section className="bg-white" style={{ paddingBlock: "80px" }}>
      <Container>
        <div 
          style={{ 
            backgroundColor: "#1D4ED8", 
            borderRadius: "12px", 
            padding: "48px 56px",
            display: "flex",
            alignItems: "center",
            minHeight: "260px"
          }}
        >
          <div className="grid-12 w-full items-center">
            
            {/* Left text - 8 cols */}
            <div className="col-span-12 lg:col-span-8 mb-8 lg:mb-0 pr-0 lg:pr-12">
              <h2 style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "white", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "16px" }}>
                Ready to start your tech career?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.9)", lineHeight: 1.6, maxWidth: "500px" }}>
                Talk to our career advisors to find the right training program and batch timing that fits your schedule.
              </p>
            </div>

            {/* Right buttons - 4 cols */}
            <div className="col-span-12 lg:col-span-4 flex flex-col sm:flex-row gap-4 lg:justify-end">
              <button 
                onClick={() => openInquiry()}
                style={{ 
                  backgroundColor: "white", 
                  color: "#1D4ED8", 
                  fontWeight: 700, 
                  fontSize: "15px",
                  height: "48px",
                  padding: "0 28px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                Request a Callback
              </button>
              <Link 
                to={ROUTES.CONTACT}
                style={{ 
                  backgroundColor: "rgba(255,255,255,0.15)", 
                  color: "white", 
                  fontWeight: 700, 
                  fontSize: "15px",
                  height: "48px",
                  padding: "0 28px",
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none"
                }}
              >
                Contact Us
              </Link>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default CareerAdvisorCTA;
