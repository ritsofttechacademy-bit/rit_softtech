import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trophy, Briefcase, ArrowRight, Quote, X, CheckCircle2 } from "lucide-react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { successStories } from "../data/successStories";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const StoryModal = ({ story, onClose }) => {
  if (!story) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row max-h-[90vh]"
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/50 hover:bg-white border border-border/10 hover:border-border rounded-full flex items-center justify-center text-navy transition-all z-20 backdrop-blur-md">
            <X className="w-5 h-5" />
          </button>
          
          {/* Left: Image & Intro */}
          <div className="w-full md:w-2/5 relative bg-slate-100 shrink-0">
            <img src={story.image} alt={story.name} className="w-full h-[240px] md:h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent flex flex-col justify-end p-8 text-white">
              <h2 className="font-heading font-extrabold text-3xl mb-1">{story.name}</h2>
              <p className="text-primary-300 font-bold mb-4">{story.course}</p>
              
              <div className="space-y-3 pt-4 border-t border-white/20">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-0.5">Previous Status</span>
                  <span className="text-sm font-semibold text-white">{story.previousStatus}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-0.5">Current Role</span>
                  <span className="text-sm font-semibold text-white">{story.role} at {story.company}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Story Content */}
          <div className="w-full md:w-3/5 p-8 md:p-10 overflow-y-auto bg-white">
            <Quote className="w-10 h-10 text-primary-200 mb-4" />
            <h3 className="font-heading font-bold text-2xl text-navy mb-8 leading-snug">
              "{story.quote}"
            </h3>
            
            <div className="prose prose-sm text-secondary leading-relaxed mb-8">
              <p>{story.story}</p>
            </div>
            
            <div className="bg-slate-50 border border-border rounded-xl p-5 mb-6">
              <h4 className="text-xs font-black text-navy uppercase tracking-widest mb-4">Key Takeaways</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-secondary font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> Hands-on project experience was crucial for interviews.
                </li>
                <li className="flex items-start gap-2 text-sm text-secondary font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> Career gap / non-IT background overcome through structured learning.
                </li>
                <li className="flex items-start gap-2 text-sm text-secondary font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> Mock interviews built necessary confidence.
                </li>
              </ul>
            </div>
            
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Trophy className="w-4 h-4" /> Alumni Success Story • {story.year}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const SuccessStoryCard = ({ story, onClick, delay = 0 }) => (
  <motion.div
    initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.4, delay }} variants={fadeUp}
    className="bg-white rounded-[24px] border border-border overflow-hidden group cursor-pointer hover:shadow-xl hover:border-primary-300 transition-all duration-500 flex flex-col h-full"
    onClick={onClick}
  >
    <div className="aspect-[4/5] sm:aspect-auto sm:h-[300px] relative bg-slate-100 overflow-hidden shrink-0">
      <img src={story.image} alt={story.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
        <h3 className="font-heading font-extrabold text-2xl mb-1">{story.name}</h3>
        <p className="text-primary-300 text-sm font-bold truncate">{story.course}</p>
      </div>
    </div>
    
    <div className="p-6 flex flex-col flex-grow relative bg-white">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 bg-slate-50 border border-border rounded-lg p-2.5">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Before</div>
          <div className="text-xs font-semibold text-navy truncate" title={story.previousStatus}>{story.previousStatus}</div>
        </div>
        <ArrowRight className="w-4 h-4 text-primary-400 shrink-0" />
        <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-lg p-2.5">
          <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5">After</div>
          <div className="text-xs font-semibold text-emerald-800 truncate" title={story.role}>{story.role}</div>
        </div>
      </div>
      
      <div className="mb-6 flex-grow">
        <Quote className="w-5 h-5 text-primary-200 mb-2" />
        <p className="text-sm font-semibold text-navy italic line-clamp-3">"{story.quote}"</p>
      </div>
      
      <div className="border-t border-border pt-4 mt-auto flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-navy group-hover:text-primary-600 transition-colors">
        <span className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-slate-400 group-hover:text-primary-400 transition-colors" /> {story.company}</span>
        <span className="flex items-center gap-1">Read Story <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" /></span>
      </div>
    </div>
  </motion.div>
);

