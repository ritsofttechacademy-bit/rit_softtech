import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, CalendarDays, Clock, ArrowRight, BookOpen, Send, CheckCircle2 } from "lucide-react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { blogs } from "../data/blogs";
import { blogUrl } from "../constants/routes";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const BlogCard = ({ blog, delay = 0 }) => (
  <motion.div
    initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.4, delay }} variants={fadeUp}
    className="bg-white rounded-[24px] border border-border overflow-hidden group hover:shadow-xl hover:border-primary-300 transition-all duration-300 flex flex-col h-full"
  >
    <Link to={blogUrl(blog.slug)} className="block aspect-[16/9] overflow-hidden bg-slate-100 shrink-0">
      <img src={blog.image} alt={blog.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    </Link>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block bg-primary-50 text-primary-700 border border-primary-100 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
          {blog.category}
        </span>
      </div>
      <Link to={blogUrl(blog.slug)} className="group-hover:text-primary-600 transition-colors">
        <h3 className="font-bold text-navy text-xl leading-snug mb-3 line-clamp-2">{blog.title}</h3>
      </Link>
      <p className="text-secondary text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">{blog.excerpt}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {blog.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
        </div>
        <Link to={blogUrl(blog.slug)} className="text-primary-600 hover:text-primary-700 font-bold p-1 rounded-full hover:bg-primary-50 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  </motion.div>
);

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setStatus("loading");
      setTimeout(() => setStatus("success"), 800);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-[24px] p-8 text-center h-full flex flex-col justify-center items-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
        <h4 className="font-bold text-navy text-xl mb-2">You're Subscribed!</h4>
        <p className="text-emerald-700 text-sm">Thank you for subscribing to RIT Insights.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-border rounded-[24px] p-8 h-full flex flex-col justify-center">
      <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6">
        <Send className="w-6 h-6" />
      </div>
      <h4 className="font-bold text-navy text-2xl mb-3">Stay Ahead in Tech</h4>
      <p className="text-secondary text-sm mb-6 leading-relaxed">
        Get practical technology and career insights delivered to your inbox every week.
      </p>
      <form onSubmit={handleSubmit} className="relative">
        <input 
          type="email" required placeholder="Email Address" 
          value={email} onChange={e => setEmail(e.target.value)}
          className="w-full h-12 pl-4 pr-12 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-200" 
        />
        <button type="submit" disabled={status === "loading"} className="absolute right-1 top-1 bottom-1 aspect-square bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-70">
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

const Blog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const categories = ["All", ...new Set(blogs.map(b => b.category))].sort();
  
  // Featured article (first one that has featured: true, or just first article)
  const featuredArticle = blogs.find(b => b.featured) || blogs[0];
  
  // Filter out featured article from main list to avoid duplication if we are showing 'All'
  const baseArticles = activeCategory === "All" && !search ? blogs.filter(b => b.id !== featuredArticle.id) : blogs;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return baseArticles.filter(b => {
      const matchQ = !q || b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q);
      const matchCat = activeCategory === "All" || b.category === activeCategory;
      return matchQ && matchCat;
    });
  }, [search, activeCategory, baseArticles]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <main>
      
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-navy border-b border-slate-800 pt-28 pb-24 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <Container className="relative z-10 text-center max-w-3xl">
          <span className="inline-block text-primary-400 font-bold text-xs uppercase tracking-widest mb-5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur">
            RIT INSIGHTS
          </span>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[52px] leading-[1.1] mb-6">
            Technology, Learning &<br />
            <span className="text-primary-400">Career Insights</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-10">
            Explore practical guides, technology trends, career roadmaps and interview preparation resources.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="search" 
              placeholder="Search articles, guides, tutorials..." 
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-400 transition" 
            />
          </div>
        </Container>
      </section>

      {/* ── Categories Navigation ────────────────────────────────────── */}
      <section className="bg-white border-b border-border sticky top-[72px] z-30 shadow-sm overflow-hidden">
        <Container>
          <div className="flex overflow-x-auto hide-scrollbar py-4 gap-2 items-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-colors border ${
                  activeCategory === cat 
                    ? "bg-primary-600 text-white border-primary-600" 
                    : "bg-slate-50 text-slate-600 border-border hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Featured Section (Only when All & no search) ─────────────── */}
      {!search && activeCategory === "All" && page === 1 && (
        <section className="py-12 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Featured */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-2 group">
                <Link to={blogUrl(featuredArticle.slug)} className="block relative rounded-3xl overflow-hidden aspect-[16/9] lg:aspect-[2/1] shadow-md border border-border">
                  <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
                    <span className="inline-block bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm mb-4">
                      {featuredArticle.category}
                    </span>
                    <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight group-hover:text-primary-300 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-white/80 line-clamp-2 md:line-clamp-3 mb-6 max-w-2xl">{featuredArticle.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
                      <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {featuredArticle.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {featuredArticle.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
              
              {/* Secondary block / Newsletter */}
              <div className="lg:col-span-1">
                <NewsletterSignup />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── Article Grid ─────────────────────────────────────────────── */}
      <section className="py-12 bg-slate-50 min-h-[500px]">
        <Container>
          {search || activeCategory !== "All" ? (
            <SectionHeader tag="RESULTS" title={`${filtered.length} Articles`} align="left" className="mb-10" />
          ) : (
            <SectionHeader tag="LATEST" title="Latest Articles" align="left" className="mb-10" />
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-border shadow-sm">
              <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="font-bold text-2xl text-navy mb-2">No Articles Found</h3>
              <p className="text-secondary">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((blog, i) => (
                  <BlogCard key={blog.id} blog={blog} delay={i * 0.1} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-14">
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="h-10 px-4 rounded-lg font-bold text-sm bg-white border border-border text-navy hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-bold text-sm transition-colors border ${
                        page === i + 1 ? "bg-primary-600 text-white border-primary-600" : "bg-white text-navy border-border hover:bg-slate-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="h-10 px-4 rounded-lg font-bold text-sm bg-white border border-border text-navy hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>

    </main>
  );
};

export default Blog;
