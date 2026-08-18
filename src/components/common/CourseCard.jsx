import { Link } from "react-router-dom";
import { Star, Clock, Laptop, ArrowRight } from "lucide-react";
import { courseUrl } from "../../constants/routes";
import { motion } from "framer-motion";

const formatLearners = (num) => {
  if (!num) return "1,000+";
  if (num >= 1000) return `${(num / 1000).toFixed(num >= 10000 ? 1 : 0).replace(/\.0$/, "")}K+`;
  return `${num}+`;
};

const CourseCard = ({ course, delay = 0 }) => {
  const skills = course.skills || [];
  const modeDisplay = Array.isArray(course.mode) ? course.mode[0] : course.mode || "Hybrid";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay }}
      className="group relative flex flex-col bg-white border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 h-full"
    >
      {/* Top Meta */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-muted uppercase tracking-wider">
          {course.category}
        </span>
        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-amber-700">{course.rating || 4.8}</span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-6 flex-grow">
        <h3 className="font-heading font-bold text-xl text-navy leading-tight mb-3 group-hover:text-primary-600 transition-colors">
          <Link to={courseUrl(course.slug)} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {course.title}
          </Link>
        </h3>
        <p className="text-sm text-secondary line-clamp-2 leading-relaxed">
          {course.description}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {skills.slice(0, 3).map((tech) => (
          <span key={tech} className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
            {tech}
          </span>
        ))}
        {skills.length > 3 && (
          <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
            +{skills.length - 3}
          </span>
        )}
      </div>

      {/* Footer Details */}
      <div className="border-t border-border pt-4 mt-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-sm font-medium text-navy">
            <Clock className="w-4 h-4 text-primary-500" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-navy">
            <Laptop className="w-4 h-4 text-emerald-500" />
            {modeDisplay}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted">
            👥 {formatLearners(course.learners)} Learners
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 transition-transform group-hover:translate-x-1">
            View Program <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
