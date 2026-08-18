import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, MessageSquareMore, Mail, BookOpen, UserPlus, MonitorPlay, CalendarDays, Award, Briefcase, CreditCard, Info, HelpCircle } from "lucide-react";
import Container from "../components/common/Container";
import { faqs } from "../data/faqs";
import { useInquiry } from "../context/InquiryContext";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const CAT_ICONS = {
  "Courses & Curriculum": BookOpen,
  "Admissions": UserPlus,
  "Training Modes": MonitorPlay,
  "Batches": CalendarDays,
  "Projects & Certification": Award,
  "Career Support": Briefcase,
  "Payments": CreditCard,
  "General": Info
};

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="bg-white rounded-xl border border-border overflow-hidden mb-3 transition-colors hover:border-primary-200">
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-navy hover:text-primary-600 transition-colors focus:outline-none"
      aria-expanded={isOpen}
    >
      <span className="pr-4 leading-snug">{faq.question}</span>
      <div className={`w-8 h-8 rounded-full border ${isOpen ? 'bg-primary-50 border-primary-100 text-primary-600' : 'bg-slate-50 border-border text-slate-400'} flex items-center justify-center shrink-0 transition-colors`}>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 pb-6 pt-2 text-sm text-secondary leading-relaxed border-t border-slate-50 mt-1">
            {faq.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const { openInquiry } = useInquiry();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIds, setOpenIds] = useState(new Set());

  // Aggregate categories from faqs data
  const categories = ["All", ...new Set(faqs.map(f => f.category))].sort();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return faqs.filter(f => {
      const matchQ = !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
      const matchCat = activeCategory === "All" || f.category === activeCategory;
      return matchQ && matchCat;
    });
  }, [search, activeCategory]);

  const toggleOpen = (id) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      setActiveCategory("All"); // Reset category if searching
    }
  };

  return (
    <main>
      
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#071F55] to-[#0052B8] text-white pt-28 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <Container className="relative z-10 text-center max-w-3xl">
          <span className="inline-block text-primary-300 font-bold text-xs uppercase tracking-widest mb-5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur">
            HELP CENTER
          </span>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-[1.1] mb-6">
            How Can We Help?
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Find answers about training programs, batches, learning modes, projects, certification, payments and career support.
          </p>
          
          <div className="relative max-w-xl mx-auto shadow-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="search" 
              placeholder="Search for questions..." 
              value={search} onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-white bg-white text-navy placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/30 transition text-base font-medium shadow-inner" 
            />
          </div>
        </Container>
      </section>

      {/* ── Categories (Desktop/Tablet) ──────────────────────────────── */}
      {!search && (
        <section className="py-12 bg-slate-50 border-b border-border">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.filter(c => c !== "All").map(cat => {
                const Icon = CAT_ICONS[cat] || HelpCircle;
                const count = faqs.filter(f => f.category === cat).length;
                return (
                  <button 
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      document.getElementById("faq-content").scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`p-6 rounded-2xl border text-left transition-all ${
                      activeCategory === cat 
                        ? "bg-white border-primary-400 shadow-md ring-1 ring-primary-400" 
                        : "bg-white border-border hover:border-primary-300 hover:shadow-sm"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-4 ${activeCategory === cat ? 'text-primary-600' : 'text-slate-400'}`} />
                    <h3 className="font-bold text-navy text-lg mb-1">{cat}</h3>
                    <div className="text-xs font-semibold text-secondary">{count} questions</div>
                  </button>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ── Content Area ─────────────────────────────────────────────── */}
      <section id="faq-content" className="py-16 md:py-24 bg-white min-h-[500px]">
        <Container>
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Sidebar (Desktop) */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-1">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-4">Categories</div>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                      activeCategory === cat ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:bg-slate-50 hover:text-navy"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              {search ? (
                <div className="mb-8 border-b border-border pb-4">
                  <h2 className="text-2xl font-bold text-navy">
                    {filtered.length} {filtered.length === 1 ? 'result' : 'results'} for "{search}"
                  </h2>
                </div>
              ) : (
                <div className="mb-8 border-b border-border pb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-heading font-bold text-navy">{activeCategory === "All" ? "All Questions" : activeCategory}</h2>
                  {activeCategory !== "All" && (
                    <button onClick={() => setActiveCategory("All")} className="text-sm font-bold text-primary-600 hover:text-primary-700">View All</button>
                  )}
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border border-border">
                  <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-bold text-xl text-navy mb-2">We couldn't find an answer.</h3>
                  <p className="text-secondary mb-6">Try searching with different keywords or contact support.</p>
                  <button onClick={() => openInquiry({ source: "faq-no-results" })} className="inline-flex items-center gap-2 bg-primary-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-700 transition-colors">
                    Talk to an Advisor
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((faq) => (
                    <FAQItem 
                      key={faq.id} 
                      faq={faq} 
                      isOpen={openIds.has(faq.id)} 
                      onToggle={() => toggleOpen(faq.id)} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-border">
        <Container>
          <div className="bg-navy rounded-[32px] overflow-hidden p-8 md:p-14 text-center relative max-w-5xl mx-auto">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur border border-white/20">
               <MessageSquareMore className="w-8 h-8 text-primary-400" />
            </div>
            
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4 relative z-10">Still Need Help?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto relative z-10">
              Our career advisors can help you with course selection, training modes, batch availability, and placement queries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button onClick={() => openInquiry({ source: "faq-bottom-cta" })}
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-4 px-8 rounded-btn hover:bg-primary-500 transition-colors shadow-lg">
                Talk to an Advisor
              </button>
              <a href="mailto:support@ritsofttechacademy.com"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold py-4 px-8 rounded-btn hover:bg-white/20 transition-colors">
                <Mail className="w-5 h-5" /> Email Support
              </a>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
};

export default FAQ;
