import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquareMore } from "lucide-react";
import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import { ROUTES } from "../../constants/routes";
import { placementProcess } from "../../data/placementProcess";
import { useInquiry } from "../../context/InquiryContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const PlacementProcess = () => {
  const { openInquiry } = useInquiry();

  return (
    <section className="section-pad bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionHeader
            tag="PLACEMENT PROCESS"
            title="Structured Support From Training to Interviews"
            subtitle="Career preparation begins before course completion. Our process helps learners strengthen their profiles, practice interviews and prepare for relevant opportunities."
            align="center"
            className="mb-0"
          />
        </div>

        {/* Desktop Process Flow (Grid layout representing a connected timeline) */}
        <div className="hidden lg:grid grid-cols-4 gap-y-12 gap-x-6 relative mb-16">
          {placementProcess.map((item, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              variants={fadeUp}
              className={`relative ${index >= 4 ? (index === 4 ? "col-start-1" : "") : ""}`}
            >
              {/* Connector line */}
              {(index !== 3 && index !== placementProcess.length - 1) && (
                <div className="absolute top-4 left-6 right-[-24px] h-px bg-slate-200 z-0" />
              )}
              
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-white border-[3px] border-primary-500 flex items-center justify-center mb-4 shadow-sm">
                  <span className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                </div>
                <h4 className="font-bold text-navy text-[17px] mb-2 leading-tight pr-4">
                  <span className="text-primary-600 block text-[11px] mb-1">{item.step}</span>
                  {item.title}
                </h4>
                <p className="text-sm text-secondary pr-4 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tablet Process (3 columns) */}
        <div className="hidden md:grid lg:hidden grid-cols-3 gap-8 mb-16">
          {placementProcess.map((item, index) => (
             <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              variants={fadeUp}
              className="bg-slate-50 p-6 rounded-2xl border border-slate-100"
            >
              <span className="text-primary-600 font-bold text-sm block mb-2">{item.step}</span>
              <h4 className="font-bold text-navy text-[17px] mb-2 leading-tight">
                {item.title}
              </h4>
              <p className="text-sm text-secondary leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden flex flex-col gap-6 relative pl-6 mb-12">
          {/* Vertical Connector */}
          <div className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-slate-200" />
          
          {placementProcess.map((item, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              variants={fadeUp}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute top-1.5 -left-[29px] w-4 h-4 rounded-full bg-white border-[3px] border-primary-500 z-10" />
              
              <div>
                <h4 className="font-bold text-navy text-[15px] mb-1.5 leading-tight">
                  <span className="text-primary-600 mr-2">{item.step}</span>
                  {item.title}
                </h4>
                <p className="text-sm text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to={ROUTES.PLACEMENTS} 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-3.5 px-8 rounded-btn hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
          >
            Explore Placement Support <ArrowRight className="w-5 h-5" />
          </Link>
          <button 
            onClick={() => openInquiry()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-navy font-bold py-3.5 px-8 rounded-btn border border-border hover:bg-slate-50 transition-colors"
          >
            <MessageSquareMore className="w-5 h-5 text-primary-600" /> Talk to a Career Advisor
          </button>
        </div>

      </Container>
    </section>
  );
};

export default PlacementProcess;
