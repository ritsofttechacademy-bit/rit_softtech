import { motion } from "framer-motion";
import Button from "../common/Button";
import { useInquiry } from "../../context/InquiryContext";
import { Star, Users, Award } from "lucide-react";
import HeroVisual from "./HeroVisual";

const HeroSlide = ({ slide, isActive }) => {
  const { openInquiry } = useInquiry();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (!isActive) return null;

  return (
    <div className="w-full h-full flex items-center">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-2 md:pt-4 pb-16 md:pb-24">
          
          {/* Content Column */}
          <motion.div 
            className="flex flex-col items-center text-center lg:items-start lg:text-left z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-bold uppercase tracking-wider mb-6"
            >
              {slide.badge}
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-[56px] font-heading font-extrabold text-navy leading-[1.1] mb-6 text-balance"
            >
              {slide.headingPart1}
              <br />
              <span className="text-primary-600">{slide.headingHighlight}</span>
              <br />
              {slide.headingPart2}
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-secondary leading-relaxed mb-8 max-w-xl text-balance"
            >
              {slide.description}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Button to={slide.primaryAction.url} size="lg" className="w-full sm:w-auto shadow-lg shadow-primary-500/20">
                {slide.primaryAction.label}
              </Button>
              {slide.secondaryAction.action === "inquiry" ? (
                <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={() => openInquiry()}>
                  {slide.secondaryAction.label}
                </Button>
              ) : (
                <Button variant="secondary" size="lg" className="w-full sm:w-auto" to={slide.secondaryAction.url}>
                  {slide.secondaryAction.label}
                </Button>
              )}
            </motion.div>

            {/* Inline Trust Indicators (Desktop only) */}
            <motion.div 
              variants={itemVariants}
              className="hidden lg:flex items-center gap-6 mt-12 pt-8 border-t border-border"
            >
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-sm font-bold text-navy">4.8 Rating</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-bold text-navy">5L+ Learners</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-bold text-navy">100+ Programs</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Column */}
          <div className="relative hidden md:block">
            {isActive && <HeroVisual slideId={slide.id} />}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
