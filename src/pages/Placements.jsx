import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search, Briefcase, Building, MapPin, ArrowRight,
  FileText, MessageSquareMore, CheckCircle2, Users,
  BarChart2, TrendingUp, Award, Star, Shield, Laptop
} from "lucide-react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { ROUTES } from "../constants/routes";
import { useInquiry } from "../context/InquiryContext";
import { placements } from "../data/placements";
import { companies } from "../data/companies";
import { placementProcess } from "../data/placementProcess";
import { faqs } from "../data/faqs";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

// ── Placement Card ────────────────────────────────────────────────────
const PlacementCard = ({ p, delay = 0 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    variants={fadeUp}
    className="bg-white rounded-2xl border border-border p-6 flex flex-col hover:border-primary-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
  >
    {/* Avatar */}
    <div className="flex items-center gap-4 mb-5">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm"
        style={{ backgroundColor: p.imageColor }}
      >
        {p.initials}
      </div>
      <div>
        <h3 className="font-bold text-navy text-lg leading-tight">{p.name}</h3>
        <p className="text-xs text-secondary mt-0.5">{p.course}</p>
      </div>
    </div>

    {/* Job Info */}
    <div className="bg-slate-50 rounded-xl p-4 flex-grow mb-4 space-y-2.5">
      <div className="flex items-start gap-2">
        <Briefcase className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
        <span className="text-sm font-bold text-navy leading-tight">{p.role}</span>
      </div>
      <div className="flex items-center gap-2">
        <Building className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-sm font-semibold text-slate-600">{p.company}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-xs font-semibold text-slate-500">{p.location}</span>
      </div>
    </div>

    {/* Package + Batch */}
    <div className="flex items-center justify-between border-t border-border pt-3">
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Batch</span>
        <span className="text-xs font-bold text-slate-600">{p.batch}</span>
      </div>
      <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
        {p.package}
      </span>
    </div>
  </motion.div>
);

// ── Stat Block ────────────────────────────────────────────────────────
const StatBlock = ({ value, label, note, delay = 0 }) => (
  <motion.div
    initial="hidden" whileInView="visible" viewport={{ once: true }}
    transition={{ duration: 0.5, delay }} variants={fadeUp}
    className="text-center px-6 py-8 bg-white rounded-2xl border border-border shadow-sm"
  >
    <div className="text-4xl lg:text-5xl font-black text-navy mb-2">{value}</div>
    <div className="text-sm font-bold text-secondary mb-1">{label}</div>
    {note && <div className="text-[10px] text-slate-400">{note}</div>}
  </motion.div>
);

// ── Career Prep Card ──────────────────────────────────────────────────
const PrepCard = ({ icon: Icon, title, description, color }) => (
  <div className={`bg-white rounded-2xl border border-border p-6 hover:border-primary-300 hover:shadow-md transition-all hover:-translate-y-0.5 group`}>
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="font-bold text-navy text-lg mb-2">{title}</h3>
    <p className="text-sm text-secondary leading-relaxed">{description}</p>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────
const Placements = () => {
  const { openInquiry } = useInquiry();
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const allCourses = [...new Set(placements.map(p => p.course))].sort();
  const allYears = [...new Set(placements.map(p => p.batch))].sort((a, b) => b - a);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return placements.filter(p => {
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || p.company.toLowerCase().includes(q);
      const matchCourse = !filterCourse || p.course === filterCourse;
      const matchYear = !filterYear || p.batch === filterYear;
      return matchQ && matchCourse && matchYear;
    });
  }, [search, filterCourse, filterYear]);

  const placementFaqs = faqs.slice(3, 9);

  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-border pt-28 pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <span className="inline-block text-primary-600 font-bold text-xs uppercase tracking-widest mb-5 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-100">CAREER SUPPORT</span>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[52px] leading-[1.1] text-navy mb-6">
                Building Skills Is Only<br />
                <span className="text-primary-600">Part of the Journey</span>
              </h1>
              <p className="text-secondary text-lg leading-relaxed mb-8 max-w-[560px]">
                Our career preparation ecosystem helps learners strengthen their profiles, prepare for interviews and explore relevant technology opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => openInquiry({ source: "placements-hero" })}
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-3.5 px-7 rounded-btn hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                >
                  <MessageSquareMore className="w-5 h-5" /> Explore Career Support
                </button>
                <Link to={ROUTES.SUCCESS_STORIES} className="inline-flex items-center justify-center gap-2 bg-white text-navy font-bold py-3.5 px-7 rounded-btn border border-border hover:bg-slate-50 transition-colors">
                  View Success Stories <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right — Image + floating checklist */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
                  alt="Career mentoring session"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Checklist */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl border border-border shadow-xl p-5 w-52">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Career Readiness</p>
                {["Resume Ready", "Mock Interview", "Portfolio Ready"].map((item) => (
                  <div key={item} className="flex items-center gap-2 py-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-sm font-bold text-navy">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-border">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBlock value="92%" label="Career Support Success*" note="*Demo statistic" delay={0.1} />
            <StatBlock value="15,000+" label="Learners Supported*" note="*Demo statistic" delay={0.2} />
            <StatBlock value="2,500+" label="Hiring Connections*" note="*Demo statistic" delay={0.3} />
            <StatBlock value="₹12 LPA" label="Illustrative Highest Package*" note="*Demo statistic" delay={0.4} />
          </div>
          <p className="text-center text-[11px] text-slate-400 mt-4">*Demo frontend statistics. Replace with verified academy data before publishing.</p>
        </Container>
      </section>

      {/* ── Placement Process ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-slate-50">
        <Container>
          <SectionHeader tag="OUR PROCESS" title="From Training to Career Opportunities" subtitle="Career preparation begins well before course completion. Our structured process guides learners through every stage." align="center" className="mb-14" />

          {/* Desktop horizontal */}
          <div className="hidden lg:grid grid-cols-4 gap-x-6 gap-y-12 relative">
            {placementProcess.map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} variants={fadeUp} className="relative">
                {i !== 3 && i !== placementProcess.length - 1 && (
                  <div className="absolute top-4 left-8 right-[-24px] h-px bg-slate-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-full bg-white border-[3px] border-primary-500 flex items-center justify-center mb-4 shadow-sm">
                    <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                  </div>
                  <span className="text-[11px] font-black text-primary-500 block mb-1">{step.step}</span>
                  <h4 className="font-bold text-navy text-base mb-2">{step.title}</h4>
                  <p className="text-sm text-secondary leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden flex flex-col gap-6 pl-6 relative">
            <div className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-slate-200" />
            {placementProcess.map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} variants={fadeUp} className="relative">
                <div className="absolute top-1.5 -left-[29px] w-4 h-4 rounded-full bg-white border-[3px] border-primary-500 z-10" />
                <span className="text-[10px] font-black text-primary-500 block mb-0.5">{step.step}</span>
                <h4 className="font-bold text-navy text-[15px] mb-1">{step.title}</h4>
                <p className="text-sm text-secondary">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Recent Placements ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <SectionHeader tag="RECENT OUTCOMES" title="Recent Career Outcomes" subtitle="Sample alumni who completed training and pursued technology careers." align="left" className="mb-0 md:max-w-lg" />
          </div>

          {/* Filters */}
          <div className="bg-slate-50 rounded-2xl p-4 mb-8 flex flex-wrap gap-3 border border-border">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="search" placeholder="Search name, role or company..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition" />
            </div>
            <select value={filterCourse} onChange={e => setFilterCourse(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-white text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 cursor-pointer">
              <option value="">All Courses</option>
              {allCourses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filterYear} onChange={e => setFilterYear(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-white text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 cursor-pointer">
              <option value="">All Years</option>
              {allYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="font-bold text-xl text-navy mb-2">No Results Found</h3>
              <p className="text-secondary">Try different search terms or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p, i) => <PlacementCard key={p.id} p={p} delay={i * 0.06} />)}
            </div>
          )}
        </Container>
      </section>

      {/* ── Hiring Companies ─────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-y border-border">
        <Container>
          <SectionHeader tag="PARTNER COMPANIES" title="Technology Skills Used Across Leading Organizations" subtitle="Our programs focus on tools and technologies deployed across modern technology teams." align="center" className="mb-10" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {companies.map(co => (
              <div key={co.id} title={co.fullName}
                className="h-[90px] bg-white rounded-xl border border-border flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:border-primary-200 hover:shadow-sm transition-all duration-300 cursor-default">
                <span className="font-black text-sm md:text-base tracking-tight" style={{ color: co.color }}>{co.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Career Prep Services ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <SectionHeader tag="CAREER SERVICES" title="Structured Career Preparation" subtitle="Every career support element is built into the learning experience, not added as an afterthought." align="center" className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <PrepCard icon={FileText} title="Resume Optimization" color="bg-blue-50 text-blue-600" description="Structure your resume around skills, projects and relevant technology experience to stand out." />
            <PrepCard icon={MessageSquareMore} title="Mock Interviews" color="bg-violet-50 text-violet-600" description="Practice technical and HR interview scenarios with structured feedback and improvement guidance." />
            <PrepCard icon={BarChart2} title="Technical Assessments" color="bg-emerald-50 text-emerald-600" description="Evaluate your technical readiness through assessments aligned with common hiring patterns." />
            <PrepCard icon={Laptop} title="Portfolio & GitHub" color="bg-amber-50 text-amber-600" description="Strengthen your online presence with a curated portfolio and well-structured GitHub profile." />
          </div>
        </Container>
      </section>

      {/* ── Placement FAQ ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
              <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest block mb-4">PLACEMENT FAQ</span>
              <h2 className="font-heading font-bold text-3xl text-navy mb-4">Questions About Career Support?</h2>
              <p className="text-secondary mb-6">Find answers about how our career preparation process works.</p>
              <button onClick={() => openInquiry({ source: "placements-faq" })}
                className="inline-flex items-center gap-2 bg-navy text-white font-bold py-3.5 px-6 rounded-btn hover:bg-slate-800 transition-colors">
                Talk to an Advisor <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:col-span-8 space-y-3">
              {placementFaqs.map((faq, i) => (
                <details key={faq.id} className="group bg-white rounded-xl border border-border overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 font-bold text-navy cursor-pointer select-none list-none">
                    {faq.question}
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 ml-3 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-secondary leading-relaxed border-t border-border pt-3">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-navy">
        <Container className="text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">Speak with a career advisor to find the right program and batch for your goals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => openInquiry({ source: "placements-final-cta" })}
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-4 px-8 rounded-btn hover:bg-primary-500 transition-colors shadow-lg">
              <MessageSquareMore className="w-5 h-5" /> Talk to Career Advisor
            </button>
            <Link to={ROUTES.SUCCESS_STORIES}
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold py-4 px-8 rounded-btn hover:bg-white/20 transition-colors">
              Read Success Stories <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Placements;
