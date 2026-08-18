import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "../../constants/routes";
import { motion } from "framer-motion";

const CategoryCard = ({ category, icon: Icon, count, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay }}
    >
      <Link
        to={`${ROUTES.COURSES}?category=${encodeURIComponent(category.name)}`}
        className="group block bg-white border border-border rounded-[20px] p-6 transition-all duration-300 hover:border-primary-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 h-full"
      >
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-5 group-hover:bg-primary-50 transition-colors">
          <Icon className="w-6 h-6 text-slate-600 group-hover:text-primary-600 transition-colors" strokeWidth={1.5} />
        </div>
        
        <h3 className="font-heading font-bold text-lg text-navy mb-1 group-hover:text-primary-600 transition-colors leading-tight">
          {category.name}
        </h3>
        <p className="text-sm font-semibold text-secondary mb-5">
          {count} Programs
        </p>
        
        <div className="flex items-center gap-1.5 text-sm font-bold text-navy group-hover:text-primary-600 transition-colors">
          Explore Programs <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
