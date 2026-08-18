import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import Container from "../common/Container";
import { ROUTES } from "../../constants/routes";
import { faqs } from "../../data/faqs";

const FAQSection = () => {
  // Use first 5 FAQs as requested
  const homeFaqs = faqs.slice(0, 5);
  const [openId, setOpenId] = useState(homeFaqs[0]?.id);

  return (
    <section className="bg-[#F7F8FA] editorial-divider" style={{ paddingBlock: "64px" }}>
      <Container>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "24px" }}>
            FAQ
          </span>
          
          <h2 style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.2, letterSpacing: "-0.015em", marginBottom: "40px" }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
            {homeFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  style={{ 
                    backgroundColor: "white", 
                    borderRadius: "8px", 
                    overflow: "hidden", 
                    border: "1px solid var(--border)"
                  }}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    style={{ 
                      width: "100%", 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center", 
                      padding: "20px 24px",
                      textAlign: "left"
                    }}
                  >
                    <span style={{ fontSize: "16px", fontWeight: 700, color: isOpen ? "var(--blue)" : "var(--navy)" }}>
                      {faq.question}
                    </span>
                    <ChevronDown 
                      style={{ 
                        width: 20, 
                        height: 20, 
                        color: isOpen ? "var(--blue)" : "var(--muted)", 
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", 
                        transition: "transform 0.3s ease" 
                      }} 
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div style={{ padding: "0 24px 24px 24px", fontSize: "15px", color: "var(--muted)", lineHeight: 1.6 }}>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <Link 
            to={ROUTES.FAQ} 
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "14px", fontWeight: 700, color: "var(--blue)" }}
          >
            View all FAQs <ArrowRight style={{ width: 15, height: 15 }} />
          </Link>
          
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
