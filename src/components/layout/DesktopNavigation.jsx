import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ROUTES } from "../../constants/routes";
import CoursesMegaMenu from "./CoursesMegaMenu";
import { AnimatePresence, motion } from "framer-motion";

const DesktopNavigation = () => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const coursesTimer = useRef(null);
  const resourcesTimer = useRef(null);

  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsCoursesOpen(false);
    setIsResourcesOpen(false);
  }, [location.pathname]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsCoursesOpen(false);
        setIsResourcesOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = (menu) => {
    if (menu === "courses") {
      clearTimeout(coursesTimer.current);
      // Small intentional delay to prevent accidental flicker
      coursesTimer.current = setTimeout(() => setIsCoursesOpen(true), 100);
      setIsResourcesOpen(false);
    } else {
      clearTimeout(resourcesTimer.current);
      resourcesTimer.current = setTimeout(() => setIsResourcesOpen(true), 100);
      setIsCoursesOpen(false);
    }
  };

  const handleMouseLeave = (menu) => {
    if (menu === "courses") {
      clearTimeout(coursesTimer.current);
      coursesTimer.current = setTimeout(() => setIsCoursesOpen(false), 150);
    } else {
      clearTimeout(resourcesTimer.current);
      resourcesTimer.current = setTimeout(() => setIsResourcesOpen(false), 150);
    }
  };

  const navItemClass = ({ isActive }) =>
    `relative flex items-center gap-1 text-[13px] xl:text-sm font-bold transition-colors py-6 ${isActive ? "text-primary-600" : "text-navy hover:text-primary-600"
    }`;

  const resources = [
    // { name: "Tech Blog", path: ROUTES.BLOG },
    { name: "Student Reviews", path: ROUTES.STUDENT_REVIEWS },
    { name: "Success Stories", path: ROUTES.SUCCESS_STORIES },
    { name: "Our Trainers", path: ROUTES.TRAINERS },
    { name: "FAQ", path: ROUTES.FAQ },
  ];

  return (
    <nav className="hidden lg:flex h-full ml-8 xl:ml-12" style={{ gap: "28px" }} aria-label="Main Navigation">
      <NavLink to={ROUTES.HOME} className={navItemClass}>
        Home
      </NavLink>

      {/* Courses Dropdown */}
      <div
        className="h-full"
        onMouseEnter={() => handleMouseEnter("courses")}
        onMouseLeave={() => handleMouseLeave("courses")}
      >
        <button
          className={`relative flex items-center gap-1 text-[13px] xl:text-sm font-bold transition-colors py-6 ${location.pathname.startsWith("/courses") || isCoursesOpen ? "text-primary-600" : "text-navy hover:text-primary-600"
            }`}
          aria-expanded={isCoursesOpen}
          aria-haspopup="true"
        >
          Courses
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCoursesOpen ? "rotate-180" : ""}`} />
        </button>
        <CoursesMegaMenu isOpen={isCoursesOpen} onClose={() => setIsCoursesOpen(false)} />
      </div>

      <NavLink to={ROUTES.BATCHES} className={navItemClass}>
        Batches
      </NavLink>

      <NavLink to={ROUTES.PLACEMENTS} className={navItemClass}>
        Placements
      </NavLink>

      {/* <NavLink to={ROUTES.CORPORATE_TRAINING} className="hidden xl:flex relative items-center gap-1 text-[13px] xl:text-sm font-bold transition-colors py-6 text-navy hover:text-primary-600">
        {/* {({ isActive }) => (
          <span className={isActive ? "text-primary-600" : ""}>Corporate Training</span>
        )}
      </NavLink> */}

      <NavLink to={ROUTES.ABOUT} className={navItemClass}>
        About
      </NavLink>

      {/* Resources Dropdown */}
      <div
        className="relative h-full"
        onMouseEnter={() => handleMouseEnter("resources")}
        onMouseLeave={() => handleMouseLeave("resources")}
      >
        <button
          className={`relative flex items-center gap-1 text-[13px] xl:text-sm font-bold transition-colors py-6 ${resources.some(r => location.pathname.startsWith(r.path)) || isResourcesOpen ? "text-primary-600" : "text-navy hover:text-primary-600"
            }`}
          aria-expanded={isResourcesOpen}
          aria-haspopup="true"
        >
          Resources
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isResourcesOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isResourcesOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full right-0 w-56 bg-white rounded-xl shadow-card border border-border py-2 z-50"
            >
              <div className="absolute top-0 left-0 right-0 h-4 bg-transparent -translate-y-full" />
              {resources.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsResourcesOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-secondary hover:text-primary-600 hover:bg-slate-50 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default DesktopNavigation;
