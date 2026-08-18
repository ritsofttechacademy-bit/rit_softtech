import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Users, GraduationCap, Award, BookOpen, 
  ChevronRight, MapPin, Building2, CheckCircle2,
  X, Briefcase
} from "lucide-react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { trainers } from "../data/trainers";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const LinkedinMark = ({ className = "" }) => (
  <span aria-hidden="true" className={`inline-flex items-center justify-center rounded-sm font-heading font-black leading-none ${className}`}>
    in
  </span>
);

// Mock images based on trainer ID for realistic appearance
const trainerImages = {
  1: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&auto=format&fit=crop",
  2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
  3: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  4: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  5: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  6: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop",
  7: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  8: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
};

const StatBlock = ({ value, label, icon: Icon, delay = 0 }) => (
  <motion.div
    initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5, delay }} variants={fadeUp}
    className="bg-white rounded-2xl border border-border p-6 shadow-sm flex items-center gap-5"
  >
    <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
      <Icon className="w-7 h-7 text-primary-600" />
    </div>
    <div>
      <div className="text-3xl font-black text-navy leading-none mb-1">{value}</div>
      <div className="text-sm font-semibold text-secondary">{label}</div>
    </div>
  </motion.div>
);

const TrainerModal = ({ trainer, onClose }) => {
  if (!trainer) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row max-h-[90vh]"
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white border border-border/10 hover:border-border rounded-full flex items-center justify-center text-navy transition-all z-20 backdrop-blur-md">
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-full md:w-2/5 aspect-[4/5] md:aspect-auto relative bg-slate-100 shrink-0">
            {trainerImages[trainer.id] ? (
              <img src={trainerImages[trainer.id]} alt={trainer.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-black text-white" style={{ backgroundColor: trainer.imageColor }}>
                {trainer.initials}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent flex flex-col justify-end p-8 text-white">
              <h2 className="font-heading font-extrabold text-3xl mb-1">{trainer.name}</h2>
              <p className="text-primary-300 font-bold mb-4">{trainer.designation}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 backdrop-blur px-2.5 py-1 rounded">
                  <Briefcase className="w-3.5 h-3.5" /> {trainer.experience}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 backdrop-blur px-2.5 py-1 rounded">
                  <GraduationCap className="w-3.5 h-3.5" /> {trainer.students}+ Students
                </span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-3/5 p-8 md:p-10 overflow-y-auto bg-slate-50">
            <div className="mb-8">
              <h3 className="text-sm font-black text-primary-500 uppercase tracking-widest mb-3">About</h3>
              <p className="text-secondary leading-relaxed">{trainer.bio}</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-sm font-black text-primary-500 uppercase tracking-widest mb-4">Core Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {trainer.technologies.map((tech, i) => (
                  <span key={i} className="inline-flex bg-white border border-border px-3 py-1.5 rounded-lg text-sm font-semibold text-navy">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-black text-primary-500 uppercase tracking-widest mb-4">Previous Experience</h3>
                <ul className="space-y-3">
                  {trainer.previousCompanies.map((co, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-navy">
                      <div className="w-8 h-8 rounded bg-white border border-border flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4 text-slate-400" />
                      </div>
                      {co}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-black text-primary-500 uppercase tracking-widest mb-4">Certifications</h3>
                <ul className="space-y-3">
                  {trainer.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-medium text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {ach}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <a href={trainer.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#0077b5] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#006396] transition-colors">
                <LinkedinMark className="w-5 h-5 text-sm" /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const Trainers = () => {
  const [search, setSearch] = useState("");
  const [filterTech, setFilterTech] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const allTechnologies = [...new Set(trainers.flatMap(t => t.technologies))].sort();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return trainers.filter(t => {
      const matchQ = !q || t.name.toLowerCase().includes(q) || t.designation.toLowerCase().includes(q);
      const matchTech = !filterTech || t.technologies.includes(filterTech);
      return matchQ && matchTech;
    });
  }, [search, filterTech]);

  const featuredTrainer = trainers.find(t => t.id === 2); // Priya Reddy

  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-navy border-b border-slate-800 pt-28 pb-16 md:pb-24 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <Container className="relative z-10 text-center max-w-4xl">
          <span className="inline-block text-primary-400 font-bold text-xs uppercase tracking-widest mb-5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur">
            EXPERT INSTRUCTORS
          </span>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-[1.1] mb-6">
            Learn From Professionals Who<br />
            <span className="text-primary-400">Work With Technology</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-0 max-w-2xl mx-auto">
            Meet experienced instructors across software development, AI, cloud, DevOps, cybersecurity, testing and analytics.
          </p>
        </Container>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="py-8 bg-slate-50 border-b border-border">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatBlock value="50+" label="Expert Trainers" icon={Users} delay={0.1} />
            <StatBlock value="12+" label="Technology Domains" icon={BookOpen} delay={0.2} />
            <StatBlock value="10+" label="Average Years Exp." icon={Award} delay={0.3} />
            <StatBlock value="100+" label="Programs Supported" icon={GraduationCap} delay={0.4} />
          </div>
        </Container>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────── */}
      <section className="py-8 bg-white border-b border-border sticky top-[72px] z-30 shadow-sm">
        <Container>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="search" 
                placeholder="Search trainer by name or role..." 
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-slate-50 text-sm font-medium text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition" 
              />
            </div>
            <select 
              value={filterTech} onChange={e => setFilterTech(e.target.value)}
              className="w-full md:w-[280px] h-[52px] px-4 rounded-xl border border-border bg-slate-50 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 cursor-pointer"
            >
              <option value="">All Technologies</option>
              {allTechnologies.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </Container>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 min-h-[500px]">
        <Container>
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-border shadow-sm">
              <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="font-bold text-2xl text-navy mb-2">No Trainers Found</h3>
              <p className="text-secondary">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <>
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                {filtered.slice(0, 4).map((trainer, i) => (
                  <TrainerCard key={trainer.id} trainer={trainer} onClick={() => setSelectedTrainer(trainer)} delay={i * 0.1} />
                ))}
              </div>

              {/* Featured Block */}
              {!search && !filterTech && featuredTrainer && (
                <div className="mb-16 bg-white rounded-3xl border border-border shadow-md overflow-hidden flex flex-col md:flex-row">
                  <div className="w-full md:w-2/5 aspect-square md:aspect-auto bg-slate-100 relative">
                    <img src={trainerImages[featuredTrainer.id]} alt={featuredTrainer.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      MEET THE MENTOR
                    </div>
                  </div>
                  <div className="w-full md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50">
                    <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-navy mb-2">{featuredTrainer.name}</h2>
                    <p className="text-primary-600 font-bold text-lg mb-6">{featuredTrainer.designation}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white border border-border px-3 py-1.5 rounded-lg shadow-sm">
                        <Briefcase className="w-4 h-4 text-slate-400" /> {featuredTrainer.experience}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white border border-border px-3 py-1.5 rounded-lg shadow-sm">
                        <GraduationCap className="w-4 h-4 text-slate-400" /> {featuredTrainer.students}+ Students
                      </span>
                    </div>

                    <p className="text-secondary text-lg leading-relaxed mb-8">{featuredTrainer.bio}</p>
                    
                    <div className="mb-8">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Core Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {featuredTrainer.specializations.map((spec, i) => (
                          <span key={i} className="inline-flex bg-primary-50 text-primary-700 border border-primary-100 px-3 py-1.5 rounded-md text-sm font-semibold">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <button onClick={() => setSelectedTrainer(featuredTrainer)} className="inline-flex items-center gap-2 bg-navy text-white font-bold py-3.5 px-7 rounded-btn hover:bg-slate-800 transition-colors shadow-lg">
                        View Full Profile <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Row 2+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.slice(4).map((trainer, i) => (
                  <TrainerCard key={trainer.id} trainer={trainer} onClick={() => setSelectedTrainer(trainer)} delay={i * 0.1} />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      {selectedTrainer && <TrainerModal trainer={selectedTrainer} onClose={() => setSelectedTrainer(null)} />}
    </main>
  );
};

const TrainerCard = ({ trainer, onClick, delay = 0 }) => (
  <motion.div
    initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.4, delay }} variants={fadeUp}
    className="bg-white rounded-[24px] border border-border overflow-hidden group cursor-pointer hover:shadow-xl hover:border-primary-300 transition-all duration-500 flex flex-col"
    onClick={onClick}
  >
    <div className="aspect-[4/5] relative bg-slate-100 overflow-hidden shrink-0">
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur text-navy text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
        {trainer.experience}
      </div>
      {trainerImages[trainer.id] ? (
        <img src={trainerImages[trainer.id]} alt={trainer.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-4xl font-black text-white group-hover:scale-105 transition-transform duration-700" style={{ backgroundColor: trainer.imageColor }}>
          {trainer.initials}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    
    <div className="p-6 flex flex-col flex-grow relative">
      <h3 className="font-bold text-navy text-xl leading-tight mb-1">{trainer.name}</h3>
      <p className="text-sm font-semibold text-primary-600 mb-4">{trainer.designation}</p>
      
      <div className="flex-grow">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {trainer.technologies.slice(0, 4).map((tech, i) => (
            <span key={i} className="inline-flex bg-slate-50 border border-border px-2 py-1 rounded text-[11px] font-bold text-secondary">
              {tech}
            </span>
          ))}
          {trainer.technologies.length > 4 && (
            <span className="inline-flex bg-primary-50 text-primary-700 px-2 py-1 rounded text-[11px] font-bold">
              +{trainer.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
      
      <div className="border-t border-border pt-4 mt-auto flex items-center justify-between text-sm font-bold text-navy group-hover:text-primary-600 transition-colors">
        View Profile <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.div>
);

export default Trainers;
