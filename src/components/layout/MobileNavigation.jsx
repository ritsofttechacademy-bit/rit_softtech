import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES } from "../../constants/routes";
import { siteConfig } from "../../data/siteConfig";
import { useInquiry } from "../../context/InquiryContext";
import Button from "../common/Button";
import MobileCoursesAccordion from "./MobileCoursesAccordion";
import { useState } from "react";

const MobileNavigation = ({ isOpen, onClose }) => {
  const { openInquiry } = useInquiry();
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navItemClass = ({ isActive }) =>
    `block py-4 font-heading font-bold text-lg border-b border-border/50 transition-colors ${
      isActive ? "text-primary-600" : "text-navy"
    }`;

  const resources = [
    { name: "Tech Blog", path: ROUTES.BLOG },
    { name: "Student Reviews", path: ROUTES.STUDENT_REVIEWS },
    { name: "Success Stories", path: ROUTES.SUCCESS_STORIES },
    { name: "Our Trainers", path: ROUTES.TRAINERS },
    { name: "FAQ", path: ROUTES.FAQ },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-[375px] w-[90vw] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
              <img src="/rit-softtech-wordmark.svg" alt={siteConfig.name} className="h-11 w-auto max-w-[200px] object-contain" />
              <button
                onClick={onClose}
                className="p-2 text-muted hover:text-navy hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Navigation */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <nav className="flex flex-col">
                <NavLink to={ROUTES.HOME} onClick={onClose} className={navItemClass}>
                  Home
                </NavLink>

                <MobileCoursesAccordion onClose={onClose} />

                <NavLink to={ROUTES.BATCHES} onClick={onClose} className={navItemClass}>
                  Batches
                </NavLink>
                
                <NavLink to={ROUTES.PLACEMENTS} onClick={onClose} className={navItemClass}>
                  Placements
                </NavLink>
                
                <NavLink to={ROUTES.CORPORATE_TRAINING} onClick={onClose} className={navItemClass}>
                  Corporate Training
                </NavLink>
                
                <NavLink to={ROUTES.ABOUT} onClick={onClose} className={navItemClass}>
                  About Us
                </NavLink>

                {/* Resources Accordion */}
                <div className="border-b border-border/50">
                  <button
                    onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                    className="w-full flex items-center justify-between py-4 text-left font-heading font-bold text-lg text-navy"
                    aria-expanded={isResourcesOpen}
                  >
                    Resources
                    <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-200 ${isResourcesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isResourcesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="pb-4 space-y-1 bg-slate-50 rounded-xl p-2 mb-4 border border-slate-100">
                          {resources.map((item) => (
                            <li key={item.path}>
                              <Link
                                to={item.path}
                                onClick={onClose}
                                className="block px-4 py-3 text-[15px] font-medium text-secondary hover:text-primary-600 hover:bg-white rounded-lg"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </div>

            {/* Sticky Actions */}
            <div className="p-4 md:p-6 border-t border-border bg-slate-50 mt-auto">
              <Button 
                className="w-full justify-center shadow-md mb-3" 
                size="lg"
                onClick={() => {
                  onClose();
                  openInquiry();
                }}
              >
                Enquire Now
              </Button>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1 justify-center" href="tel:+919100920092">
                  Call Advisor
                </Button>
                <Button variant="outline" className="flex-[0.5] justify-center px-0" href="https://wa.me/919100920092" target="_blank" rel="noreferrer">
                  <i className="fab fa-whatsapp text-lg text-emerald-500"></i>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
