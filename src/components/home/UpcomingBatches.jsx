import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../common/Container";
import { ROUTES } from "../../constants/routes";
import { batches } from "../../data/batches";
import { useInquiry } from "../../context/InquiryContext";

const seatsLabel = (seats) => {
  if (seats <= 5)  return { text: `${seats} seats left`, cls: "text-rose-600" };
  if (seats <= 10) return { text: `${seats} seats`, cls: "text-amber-600" };
  return               { text: `${seats} seats`, cls: "text-emerald-600" };
};

const UpcomingBatches = () => {
  const { openInquiry } = useInquiry();
  const upcoming = batches.slice(0, 4); // only 4 rows on homepage

  return (
    <section className="bg-[#F7F8FA] editorial-divider" style={{ paddingBlock: "64px" }}>
      <Container>

        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "10px" }}>
              Schedule
            </span>
            <h2 style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.2, letterSpacing: "-0.015em" }}>
              Upcoming Batches
            </h2>
          </div>
          <Link
            to={ROUTES.BATCHES}
            className="hidden sm:inline-flex items-center gap-2"
            style={{ fontSize: "13px", fontWeight: 700, color: "var(--blue)" }}
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden">
          {/* Header row */}
          <div
            className="hidden md:grid grid-cols-12 gap-4 items-center border-b border-[#E5E7EB] px-5"
            style={{ height: "40px", backgroundColor: "#F8FAFC" }}
          >
            <div className="col-span-4 text-[11px] font-black uppercase tracking-widest text-[#94A3B8]">Course</div>
            <div className="col-span-2 text-[11px] font-black uppercase tracking-widest text-[#94A3B8]">Start</div>
            <div className="col-span-2 text-[11px] font-black uppercase tracking-widest text-[#94A3B8]">Schedule</div>
            <div className="col-span-2 text-[11px] font-black uppercase tracking-widest text-[#94A3B8]">Mode</div>
            <div className="col-span-1 text-[11px] font-black uppercase tracking-widest text-[#94A3B8]">Seats</div>
            <div className="col-span-1" />
          </div>

          {/* Data rows */}
          {upcoming.map((batch, i) => {
            const seats = seatsLabel(batch.seatsLeft ?? 12);
            return (
              <motion.div
                key={batch.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.06 }}
                className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F8FAFC] transition-colors"
              >
                {/* Desktop row */}
                <div
                  className="hidden md:grid grid-cols-12 gap-4 items-center px-5"
                  style={{ height: "66px" }}
                >
                  <div className="col-span-4">
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)", lineHeight: 1.3 }}>
                      {batch.courseName}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: 2 }}>{batch.duration}</div>
                  </div>
                  <div className="col-span-2" style={{ fontSize: "14px", fontWeight: 600, color: "var(--navy)" }}>{batch.startDate}</div>
                  <div className="col-span-2" style={{ fontSize: "13px", color: "var(--muted)" }}>{batch.batchType}</div>
                  <div className="col-span-2" style={{ fontSize: "13px", color: "var(--muted)" }}>{Array.isArray(batch.mode) ? batch.mode[0] : batch.mode}</div>
                  <div className={`col-span-1 text-[12px] font-bold ${seats.cls}`}>{seats.text}</div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => openInquiry({ course: batch.courseName, batch: batch.id })}
                      style={{ height: "34px", padding: "0 14px", fontSize: "12px", fontWeight: 700, color: "white", backgroundColor: "var(--blue)", borderRadius: "6px", border: "none", cursor: "pointer" }}
                    >
                      Reserve
                    </button>
                  </div>
                </div>

                {/* Mobile card */}
                <div className="md:hidden p-4">
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{batch.courseName}</div>
                  <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: 8 }}>
                    {batch.startDate} · {batch.batchType} · {Array.isArray(batch.mode) ? batch.mode[0] : batch.mode}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[12px] font-bold ${seats.cls}`}>{seats.text}</span>
                    <button
                      onClick={() => openInquiry({ course: batch.courseName, batch: batch.id })}
                      style={{ height: "34px", padding: "0 14px", fontSize: "12px", fontWeight: 700, color: "white", backgroundColor: "var(--blue)", borderRadius: "6px", border: "none", cursor: "pointer" }}
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-5 sm:hidden">
          <Link to={ROUTES.BATCHES} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "14px", fontWeight: 700, color: "var(--blue)" }}>
            View All Batches <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </Container>
    </section>
  );
};

export default UpcomingBatches;
