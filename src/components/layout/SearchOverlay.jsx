import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ChevronRight, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "../../context/SearchContext";
import { courses } from "../../data/courses";
import { courseUrl, ROUTES } from "../../constants/routes";

const SearchOverlay = () => {
  const { isOpen, closeSearch, query, setQuery } = useSearch();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleResultClick = (slug) => {
    navigate(courseUrl(slug));
    closeSearch();
  };

  // Simple search logic
  const results = query.trim().length > 1
    ? courses.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) || 
        course.category.toLowerCase().includes(query.toLowerCase()) ||
        (course.skills || []).some(tech => tech.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5) // max 5 results
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex justify-center pt-20 px-4 bg-navy/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSearch();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-modal overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input */}
            <div className="relative flex items-center border-b border-border p-4 md:p-6">
              <Search className="w-6 h-6 text-muted absolute left-6 md:left-8" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for courses, skills, or technologies..."
                className="w-full pl-12 pr-12 py-3 text-lg md:text-xl text-navy bg-transparent outline-none placeholder:text-muted/70 font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={closeSearch}
                className="absolute right-4 md:right-6 p-2 text-muted hover:text-navy hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Area */}
            <div className="overflow-y-auto p-4 md:p-6 bg-slate-50 flex-grow">
              {query.trim().length <= 1 ? (
                <div className="text-center py-10">
                  <p className="text-muted text-sm font-medium">Type at least 2 characters to search</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <span className="text-xs text-secondary font-semibold uppercase tracking-wider w-full mb-2">Popular Searches</span>
                    {["Python", "Data Science", "AWS", "Java", "DevOps"].map(term => (
                      <button 
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 bg-white border border-border rounded-pill text-sm hover:border-primary-300 hover:text-primary-600 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-3 px-2">Course Results</h4>
                  {results.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => handleResultClick(course.slug)}
                      className="w-full flex items-center gap-4 p-3 bg-white rounded-xl border border-border hover:border-primary-300 hover:shadow-sm transition-all text-left group"
                    >
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${course.color}15`, color: course.color }}>
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-navy truncate group-hover:text-primary-600 transition-colors">{course.title}</h5>
                        <p className="text-xs text-secondary truncate mt-0.5">{course.category} • {course.level}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-border group-hover:text-primary-500 transition-colors mr-2" />
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => { navigate(ROUTES.COURSES); closeSearch(); }}
                    className="w-full mt-4 p-3 text-center text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                  >
                    View all courses
                  </button>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-5 h-5 text-muted" />
                  </div>
                  <h4 className="font-bold text-navy mb-1">No results found for "{query}"</h4>
                  <p className="text-sm text-secondary">Try checking for typos or searching for a broader term.</p>
                </div>
              )}
            </div>
            
            {/* Keyboard shortcuts footer */}
            <div className="hidden md:flex items-center justify-between px-6 py-3 border-t border-border bg-white text-xs text-muted font-medium">
              <span>Navigate with <kbd className="bg-slate-100 border border-slate-200 px-1.5 rounded text-navy mx-1">↑</kbd><kbd className="bg-slate-100 border border-slate-200 px-1.5 rounded text-navy">↓</kbd></span>
              <span><kbd className="bg-slate-100 border border-slate-200 px-1.5 rounded text-navy mr-1">Esc</kbd> to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
