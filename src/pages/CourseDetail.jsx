import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, Download, PlayCircle, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import { courses } from "../data/courses";
import { trainers } from "../data/trainers";
import { batches } from "../data/batches";
import { ROUTES } from "../constants/routes";
import { useInquiry } from "../context/InquiryContext";

const CourseDetail = () => {
  const { slug } = useParams();
  const { openInquiry } = useInquiry();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    const found = courses.find((c) => c.slug === slug);
    if (found) setCourse(found);
  }, [slug]);

  if (!course) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy mb-4">Course not found</h2>
          <Link to={ROUTES.COURSES} className="text-blue-600 font-semibold hover:underline">
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  // Find related data
  const upcomingBatches = batches.filter(b => b.courseName === course.shortTitle || b.courseName === course.title).slice(0, 3);
  const trainer = trainers[0]; // Just picking one for demo

  return (
    <main className="bg-[#F7F8FA] min-h-screen">
      
      {/* ── Breadcrumbs ── */}
      <div className="bg-white border-b border-[#E5E7EB] py-4">
        <Container>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#94A3B8]">
            <Link to={ROUTES.HOME} className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={ROUTES.COURSES} className="hover:text-blue-600">Programs</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0F172A]">{course.shortTitle || course.title}</span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid-12 py-[64px]">
          
          {/* ── Main Content (8 cols) ── */}
          <div className="col-span-12 lg:col-span-8">
            
            {/* Hero Info */}
            <div className="mb-[64px]">
              <span className="section-label">{course.category}</span>
              <h1
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 800,
                  color: "var(--navy)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "var(--space-4)"
                }}
              >
                {course.title}
              </h1>
              <p style={{ fontSize: "18px", color: "var(--muted)", lineHeight: 1.6, maxWidth: "600px", marginBottom: "var(--space-6)" }}>
                {course.description}
              </p>

              <div className="flex items-center gap-6 mb-8 border-y border-[#E5E7EB] py-4">
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginBottom: 2 }}>Duration</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--navy)" }}>{course.duration}</div>
                </div>
                <div className="w-px h-8 bg-[#E5E7EB]" />
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginBottom: 2 }}>Mode</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--navy)" }}>{Array.isArray(course.mode) ? course.mode.join(" / ") : course.mode}</div>
                </div>
                <div className="w-px h-8 bg-[#E5E7EB]" />
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginBottom: 2 }}>Level</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--navy)" }}>{course.level}</div>
                </div>
              </div>

              {/* Technologies */}
              <div style={{ marginBottom: "var(--space-8)" }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--navy)", marginBottom: "var(--space-3)" }}>Technologies Covered</div>
                <div className="flex flex-wrap gap-2">
                  {(course.skills || []).map(skill => (
                    <span key={skill} style={{ fontSize: "13px", fontWeight: 600, color: "var(--navy)", backgroundColor: "white", border: "1px solid #E5E7EB", padding: "6px 12px", borderRadius: "6px" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="mb-[80px]">
              <h2
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "var(--navy)",
                  marginBottom: "var(--space-6)"
                }}
              >
                Curriculum
              </h2>
              
              <div className="bg-white border border-[#E5E7EB] rounded-[10px]">
                {(course.curriculum || []).map((module, i) => (
                  <div 
                    key={module.module}
                    className="p-6 border-b border-[#E5E7EB] last:border-b-0"
                  >
                    <div className="flex items-start gap-4">
                      <div style={{ fontSize: "18px", fontWeight: 800, color: "#CBD5E1", marginTop: 2 }}>
                        {String(module.module).padStart(2, '0')}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--navy)" }}>
                            {module.title}
                          </h3>
                          <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748B", backgroundColor: "#F1F5F9", padding: "2px 8px", borderRadius: "4px" }}>
                            {module.duration}
                          </span>
                        </div>
                        <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.5 }}>
                          {module.topics.join(" • ")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trainer Profile (Horizontal Media Block) */}
            <div className="mb-[80px]">
              <h2
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "var(--navy)",
                  marginBottom: "var(--space-6)"
                }}
              >
                Your Mentor
              </h2>
              
              <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-6 sm:p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                <div style={{ width: "120px", height: "120px", borderRadius: "50%", backgroundColor: trainer.imageColor || "#E5E7EB", flexShrink: 0, overflow: "hidden" }}>
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=240&auto=format&fit=crop" alt={trainer.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", marginBottom: 4 }}>{trainer.name}</h3>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--blue)", marginBottom: 12 }}>{trainer.designation}</div>
                  <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>{trainer.bio}</p>
                  <div className="flex items-center gap-4 text-[13px] font-bold text-slate-600">
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-500" /> {trainer.experience} Exp</span>
                    <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 4.9 Rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Batches Table */}
            <div className="mb-[80px]">
              <h2
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "var(--navy)",
                  marginBottom: "var(--space-6)"
                }}
              >
                Upcoming Batches
              </h2>
              
              <div className="bg-white border border-[#E5E7EB] rounded-[10px] overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-4 bg-[#F8FAFC] border-b border-[#E5E7EB] px-6 py-3 text-[11px] font-black uppercase tracking-widest text-[#64748B]">
                  <div className="col-span-1">Date</div>
                  <div className="col-span-1">Schedule</div>
                  <div className="col-span-1">Mode</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>
                {/* Rows */}
                {upcomingBatches.length > 0 ? upcomingBatches.map((batch, i) => (
                  <div key={i} className="grid grid-cols-4 items-center border-b border-[#E5E7EB] last:border-0 px-6 py-4 hover:bg-[#F8FAFC] transition-colors">
                    <div className="col-span-1 text-[14px] font-bold text-navy">{batch.startDate}</div>
                    <div className="col-span-1 text-[14px] text-muted">{batch.schedule || batch.timing}</div>
                    <div className="col-span-1 text-[14px] text-muted">{Array.isArray(batch.mode) ? batch.mode[0] : batch.mode}</div>
                    <div className="col-span-1 flex justify-end">
                      <button 
                        onClick={() => openInquiry({ course: course.title, batch: batch.id })}
                        className="btn-outline" style={{ height: "32px", padding: "0 16px", fontSize: "12px" }}
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="px-6 py-8 text-center text-[14px] text-muted">
                    No upcoming batches scheduled. Contact us for custom timing.
                  </div>
                )}
              </div>
            </div>

          </div>
          
          {/* ── Sidebar (4 cols) ── */}
          <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-[112px]">
              
              {/* Main CTA Panel */}
              <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-6 shadow-sm mb-6">
                <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--navy)", marginBottom: "var(--space-2)" }}>
                  Interested in this program?
                </div>
                <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "var(--space-6)" }}>
                  Get detailed curriculum, schedule, and fee information.
                </p>
                
                <button
                  onClick={() => openInquiry({ course: course.title })}
                  className="btn-primary w-full mb-4 justify-center"
                >
                  Enquire Now
                </button>
                <button
                  className="btn-outline w-full justify-center text-[#2563EB] border-[#BFDBFE] hover:bg-[#EFF6FF]"
                >
                  <Download className="w-4 h-4 mr-1" /> Download Syllabus
                </button>
                
                <div className="mt-6 pt-6 border-t border-[#E5E7EB] space-y-4">
                  <div className="flex items-center gap-3 text-[14px] font-semibold text-navy">
                    <Calendar className="w-5 h-5 text-blue-500" /> Next batch starts {upcomingBatches[0]?.startDate || "Soon"}
                  </div>
                  <div className="flex items-center gap-3 text-[14px] font-semibold text-navy">
                    <Check className="w-5 h-5 text-emerald-500" /> 100% Placement Assistance
                  </div>
                  <div className="flex items-center gap-3 text-[14px] font-semibold text-navy">
                    <Star className="w-5 h-5 text-amber-500" /> 4.8 Average Rating
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </main>
  );
};

export default CourseDetail;
