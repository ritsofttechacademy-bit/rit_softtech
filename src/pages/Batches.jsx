import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search, Filter, CalendarDays, Clock, Monitor, Building2,
  Users, ChevronDown, X, ArrowRight, MessageSquareMore,
  Laptop, MapPin, UserCheck, CheckCircle2, Layers
} from "lucide-react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { ROUTES, courseUrl } from "../constants/routes";
import { useInquiry } from "../context/InquiryContext";
import { batches, batchStatusConfig } from "../data/batches";

// ── Helpers ──────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const ModeIcon = ({ mode }) => {
  if (mode === "Online") return <Monitor className="w-4 h-4 text-primary-500" />;
  if (mode === "Classroom") return <Building2 className="w-4 h-4 text-emerald-500" />;
  return <Laptop className="w-4 h-4 text-violet-500" />;
};

const StatusBadge = ({ status }) => {
  const config = batchStatusConfig[status] || batchStatusConfig.open;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${config.color}`}>
      {config.label}
    </span>
  );
};

const SeatsBar = ({ total, left }) => {
  const pct = Math.round(((total - left) / total) * 100);
  const color = pct >= 80 ? "bg-red-400" : pct >= 60 ? "bg-amber-400" : "bg-emerald-400";
  return (
    <div className="w-full">
      <div className="flex justify-between text-[11px] mb-1.5">
        <span className="font-semibold text-slate-500">{left} seats left</span>
        <span className="text-slate-400">{total} total</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

// ── Category icon mapping ─────────────────────────────────────────────
const courseCategory = (name) => {
  if (/python|java|\.net|mern|full.?stack/i.test(name)) return { label: "Software Dev", color: "bg-blue-100 text-blue-700" };
  if (/ai|machine.?learn|generative/i.test(name)) return { label: "AI & ML", color: "bg-violet-100 text-violet-700" };
  if (/data|power.?bi|analytics/i.test(name)) return { label: "Data Science", color: "bg-cyan-100 text-cyan-700" };
  if (/aws|azure|cloud|gcp/i.test(name)) return { label: "Cloud", color: "bg-orange-100 text-orange-700" };
  if (/devops|docker|kubernetes/i.test(name)) return { label: "DevOps", color: "bg-amber-100 text-amber-700" };
  if (/cyber|security|ethical/i.test(name)) return { label: "Security", color: "bg-red-100 text-red-700" };
  if (/test|qa|selenium/i.test(name)) return { label: "Testing", color: "bg-emerald-100 text-emerald-700" };
  if (/ui|ux|design|figma/i.test(name)) return { label: "Design", color: "bg-pink-100 text-pink-700" };
  return { label: "IT Training", color: "bg-slate-100 text-slate-700" };
};

// ── Mobile Batch Card ─────────────────────────────────────────────────
const BatchMobileCard = ({ batch, onReserve }) => {
  const cat = courseCategory(batch.courseName);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl border border-border p-5 shadow-sm hover:border-primary-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-2 ${cat.color}`}>{cat.label}</span>
          <h3 className="font-bold text-navy text-base leading-snug">{batch.courseName}</h3>
        </div>
        <StatusBadge status={batch.status} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2 text-secondary">
          <CalendarDays className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="font-semibold">{formatDate(batch.startDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-secondary">
          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="font-semibold">{batch.time}</span>
        </div>
        <div className="flex items-center gap-2 text-secondary">
          <ModeIcon mode={batch.mode} />
          <span className="font-semibold">{batch.mode}</span>
        </div>
        <div className="flex items-center gap-2 text-secondary">
          <Layers className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="font-semibold">{batch.batchType}</span>
        </div>
        <div className="flex items-center gap-2 text-secondary col-span-2">
          <UserCheck className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="font-semibold">{batch.trainer}</span>
        </div>
      </div>

      <SeatsBar total={batch.seats} left={batch.seatsLeft} />

      <button
        onClick={() => onReserve(batch)}
        className="w-full mt-4 bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
      >
        Reserve Seat <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// ── Desktop Batch Row ─────────────────────────────────────────────────
const BatchTableRow = ({ batch, onReserve, delay = 0 }) => {
  const cat = courseCategory(batch.courseName);
  return (
    <motion.tr
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="border-b border-border hover:bg-slate-50/70 transition-colors group"
    >
      {/* Course */}
      <td className="py-5 px-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100">
            <span className="text-primary-600 font-black text-sm">{batch.courseName.slice(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <Link
              to={courseUrl(batch.courseSlug)}
              className="font-bold text-navy text-sm group-hover:text-primary-600 transition-colors leading-snug hover:underline"
            >
              {batch.courseName}
            </Link>
            <span className={`block text-[10px] font-bold mt-0.5 ${cat.color.split(" ")[1]}`}>{cat.label}</span>
          </div>
        </div>
      </td>

      {/* Date */}
      <td className="py-5 px-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-navy">
          <CalendarDays className="w-4 h-4 text-slate-400 shrink-0" />
          {formatDate(batch.startDate)}
        </div>
      </td>

      {/* Schedule */}
      <td className="py-5 px-4">
        <span className="text-sm font-semibold text-secondary">{batch.batchType}</span>
      </td>

      {/* Time */}
      <td className="py-5 px-4">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-secondary">
          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
          {batch.time}
        </div>
      </td>

      {/* Mode */}
      <td className="py-5 px-4">
        <div className="flex items-center gap-2">
          <ModeIcon mode={batch.mode} />
          <span className="text-sm font-semibold text-secondary">{batch.mode}</span>
        </div>
      </td>

      {/* Trainer */}
      <td className="py-5 px-4">
        <span className="text-sm font-semibold text-navy">{batch.trainer}</span>
      </td>

      {/* Seats */}
      <td className="py-5 px-4 min-w-[140px]">
        <SeatsBar total={batch.seats} left={batch.seatsLeft} />
      </td>

      {/* Status + Action */}
      <td className="py-5 px-6">
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={batch.status} />
          <button
            onClick={() => onReserve(batch)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors whitespace-nowrap group"
          >
            Reserve Seat
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

// ── Calendar Visual ───────────────────────────────────────────────────
const CalendarVisual = () => {
  const upcomingItems = batches.slice(0, 6).map(b => ({
    date: new Date(b.startDate).getDate(),
    month: new Date(b.startDate).toLocaleDateString("en-IN", { month: "short" }),
    name: b.courseName.split(" ").slice(0, 3).join(" "),
    status: b.status,
  }));

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl border border-white shadow-2xl p-5 w-full max-w-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-navy text-base">Upcoming Batches</h3>
        <CalendarDays className="w-5 h-5 text-primary-500" />
      </div>
      <div className="space-y-2.5">
        {upcomingItems.map((item, i) => {
          const statusColor =
            item.status === "filling-fast" ? "bg-amber-500"
            : item.status === "limited" ? "bg-red-500"
            : item.status === "new" ? "bg-blue-500"
            : "bg-emerald-500";
          return (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex flex-col items-center justify-center shrink-0">
                <span className="text-primary-700 font-black text-sm leading-none">{item.date}</span>
                <span className="text-primary-500 text-[9px] font-bold">{item.month}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-navy font-semibold text-xs leading-snug line-clamp-1">{item.name}</p>
              </div>
              <div className={`w-2 h-2 rounded-full shrink-0 ${statusColor}`} />
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-[11px] font-semibold text-slate-500">
        <span>🟢 Open</span><span>🟡 Filling Fast</span><span>🔴 Limited</span>
      </div>
    </div>
  );
};

// ── Stat Card ─────────────────────────────────────────────────────────
const StatCard = ({ value, label, icon: Icon }) => (
  <div className="flex flex-col items-center text-center px-4 py-6 bg-white rounded-2xl border border-border shadow-sm">
    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
      <Icon className="w-6 h-6 text-primary-600" />
    </div>
    <div className="text-3xl font-black text-navy mb-1">{value}</div>
    <div className="text-sm font-semibold text-secondary">{label}</div>
  </div>
);

// ── Filter Chip ───────────────────────────────────────────────────────
const FilterChip = ({ label, onRemove }) => (
  <div className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold px-3 py-1.5 rounded-full">
    {label}
    <button onClick={onRemove} aria-label={`Remove ${label} filter`}>
      <X className="w-3 h-3" />
    </button>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────
const Batches = () => {
  const { openInquiry } = useInquiry();

  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = useMemo(() => {
    return batches.filter(b => {
      const q = search.toLowerCase();
      const matchQ = !q || b.courseName.toLowerCase().includes(q) || b.trainer.toLowerCase().includes(q) || b.mode.toLowerCase().includes(q);
      const matchMode = !filterMode || b.mode === filterMode;
      const matchType = !filterType || b.batchType === filterType;
      const matchStatus = !filterStatus || b.status === filterStatus;
      return matchQ && matchMode && matchType && matchStatus;
    });
  }, [search, filterMode, filterType, filterStatus]);

  const activeFilters = [
    filterMode && { label: filterMode, clear: () => setFilterMode("") },
    filterType && { label: filterType, clear: () => setFilterType("") },
    filterStatus && { label: batchStatusConfig[filterStatus]?.label, clear: () => setFilterStatus("") },
  ].filter(Boolean);

  const clearAll = () => {
    setSearch(""); setFilterMode(""); setFilterType(""); setFilterStatus("");
  };

  const handleReserve = (batch) => {
    openInquiry({ course: batch.courseName, batch: `Batch #${batch.id} starting ${formatDate(batch.startDate)}`, source: "batches-page" });
  };

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-navy to-[#071F55] text-white relative overflow-hidden min-h-[420px] flex items-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[100px] pointer-events-none" />
        <Container className="relative z-10 pt-28 pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-primary-400 font-bold text-xs uppercase tracking-widest mb-5">UPCOMING TRAINING BATCHES</span>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[52px] leading-[1.1] mb-6">
                Find a Batch That Fits<br />
                <span className="text-primary-400">Your Schedule</span>
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-[560px]">
                Explore upcoming weekday, weekend, classroom, online and hybrid training schedules across our technology programs.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-2.5 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {batches.length}+ Upcoming Batches
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-2.5 text-sm font-semibold">
                  <Monitor className="w-4 h-4 text-blue-400" /> Online + Classroom
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-2.5 text-sm font-semibold">
                  <CalendarDays className="w-4 h-4 text-amber-400" /> Weekday + Weekend
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <CalendarVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-border">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value={`${batches.length}+`} label="Upcoming Batches" icon={CalendarDays} />
            <StatCard value="24+" label="Career Programs" icon={Layers} />
            <StatCard value="3" label="Learning Modes" icon={Monitor} />
            <StatCard value="6 Days" label="Weekly Schedule Options" icon={Clock} />
          </div>
        </Container>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────── */}
      <section className="py-6 bg-slate-50 border-b border-border sticky top-[72px] z-30 shadow-sm">
        <Container>
          {/* Search Row */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="search"
              placeholder="Search course, trainer or mode..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-white text-sm font-medium text-navy placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />

            <select
              value={filterMode}
              onChange={e => setFilterMode(e.target.value)}
              className="h-9 px-3 rounded-lg border border-border bg-white text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 cursor-pointer"
            >
              <option value="">All Modes</option>
              <option value="Online">Online</option>
              <option value="Classroom">Classroom</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="h-9 px-3 rounded-lg border border-border bg-white text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 cursor-pointer"
            >
              <option value="">All Schedules</option>
              <option value="Weekday">Weekday</option>
              <option value="Weekend">Weekend</option>
            </select>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="h-9 px-3 rounded-lg border border-border bg-white text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="new">New Batch</option>
              <option value="filling-fast">Filling Fast</option>
              <option value="limited">Limited Seats</option>
            </select>

            {activeFilters.length > 0 && (
              <button onClick={clearAll} className="ml-auto text-xs font-bold text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
          </div>

          {/* Active Chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {activeFilters.map((f, i) => (
                <FilterChip key={i} label={f.label} onRemove={f.clear} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── Results ──────────────────────────────────────────────────── */}
      <section className="py-10 bg-white">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-xl text-navy">
              {filtered.length} {filtered.length === 1 ? "Batch" : "Batches"} Found
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <CalendarDays className="w-14 h-14 text-slate-200 mx-auto mb-4" />
              <h3 className="font-bold text-xl text-navy mb-2">No Batches Match Your Filters</h3>
              <p className="text-secondary mb-6">Try adjusting your search or clearing filters.</p>
              <button onClick={clearAll} className="inline-flex items-center gap-2 bg-primary-600 text-white font-bold py-3 px-6 rounded-btn hover:bg-primary-700 transition-colors">
                Clear Filters <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-hidden rounded-2xl border border-border shadow-sm">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-border">
                    <tr>
                      {["Course", "Start Date", "Schedule", "Time", "Mode", "Trainer", "Seats", "Action"].map(h => (
                        <th key={h} className="text-left text-[11px] font-black text-muted uppercase tracking-widest px-4 first:px-6 last:px-6 py-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filtered.map((batch, i) => (
                      <BatchTableRow key={batch.id} batch={batch} onReserve={handleReserve} delay={i * 0.04} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {filtered.map(batch => (
                  <BatchMobileCard key={batch.id} batch={batch} onReserve={handleReserve} />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-t border-border">
        <Container>
          <div className="bg-gradient-to-br from-[#0052B8] to-[#0A326F] rounded-[24px] overflow-hidden p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            <div className="relative z-10 text-center md:text-left">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">Can't Find a Suitable Batch?</h2>
              <p className="text-primary-200 text-base max-w-lg">Talk to our training team and we'll help you find an appropriate course schedule based on your availability.</p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => openInquiry({ source: "batches-page-cta" })}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0052B8] font-bold py-3.5 px-7 rounded-btn hover:bg-slate-50 transition-colors shadow-lg"
              >
                <MessageSquareMore className="w-5 h-5" /> Talk to Advisor
              </button>
              <Link
                to={ROUTES.COURSES}
                className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-bold py-3.5 px-7 rounded-btn hover:bg-white/25 transition-colors"
              >
                Explore Courses <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Batches;
