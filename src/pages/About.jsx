import { motion } from "framer-motion";
import { 
  Laptop, Heart, Briefcase, TrendingUp, Shield, Target, 
  CheckCircle2, Users, BookOpen, GraduationCap, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { aboutTimeline, leadership, coreValues } from "../data/about";
import { ROUTES } from "../constants/routes";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const ICON_MAP = { Laptop, Heart, Briefcase, TrendingUp, Shield, Target };

const LinkedinMark = ({ className = "" }) => (
  <span aria-hidden="true" className={`inline-flex items-center justify-center rounded-sm font-heading font-black leading-none ${className}`}>
    in
  </span>
);

const StatBlock = ({ value, label, note, delay = 0 }) => (
  <motion.div
    initial="hidden" whileInView="visible" viewport={{ once: true }}
    transition={{ duration: 0.5, delay }} variants={fadeUp}
    className="text-center px-4 py-8 bg-white rounded-2xl border border-border shadow-sm flex flex-col justify-center"
  >
    <div className="text-4xl lg:text-[44px] font-black text-navy mb-2 leading-none">{value}</div>
    <div className="text-sm font-bold text-secondary mb-1">{label}</div>
    {note && <div className="text-[10px] text-slate-400 mt-1">{note}</div>}
  </motion.div>
);

const About = () => {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-border pt-28 pb-16 md:pb-24">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-[55%] relative z-10">
              <span className="inline-block text-primary-600 font-bold text-xs uppercase tracking-widest mb-5 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-100">
                ABOUT RIT
              </span>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-[1.1] text-navy mb-6">
                Helping Learners Build<br />
                <span className="text-primary-600">Careers Through Technology</span>
              </h1>
              <p className="text-secondary text-lg leading-relaxed max-w-[650px]">
                RIT Softtech Academy combines structured instruction, practical technology training and career preparation to help learners develop skills for modern digital careers.
              </p>
            </div>
            
            <div className="w-full lg:w-[45%]">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-lg border border-white">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" alt="Collaborative learning" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-lg border border-white">
                    <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop" alt="Student coding" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Metrics ──────────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-border -mt-8 relative z-20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBlock value="25+" label="Years Experience" note="*Demo data" delay={0.1} />
            <StatBlock value="5L+" label="Learners" note="*Demo data" delay={0.2} />
            <StatBlock value="100+" label="Programs" note="*Demo data" delay={0.3} />
            <StatBlock value="50+" label="Experts" note="*Demo data" delay={0.4} />
          </div>
        </Container>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="w-full lg:w-1/2">
              <div className="rounded-3xl overflow-hidden shadow-xl relative aspect-[4/3]">
                <div className="absolute inset-0 bg-primary-600/10 mix-blend-overlay z-10" />
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop" alt="Our story" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest block mb-4">OUR STORY</span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-navy mb-6">Built on Practical Learning</h2>
              <div className="space-y-5 text-secondary leading-relaxed">
                <p className="text-lg font-semibold text-navy">
                  RIT was built around one simple principle: technology training should be practical, structured and connected to real career requirements.
                </p>
                <p>
                  For over two decades, we have bridged the gap between academic knowledge and industry expectations. We observed that while theoretical understanding is important, true capability is forged through hands-on practice, guided mentorship, and real-world project execution.
                </p>
                <p>
                  Today, we continue to evolve our curriculum to meet the demands of modern technology teams, ensuring that our learners are equipped not just with syntax, but with problem-solving abilities.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-y border-border">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white p-10 rounded-3xl border border-border shadow-sm flex flex-col justify-center">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-navy mb-4">Our Mission</h3>
              <p className="text-secondary text-lg leading-relaxed">
                Enable learners to build practical, relevant and career-ready technology skills through structured learning and expert guidance.
              </p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} delay={0.2} className="bg-white p-10 rounded-3xl border border-border shadow-sm flex flex-col justify-center">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-navy mb-4">Our Vision</h3>
              <p className="text-secondary text-lg leading-relaxed">
                Create an accessible technology learning ecosystem connecting education, practical experience and sustainable career growth.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Core Values ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <SectionHeader tag="CORE PRINCIPLES" title="Our Values" subtitle="The principles that guide our curriculum, instruction, and student support." align="center" className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, i) => {
              const Icon = ICON_MAP[val.icon] || CheckCircle2;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} variants={fadeUp}
                  className="p-8 bg-slate-50 rounded-2xl border border-border hover:border-primary-300 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-border mb-5">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-navy text-xl mb-3">{val.title}</h3>
                  <p className="text-secondary leading-relaxed">{val.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Learning Philosophy (Visual Flow) ────────────────────────── */}
      <section className="py-16 md:py-24 bg-navy text-white overflow-hidden">
        <Container>
          <div className="text-center mb-16">
            <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest block mb-4">METHODOLOGY</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl">Our Learning Philosophy</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
            {["Learn", "Practice", "Build", "Validate", "Prepare", "Grow"].map((step, i, arr) => (
              <div key={step} className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-primary-500 flex items-center justify-center mb-3 text-lg font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm font-semibold text-slate-300">{step}</span>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-slate-600 hidden md:block rotate-90 md:rotate-0 my-4 md:my-0 -mt-6" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-slate-50">
        <Container>
          <SectionHeader tag="HISTORY" title="Our Journey" subtitle="*Demo timeline representing organizational milestones." align="center" className="mb-14" />
          
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 md:-translate-x-1/2" />
            
            <div className="space-y-12 relative z-10">
              {aboutTimeline.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} variants={fadeUp}
                    className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Center Node */}
                    <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-[4px] border-primary-500 -translate-x-[15px] md:-translate-x-1/2 mt-1 shadow-sm" />
                    
                    {/* Content */}
                    <div className={`pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <span className="inline-block text-primary-600 font-black text-xl mb-2">{item.year}</span>
                      <h4 className="font-bold text-navy text-lg mb-2">{item.title}</h4>
                      <p className="text-secondary text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Leadership ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <SectionHeader tag="LEADERSHIP" title="Guiding the Vision" subtitle="Meet the team driving our commitment to technology education." align="center" className="mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, i) => (
              <motion.div key={person.id} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} variants={fadeUp}
                className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow group">
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                  <img src={person.image} alt={person.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-navy text-lg">{person.name}</h3>
                  <p className="text-primary-600 text-sm font-semibold mb-3">{person.designation}</p>
                  <p className="text-secondary text-sm leading-relaxed mb-4">{person.bio}</p>
                  <a href={person.linkedin} aria-label={`${person.name} LinkedIn`} className="inline-flex w-8 h-8 rounded-full bg-slate-50 items-center justify-center text-slate-400 hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-colors">
                    <LinkedinMark className="w-4 h-4 text-[11px]" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Quality Commitment ───────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <Container>
          <div className="bg-white rounded-[24px] border border-border shadow-sm p-8 md:p-12 text-center max-w-4xl mx-auto">
            <Shield className="w-12 h-12 text-primary-500 mx-auto mb-6" />
            <h2 className="font-heading font-bold text-3xl text-navy mb-8">Our Quality Commitment</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["Structured Curriculum", "Practical Assignments", "Trainer Quality", "Learner Feedback", "Continuous Updates", "Career Preparation"].map(q => (
                <span key={q} className="inline-flex items-center gap-1.5 bg-slate-50 border border-border rounded-full px-4 py-2 text-sm font-semibold text-navy">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {q}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
};

export default About;