const SuccessStories = () => {
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterPath, setFilterPath] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);

  const allCourses = [...new Set(successStories.map(s => s.course))].sort();
  const allPaths = [...new Set(successStories.map(s => s.careerPath))].sort();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return successStories.filter(s => {
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.company.toLowerCase().includes(q);
      const matchCourse = !filterCourse || s.course === filterCourse;
      const matchPath = !filterPath || s.careerPath === filterPath;
      return matchQ && matchCourse && matchPath;
    });
  }, [search, filterCourse, filterPath]);

  const featuredStory = successStories[0]; // Just picking the first one as featured for now

  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#071F55] to-[#0052B8] text-white pt-28 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary-300 font-bold text-xs uppercase tracking-widest mb-5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur">
                ALUMNI OUTCOMES
              </span>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[52px] leading-[1.1] mb-6">
                From Learning to<br />
                <span className="text-primary-300">Career Progress</span>
              </h1>
              <p className="text-white/80 text-lg leading-relaxed max-w-[500px]">
                Discover how learners strengthened their skills, completed practical projects and progressed toward technology careers.
              </p>
            </div>
            
            <div className="hidden lg:flex justify-end">
               <div className="relative w-full max-w-md">
                 <div className="absolute inset-0 bg-white/10 rounded-[32px] blur-xl transform translate-x-4 translate-y-4" />
                 <img src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800&auto=format&fit=crop" alt="Career Success" className="w-full h-auto rounded-[32px] shadow-2xl relative z-10 border-4 border-white/10" />
               </div>
            </div>
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
                placeholder="Search alumni or company..." 
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-slate-50 text-sm font-medium text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition" 
              />
            </div>
            
            <div className="flex gap-4">
              <select 
                value={filterPath} onChange={e => setFilterPath(e.target.value)}
                className="w-full md:w-[220px] h-[52px] px-4 rounded-xl border border-border bg-slate-50 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 cursor-pointer"
              >
                <option value="">All Career Paths</option>
                {allPaths.map(p => <option key={p} value={p}>{p}</option>)}
              </select>

              <select 
                value={filterCourse} onChange={e => setFilterCourse(e.target.value)}
                className="hidden lg:block w-full md:w-[260px] h-[52px] px-4 rounded-xl border border-border bg-slate-50 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 cursor-pointer"
              >
                <option value="">All Courses</option>
                {allCourses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-slate-50 min-h-[500px]">
        <Container>
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-border shadow-sm">
              <Trophy className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="font-bold text-2xl text-navy mb-2">No Stories Found</h3>
              <p className="text-secondary">Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              {/* Featured Story */}
              {!search && !filterCourse && !filterPath && featuredStory && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="mb-16 bg-white rounded-[32px] border border-border shadow-md overflow-hidden flex flex-col md:flex-row group cursor-pointer hover:shadow-xl hover:border-primary-300 transition-all duration-500"
                  onClick={() => setSelectedStory(featuredStory)}
                >
                  <div className="w-full md:w-2/5 relative overflow-hidden bg-slate-100">
                    <img src={featuredStory.image} alt={featuredStory.name} className="w-full h-[300px] md:h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-6 left-6 bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      FEATURED STORY
                    </div>
                  </div>
                  <div className="w-full md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                    <Quote className="absolute top-10 right-10 w-16 h-16 text-slate-50 -z-0" />
                    
                    <div className="flex items-center gap-4 mb-8 relative z-10">
                      <div className="bg-slate-50 border border-border rounded-xl px-4 py-2.5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">FROM</div>
                        <div className="text-sm font-semibold text-navy">{featuredStory.previousStatus}</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary-400" />
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5">
                        <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">TO</div>
                        <div className="text-sm font-semibold text-emerald-800">{featuredStory.role} at {featuredStory.company}</div>
                      </div>
                    </div>
                    
                    <h3 className="font-heading font-extrabold text-2xl md:text-3xl lg:text-4xl text-navy mb-4 relative z-10 leading-snug">
                      "{featuredStory.quote}"
                    </h3>
                    
                    <p className="text-secondary text-lg leading-relaxed mb-8 line-clamp-3 relative z-10">
                      {featuredStory.story}
                    </p>
                    
                    <div className="flex items-center gap-4 relative z-10 mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-sm shrink-0">
                         <img src={featuredStory.image} alt={featuredStory.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-navy">{featuredStory.name}</div>
                        <div className="text-sm font-semibold text-primary-600">{featuredStory.course}</div>
                      </div>
                      <button className="hidden sm:inline-flex items-center gap-2 bg-navy text-white font-bold py-3 px-6 rounded-xl group-hover:bg-primary-600 transition-colors shrink-0">
                        Read Full Story <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((story, i) => (
                   // Skip rendering the featured story again in the grid if it's the default view
                   (!search && !filterCourse && !filterPath && story.id === featuredStory?.id) ? null :
                  <SuccessStoryCard key={story.id} story={story} onClick={() => setSelectedStory(story)} delay={i * 0.1} />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      {selectedStory && <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />}
    </main>
  );
};

export default SuccessStories;
