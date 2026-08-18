import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Award } from "lucide-react";
import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import { ROUTES } from "../../constants/routes";

const features = [
  "Course Completion",
  "Project Recognition",
  "Skills Verification",
  "Shareable Credential"
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const CertificatePreview = () => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl border border-slate-200 relative overflow-hidden max-w-lg mx-auto w-full aspect-[4/3] flex flex-col justify-between">
      {/* Background Security Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 10px), repeating-linear-gradient(-45deg, #000 0, #000 1px, transparent 1px, transparent 10px)`
        }}
      />
      
      {/* Border Decoration */}
      <div className="absolute inset-4 border-2 border-slate-100 rounded-lg pointer-events-none" />
      <div className="absolute inset-5 border border-primary-100 rounded-md pointer-events-none" />

      {/* Header */}
      <div className="text-center relative z-10 pt-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Award className="w-8 h-8 text-primary-600" />
          <h2 className="font-heading font-black text-2xl tracking-tight text-navy">
            RIT<span className="text-primary-500">.</span>
          </h2>
        </div>
        <div className="tracking-[0.2em] text-[10px] md:text-xs font-bold text-slate-400 mb-2">
          CERTIFICATE OF COMPLETION
        </div>
      </div>

      {/* Body */}
      <div className="text-center relative z-10 flex-grow flex flex-col justify-center">
        <p className="text-xs text-slate-500 mb-2 italic font-serif">This is to certify that</p>
        <h3 className="font-heading font-bold text-2xl md:text-3xl text-navy mb-4 border-b-2 border-primary-100 pb-2 inline-block mx-auto px-8">
          Anjali Reddy
        </h3>
        <p className="text-xs text-slate-500 mb-2 font-serif italic">has successfully completed the</p>
        <h4 className="font-bold text-lg md:text-xl text-primary-700">
          Python Full Stack Development
        </h4>
        <p className="text-[10px] text-slate-400 mt-2 font-mono">Program ID: NXA-PFS-2026-001</p>
      </div>

      {/* Footer / Signatures */}
      <div className="flex justify-between items-end relative z-10 pb-2 px-2">
        <div className="text-center">
          <div className="w-24 h-px bg-slate-300 mb-2 mx-auto" />
          <p className="text-[10px] font-bold text-navy">Head of Training</p>
        </div>
        
        {/* Seal */}
        <div className="w-16 h-16 rounded-full border-4 border-primary-100 bg-primary-50 flex items-center justify-center relative">
          <div className="absolute inset-1 border border-primary-200 rounded-full" />
          <Award className="w-6 h-6 text-primary-500" />
        </div>

        <div className="text-center">
          <div className="w-24 h-px bg-slate-300 mb-2 mx-auto" />
          <p className="text-[10px] font-bold text-navy">Issue Date</p>
        </div>
      </div>
    </div>
  );
};

const CertificationSection = () => {
  return (
    <section className="section-pad bg-navy text-white overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[80px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <SectionHeader
              tag={<span className="text-primary-400">CERTIFICATION</span>}
              title={<span className="text-white">Showcase the Skills You've Built</span>}
              subtitle={<span className="text-slate-300">Complete your training program, practical assignments and project requirements to earn a professional RIT course completion certificate.</span>}
              align="left"
              className="mb-10"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  variants={fadeUp}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  <span className="font-semibold text-slate-200 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              variants={fadeUp}
            >
              <Link 
                to={`${ROUTES.ABOUT}#certification`} 
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-3.5 px-8 rounded-btn hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20"
              >
                View Certification Process <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Right Visual (Certificate Preview) */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="order-1 lg:order-2 perspective-1000 flex justify-center"
          >
             <div className="w-full transform transition-transform hover:scale-105 duration-500">
               <CertificatePreview />
             </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default CertificationSection;
