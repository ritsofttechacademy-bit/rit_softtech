import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import { ROUTES } from "../../constants/routes";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  {
    tag: "Special Offer",
    text: "Enroll in our Python Full Stack batch starting next week and get 20% off!",
    linkText: "View Batches",
    linkUrl: ROUTES.BATCHES,
  },
  {
    tag: "Admissions Open",
    text: "Admissions Open for 2026–27. 100% Placement Assistance Guarantee.",
    linkText: "Apply Now",
    linkUrl: ROUTES.ENQUIRY,
  },
  {
    tag: "Free Guidance",
    text: "Confused about your career path? Free Career Guidance Available.",
    linkText: "Book Session",
    linkUrl: ROUTES.CONTACT,
  },
];

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Check session storage on mount
  useEffect(() => {
    const hidden = sessionStorage.getItem("announcement_hidden");
    if (hidden === "true") {
      setIsVisible(false);
    }
  }, []);

  // Rotate messages every 5 seconds
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcement_hidden", "true");
  };

  if (!isVisible) return null;

  const msg = messages[currentIndex];

  return (
    <div className="bg-navy text-white relative z-50 border-b border-white/10 hidden sm:block">
      <Container>
        <div className="flex items-center justify-center py-2 px-8 relative min-h-[38px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium text-center flex items-center gap-3"
            >
              <span className="bg-primary-600/30 text-primary-200 border border-primary-500/30 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                {msg.tag}
              </span>
              <span className="text-slate-300">{msg.text}</span>
              <Link
                to={msg.linkUrl}
                className="inline-flex items-center gap-1 font-bold text-white hover:text-primary-300 transition-colors"
              >
                {msg.linkText} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={handleDismiss}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default AnnouncementBar;
