import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../../data/categories";
import { courses } from "../../data/courses";
import { courseUrl, ROUTES } from "../../constants/routes";

const MobileCoursesAccordion = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (id) => {
    setActiveCategory(prev => prev === id ? null : id);
  };

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left font-heading font-bold text-lg text-navy"
        aria-expanded={isOpen}
      >
        Courses
        <ChevronDown className={`w-5 h-5 text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-1">
              {categories.map((cat) => {
                const isCatOpen = activeCategory === cat.id;
                // Only take first 3 courses for mobile preview to avoid extreme length
                const catCourses = courses.filter(c => c.category === cat.name).slice(0, 3);
                
                return (
                  <div key={cat.id} className="bg-slate-50 rounded-xl overflow-hidden mb-2 border border-slate-100">
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-navy"
                    >
                      <span className="flex items-center gap-2">
                        {cat.icon && <span className="text-primary-600 w-4 h-4">{cat.icon}</span>}
                        {cat.name}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 ${isCatOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isCatOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="px-4 pb-4 space-y-3 pl-10 border-t border-slate-200 pt-3">
                            {catCourses.map(course => (
                              <li key={course.id}>
                                <Link
                                  to={courseUrl(course.slug)}
                                  onClick={onClose}
                                  className="block text-[13px] text-secondary hover:text-primary-600 font-medium"
                                >
                                  {course.title}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                to={`${ROUTES.COURSES}?category=${encodeURIComponent(cat.name)}`}
                                onClick={onClose}
                                className="inline-flex items-center gap-1 text-[13px] text-primary-600 font-bold hover:text-primary-700"
                              >
                                View All <ArrowRight className="w-3 h-3" />
                              </Link>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              
              <Link
                to={ROUTES.COURSES}
                onClick={onClose}
                className="w-full mt-2 block text-center bg-primary-50 text-primary-600 font-bold py-3 rounded-xl text-sm"
              >
                Browse All 24 Courses
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileCoursesAccordion;
