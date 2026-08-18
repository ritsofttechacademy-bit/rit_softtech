import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// CountUp effect for numbers
const useCountUp = (end, duration = 2000, startCount = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCount) return;

    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress / duration, 4);
        setCount(Math.floor(end * easeProgress));
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCount]);

  return count;
};

const formatIndianNumber = (num) => {
  if (num >= 100000) {
    const lakhs = num / 100000;
    return `${lakhs.toLocaleString('en-IN')},00,000`; // Approximation for effect
  }
  return num.toLocaleString('en-IN');
};

const StatCard = ({ icon: Icon, value, rawValue, suffix, label, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(rawValue, 2000, isInView);

  // Use the pre-formatted string if provided (e.g. "5,00,000") or format the count
  const displayValue = value ? value : formatIndianNumber(count);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center p-4"
    >
      <div className="text-primary-500 mb-3">
        <Icon className="w-8 h-8" strokeWidth={1.5} />
      </div>
      <div className="font-heading font-extrabold text-3xl md:text-4xl text-navy mb-1 flex items-center justify-center">
        {displayValue}
        <span className="text-primary-600 ml-1">{suffix}</span>
      </div>
      <p className="text-sm font-semibold text-secondary uppercase tracking-wider">{label}</p>
    </motion.div>
  );
};

export default StatCard;
