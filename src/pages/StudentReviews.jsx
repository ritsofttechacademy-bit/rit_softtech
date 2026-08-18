import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Star, MessageSquareQuote, ChevronDown, CheckCircle2 } from "lucide-react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { testimonials } from "../data/testimonials";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star key={star} className={`w-4 h-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-200"}`} />
    ))}
  </div>
);

const ReviewCard = ({ review, delay = 0 }) => (
  <motion.div
    initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.4, delay }} variants={fadeUp}
    className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300 flex flex-col h-full"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm" style={{ backgroundColor: review.imageColor }}>
        {review.initials}
      </div>
      <div>
        <h3 className="font-bold text-navy leading-tight">{review.name}</h3>
        <StarRating rating={review.rating} />
      </div>
    </div>
    
    <div className="bg-slate-50 border border-border rounded-xl px-4 py-2.5 mb-5 inline-block self-start">
      <div className="text-[11px] font-black text-primary-500 uppercase tracking-widest mb-0.5">Program</div>
      <div className="text-sm font-semibold text-navy">{review.course}</div>
    </div>
    
    <div className="relative flex-grow">
      <MessageSquareQuote className="absolute -top-1 -left-2 w-8 h-8 text-primary-100 -z-10" />
      <p className="text-secondary text-sm leading-relaxed relative z-10">{review.review}</p>
    </div>
    
    <div className="flex items-center justify-between mt-5 pt-4 border-t border-border text-[11px] font-semibold text-slate-400">
      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified Learner</span>
      <span>{review.batch} Batch</span>
    </div>
  </motion.div>
);

const FeaturedReview = ({ review }) => (
  <motion.div
    initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} variants={fadeUp}
    className="bg-navy rounded-[32px] p-8 md:p-14 text-white relative overflow-hidden my-12 col-span-1 sm:col-span-2 lg:col-span-3"
  >
    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
    <MessageSquareQuote className="w-16 h-16 text-primary-500/30 mb-6" />
    <blockquote className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl leading-tight mb-8 relative z-10 max-w-4xl">
      "{review.review}"
    </blockquote>
    <div className="flex items-center gap-5 relative z-10">
      <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl bg-white text-navy shrink-0 shadow-xl border-4 border-white/10">
        {review.initials}
      </div>
      <div>
        <div className="font-bold text-lg">{review.name}</div>
        <div className="text-primary-300 text-sm font-semibold">{review.role} at {review.company}</div>
      </div>
    </div>
  </motion.div>
);

const StudentReviews = () => {
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterRating, setFilterRating] = useState("");

  const allCourses = [...new Set(testimonials.map(t => t.course))].sort();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return testimonials.filter(t => {
      const matchQ = !q || t.name.toLowerCase().includes(q) || t.review.toLowerCase().includes(q);
      const matchCourse = !filterCourse || t.course === filterCourse;
      const matchRating = !filterRating || t.rating === parseInt(filterRating);
      return matchQ && matchCourse && matchRating;
    });
  }, [search, filterCourse, filterRating]);

  // Insert a featured block every 7 items
  const renderGrid = () => {
    const items = [];
    let delayCounter = 0;
    
    for (let i = 0; i < filtered.length; i++) {
      if (i > 0 && i % 7 === 0 && filtered[i-1].featured) {
        items.push(<FeaturedReview key={`featured-${i}`} review={filtered[i-1]} />);
        delayCounter = 0;
      }
      items.push(
        <div key={filtered[i].id} className="h-full">
          <ReviewCard review={filtered[i]} delay={(delayCounter % 3) * 0.1} />
        </div>
      );
      delayCounter++;
    }
    
    // Add one featured at the very end if there are enough items and the last wasn't featured
    if (filtered.length >= 4 && items[items.length-1].type !== FeaturedReview && filtered[0].featured) {
        items.push(<FeaturedReview key="featured-end" review={filtered[0]} />);
    }

    return items;
  };

  return (
    <main>

      {/* ── Hero & Summary ───────────────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-border pt-28 pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary-600 font-bold text-xs uppercase tracking-widest mb-5 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-100">
                STUDENT FEEDBACK
              </span>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[52px] leading-[1.1] text-navy mb-6">
                What Learners Say<br />
                <span className="text-primary-600">About RIT</span>
              </h1>
              <p className="text-secondary text-lg leading-relaxed max-w-[500px]">
                Explore feedback about our training quality, hands-on projects, instructors, learning experience and career preparation process.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-border shadow-lg max-w-md ml-auto w-full">
              <h3 className="font-bold text-navy text-lg mb-6">Learner Satisfaction</h3>
              <div className="flex items-center gap-6 mb-8">
                <div className="text-5xl font-black text-navy">4.8</div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <div className="text-xs font-semibold text-slate-400">Based on demo learner feedback</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { stars: 5, pct: 85 },
                  { stars: 4, pct: 12 },
                  { stars: 3, pct: 2 },
                  { stars: 2, pct: 1 },
                  { stars: 1, pct: 0 },
                ].map(row => (
                  <div key={row.stars} className="flex items-center gap-3 text-sm font-semibold text-slate-500">
                    <span className="w-4">{row.stars}</span>
                    <Star className="w-3.5 h-3.5 fill-slate-300 text-slate-300 shrink-0" />
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="w-8 text-right text-xs">{row.pct}%</span>
                  </div>
                ))}
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
                placeholder="Search reviews by name or keyword..." 
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-slate-50 text-sm font-medium text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition" 
              />
            </div>
            
            <div className="flex gap-4">
              <select 
                value={filterCourse} onChange={e => setFilterCourse(e.target.value)}
                className="w-full md:w-[240px] h-[52px] px-4 rounded-xl border border-border bg-slate-50 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 cursor-pointer"
              >
                <option value="">All Courses</option>
                {allCourses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <select 
                value={filterRating} onChange={e => setFilterRating(e.target.value)}
                className="w-full md:w-[160px] h-[52px] px-4 rounded-xl border border-border bg-slate-50 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 cursor-pointer"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
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
              <MessageSquareQuote className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="font-bold text-2xl text-navy mb-2">No Reviews Found</h3>
              <p className="text-secondary">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max items-start">
              {renderGrid()}
            </div>
          )}
        </Container>
      </section>
      
    </main>
  );
};

export default StudentReviews;
