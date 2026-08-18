import { motion } from "framer-motion";
import { Terminal, CheckCircle2, BrainCircuit, Code2, Cloud, Database, Zap, GitBranch } from "lucide-react";

// Per-slide visual configuration
const visualConfig = {
  1: {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Students collaborating on technology skills",
    tags: [
      { icon: "R", color: "bg-blue-500", label: "React" },
      { icon: "N", color: "bg-emerald-600", label: "Node.js" },
    ],
    floatingCards: [
      {
        type: "terminal",
        content: { command: "> npm run dev", status: "Server running on port 3000" }
      },
      {
        type: "badge",
        icon: <Cloud className="w-4 h-4 text-orange-500" />,
        text: "AWS Deployed",
        extra: null
      },
      {
        type: "success",
        title: "Build Successful",
        subtitle: "Production bundle ready"
      }
    ]
  },
  2: {
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800&auto=format&fit=crop",
    imageAlt: "AI and machine learning visualization",
    tags: [
      { icon: "AI", color: "bg-violet-600", label: "LangChain" },
      { icon: "G", color: "bg-orange-500", label: "GPT-4o" },
    ],
    floatingCards: [
      {
        type: "terminal",
        content: { command: "> python app.py", status: "Model loaded · LLM ready" }
      },
      {
        type: "badge",
        icon: <BrainCircuit className="w-4 h-4 text-violet-500" />,
        text: "AI Model Active",
        extra: null
      },
      {
        type: "success",
        title: "RAG Pipeline Built",
        subtitle: "95% accuracy on test set"
      }
    ]
  },
  3: {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Full stack development code on screen",
    tags: [
      { icon: "Py", color: "bg-blue-600", label: "Python" },
      { icon: "Dj", color: "bg-green-700", label: "Django" },
    ],
    floatingCards: [
      {
        type: "terminal",
        content: { command: "> git push origin main", status: "Changes deployed via CI/CD" }
      },
      {
        type: "badge",
        icon: <GitBranch className="w-4 h-4 text-emerald-500" />,
        text: "CI/CD Pipeline",
        extra: null
      },
      {
        type: "success",
        title: "Project Completed",
        subtitle: "E-commerce API built"
      }
    ]
  }
};

const floatAnim = (delay = 0, axis = "y") => ({
  animate: { [axis]: [0, -8, 0] },
  transition: { duration: 4, repeat: Infinity, delay, ease: "easeInOut" }
});

const HeroVisual = ({ slideId = 1 }) => {
  const config = visualConfig[slideId] || visualConfig[1];

  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center">

      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[350px] h-[350px] bg-primary-500/15 rounded-full blur-[80px] -top-16 -right-16" />
        <div className="absolute w-[280px] h-[280px] bg-indigo-500/10 rounded-full blur-[60px] bottom-0 left-0" />
      </div>

      {/* ── Main Photo Card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[380px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={config.image}
            alt={config.imageAlt}
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
            draggable={false}
          />
        </div>

        {/* Overlay gradient at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/70 to-transparent flex items-end p-5">
          <div className="flex items-center gap-2">
            {config.tags.map((tag, i) => (
              <span key={i} className={`${tag.color} text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow`}>
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Floating Terminal ── */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        {...floatAnim(0.5)}
        className="absolute bottom-28 -left-8 lg:-left-20 bg-[#0F172A] text-white p-4 rounded-2xl shadow-2xl border border-slate-700 w-[230px] z-30"
      >
        <div className="flex items-center gap-2 mb-3 border-b border-slate-700 pb-2.5">
          <Terminal className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px] text-slate-400 font-mono">Terminal</span>
          <div className="flex gap-1 ml-auto">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
          </div>
        </div>
        <p className="text-[11px] font-mono text-emerald-400 mb-2.5">{config.floatingCards[0].content.command}</p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-[10px] font-mono text-slate-300 leading-tight">{config.floatingCards[0].content.status}</span>
        </div>
      </motion.div>

      {/* ── Success Notification ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.85 }}
        {...floatAnim(1.5)}
        className="absolute bottom-8 -right-4 lg:-right-10 bg-white rounded-2xl shadow-xl border border-border px-4 py-3 flex items-center gap-3 z-30 min-w-[190px]"
      >
        <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>
        <div>
          <p className="text-[13px] font-bold text-navy leading-none mb-0.5">{config.floatingCards[2].title}</p>
          <p className="text-[10px] text-secondary leading-tight">{config.floatingCards[2].subtitle}</p>
        </div>
      </motion.div>

      {/* ── Infra/Tech Badge ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.0, type: "spring", bounce: 0.5 }}
        className="absolute top-6 -right-4 lg:-right-10 bg-white py-2.5 px-4 rounded-2xl shadow-lg border border-border flex items-center gap-2.5 z-20"
      >
        {config.floatingCards[1].icon}
        <span className="text-[13px] font-bold text-navy">{config.floatingCards[1].text}</span>
      </motion.div>

      {/* ── Small Tech Pill top-left ── */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.75 }}
        className="absolute top-16 -left-4 lg:-left-12 bg-white py-2 px-3.5 rounded-xl shadow-md border border-border flex items-center gap-2 z-20"
      >
        <div className={`w-6 h-6 ${config.tags[0].color} rounded-lg flex items-center justify-center text-white text-[10px] font-black`}>
          {config.tags[0].icon}
        </div>
        <span className="text-xs font-bold text-navy">{config.tags[0].label}</span>
      </motion.div>

    </div>
  );
};

export default HeroVisual;
