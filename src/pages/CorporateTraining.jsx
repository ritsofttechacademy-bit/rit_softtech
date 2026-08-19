import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Target, Settings, CalendarClock, Activity, BookOpen,
  Monitor, Landmark, Factory, ShoppingCart, GraduationCap, Briefcase,
  Signal, Building2, CheckCircle2, ChevronDown, ArrowRight, Laptop,
  ClipboardList, PieChart
} from "lucide-react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { corporateTechnologies, corporateIndustries } from "../data/corporateTraining";
import Toast from "../components/common/Toast";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const ICON_MAP = {
  Monitor, Landmark, Activity, Factory, ShoppingCart, GraduationCap, Briefcase, Signal
};

const CorporateTraining = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    teamSize: "",
    technology: "",
    trainingMode: "",
    startDate: "",
    requirements: ""
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.contactPerson) newErrors.contactPerson = "Contact person is required";
    if (!formData.email) newErrors.email = "Work email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.teamSize) newErrors.teamSize = "Team size is required";
    if (!formData.technology) newErrors.technology = "Technology is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const payload = {
          name: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          course: formData.technology,
          message: `Company: ${formData.companyName}\nTeam Size: ${formData.teamSize}\nMode: ${formData.trainingMode}\nStart: ${formData.startDate}\nReqs: ${formData.requirements}`,
          type: "corporate"
        };
        const res = await fetch('http://localhost:5000/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        
        if (data.success) {
          setToast({ show: true, message: "Training proposal request submitted successfully! Our team will contact you shortly.", type: "success" });
          setFormData({ companyName: "", contactPerson: "", email: "", phone: "", teamSize: "", technology: "", trainingMode: "", startDate: "", requirements: "" });
          setErrors({});
        } else {
          setToast({ show: true, message: data.message || "Failed to submit request", type: "error" });
        }
      } catch (error) {
        setToast({ show: true, message: "Server error. Please try again later.", type: "error" });
      }
    }
  };

  const scrollToForm = () => {
    document.getElementById("corporate-form").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-b border-border pt-28 pb-16 md:pb-20 lg:pb-24 overflow-hidden relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="relative z-10">
              <span className="inline-block text-primary-600 font-bold text-xs uppercase tracking-widest mb-5 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-100">
                ENTERPRISE TECHNOLOGY TRAINING
              </span>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[52px] leading-[1.1] text-navy mb-6">
                Build Future-Ready<br />
                <span className="text-primary-600">Technology Teams</span>
              </h1>
              <p className="text-secondary text-lg leading-relaxed mb-8 max-w-[560px]">
                Customized instructor-led programs designed around your organization's technology stack, workforce goals and delivery needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-3.5 px-7 rounded-btn hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                >
                  Request Training Proposal
                </button>
                <button 
                  onClick={() => document.getElementById("technologies").scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center gap-2 bg-white text-navy font-bold py-3.5 px-7 rounded-btn border border-border hover:bg-slate-50 transition-colors"
                >
                  Explore Technologies
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:h-[480px]">
              <div className="absolute inset-0 bg-primary-600/10 rounded-2xl blur-2xl transform translate-x-4 translate-y-4" />
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                alt="Corporate technology training session"
                className="w-full h-full object-cover rounded-2xl shadow-xl border border-white relative z-10"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Capability Strip ─────────────────────────────────────────── */}
      <section className="py-8 bg-navy border-b border-slate-800">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {[
              "Customized Curriculum",
              "Instructor-Led Sessions",
              "Team Assessments",
              "Flexible Delivery",
              "Progress Tracking"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary-400" /> {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <SectionHeader tag="WHY CHOOSE RIT" title="Designed for Enterprise Teams" subtitle="We deliver measurable capability improvements through structured, hands-on learning experiences." align="center" className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Customized Curriculum", desc: "Syllabus tailored exactly to your tech stack and project requirements." },
              { icon: Users, title: "Dedicated Trainer", desc: "Expert instructors matched to your industry and organizational culture." },
              { icon: CalendarClock, title: "Flexible Scheduling", desc: "Weekend, weekday, or intensive bootcamp options to minimize downtime." },
              { icon: Monitor, title: "Hands-On Labs", desc: "Practical exercises and sandbox environments for active skill building." },
              { icon: Target, title: "Team Assessments", desc: "Pre and post-training evaluations to measure capability uplift." },
              { icon: PieChart, title: "Progress Reports", desc: "Detailed analytics on attendance, engagement, and assessment scores." },
            ].map((benefit, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} variants={fadeUp}
                className="p-8 bg-slate-50 rounded-2xl border border-border hover:border-primary-300 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-border mb-5">
                  <benefit.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-navy text-xl mb-3">{benefit.title}</h3>
                <p className="text-secondary leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Technologies ─────────────────────────────────────────────── */}
      <section id="technologies" className="py-16 md:py-24 bg-slate-50 border-y border-border">
        <Container>
          <SectionHeader tag="CAPABILITIES" title="Enterprise Technology Domains" subtitle="Comprehensive training across modern technology stacks and specialized IT domains." align="center" className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corporateTechnologies.map((cat, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} variants={fadeUp}
                className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-bold text-navy text-lg border-b border-border pb-3 mb-4">{cat.category}</h3>
                <ul className="space-y-3">
                  {cat.skills.map((skill, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm font-medium text-secondary">
                      <ChevronRightIcon className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" /> {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Delivery Modes ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <SectionHeader tag="DELIVERY OPTIONS" title="Flexible Training Delivery" subtitle="Choose the learning format that best fits your team's location and operational constraints." align="center" className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DeliveryModeCard 
              icon={Building2} title="On-Site Corporate Training" 
              desc="Our expert trainers travel to your office premises for dedicated, face-to-face instruction."
              useCases={["Large teams", "High-security environments", "Intensive bootcamps"]}
            />
            <DeliveryModeCard 
              icon={Laptop} title="Live Virtual Training" 
              desc="Interactive, instructor-led sessions delivered via enterprise video conferencing tools."
              useCases={["Distributed teams", "Remote workers", "Flexible scheduling"]}
            />
            <DeliveryModeCard 
              icon={Users} title="Hybrid Training" 
              desc="A blended approach combining on-site workshops with ongoing virtual mentoring and labs."
              useCases={["Long-term upskilling", "Complex migrations", "Leadership training"]}
            />
          </div>
        </Container>
      </section>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <Container>
          <SectionHeader tag="METHODOLOGY" title="Our Engagement Process" subtitle="A structured approach to ensure training investments deliver measurable returns." align="center" className="mb-16 dark" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
             {/* Decorative line for desktop */}
            <div className="hidden lg:block absolute top-6 left-12 right-12 h-px bg-slate-700 z-0" />
            
            {[
              { num: "01", title: "Discovery", desc: "Understanding your tech stack and goals." },
              { num: "02", title: "Assessment", desc: "Evaluating baseline team capabilities." },
              { num: "03", title: "Curriculum Design", desc: "Tailoring the syllabus and lab exercises." },
              { num: "04", title: "Trainer Allocation", desc: "Matching the ideal subject matter expert." },
              { num: "05", title: "Program Delivery", desc: "Executing interactive training sessions." },
              { num: "06", title: "Evaluation", desc: "Post-training skill assessments." },
              { num: "07", title: "Completion Report", desc: "Detailed analytics and ROI reporting." },
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-primary-500 flex items-center justify-center text-lg font-bold text-white mb-4">
                  {step.num}
                </div>
                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Industries ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-border">
        <Container>
          <SectionHeader tag="INDUSTRIES" title="Domain-Specific Context" subtitle="We adapt our technology examples and case studies to match your industry's specific challenges." align="center" className="mb-14" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {corporateIndustries.map((ind, i) => {
              const Icon = ICON_MAP[ind.icon] || Briefcase;
              return (
                <div key={i} className="bg-white p-6 rounded-2xl border border-border flex flex-col items-center text-center hover:shadow-md hover:border-primary-300 transition-all group">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors">
                    <Icon className="w-6 h-6 text-slate-600 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <span className="font-bold text-navy text-sm">{ind.name}</span>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── Form ─────────────────────────────────────────────────────── */}
      <section id="corporate-form" className="py-16 md:py-24 bg-white">
        <Container>
          <div className="bg-slate-50 rounded-3xl border border-border overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left Content */}
              <div className="lg:col-span-2 bg-gradient-to-br from-navy to-[#071F55] p-10 md:p-14 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="relative z-10">
                  <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Let's Design Your Training Program</h2>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    Provide a few details about your requirements, and our enterprise learning advisors will contact you to discuss customized solutions.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Users className="w-5 h-5 text-primary-300" /></div>
                      <div>
                        <div className="font-bold">Expert Consultation</div>
                        <div className="text-sm text-slate-400">Free needs analysis</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><ClipboardList className="w-5 h-5 text-primary-300" /></div>
                      <div>
                        <div className="font-bold">Detailed Proposal</div>
                        <div className="text-sm text-slate-400">Curriculum & pricing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:col-span-3 p-10 md:p-14 bg-white">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <FormField label="Company Name" error={errors.companyName}>
                    <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className={inputClass(errors.companyName)} placeholder="e.g. Acme Corp" />
                  </FormField>
                  <FormField label="Contact Person" error={errors.contactPerson}>
                    <input type="text" value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} className={inputClass(errors.contactPerson)} placeholder="Full Name" />
                  </FormField>
                  <FormField label="Work Email" error={errors.email}>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={inputClass(errors.email)} placeholder="name@company.com" />
                  </FormField>
                  <FormField label="Phone Number" error={errors.phone}>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className={inputClass(errors.phone)} placeholder="Contact Number" />
                  </FormField>
                  
                  <FormField label="Team Size" error={errors.teamSize}>
                    <select value={formData.teamSize} onChange={e => setFormData({...formData, teamSize: e.target.value})} className={inputClass(errors.teamSize)}>
                      <option value="">Select size</option>
                      <option value="1-5">1-5 people</option>
                      <option value="6-15">6-15 people</option>
                      <option value="16-50">16-50 people</option>
                      <option value="50+">50+ people</option>
                    </select>
                  </FormField>
                  
                  <FormField label="Technology Category" error={errors.technology}>
                    <select value={formData.technology} onChange={e => setFormData({...formData, technology: e.target.value})} className={inputClass(errors.technology)}>
                      <option value="">Select category</option>
                      {corporateTechnologies.map(c => <option key={c.category} value={c.category}>{c.category}</option>)}
                      <option value="Other">Other / Custom</option>
                    </select>
                  </FormField>

                  <FormField label="Preferred Delivery Mode" error={errors.trainingMode}>
                    <select value={formData.trainingMode} onChange={e => setFormData({...formData, trainingMode: e.target.value})} className={inputClass(errors.trainingMode)}>
                      <option value="">Select mode</option>
                      <option value="On-Site">On-Site (Your Office)</option>
                      <option value="Virtual">Live Virtual</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </FormField>

                  <FormField label="Expected Start Date" error={errors.startDate}>
                    <select value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className={inputClass(errors.startDate)}>
                      <option value="">Select timeline</option>
                      <option value="ASAP">As soon as possible</option>
                      <option value="1-Month">Within 1 month</option>
                      <option value="3-Months">Within 3 months</option>
                      <option value="Planning">Just planning</option>
                    </select>
                  </FormField>

                  <div className="md:col-span-2">
                    <FormField label="Specific Requirements (Optional)">
                      <textarea 
                        value={formData.requirements} 
                        onChange={e => setFormData({...formData, requirements: e.target.value})} 
                        className={`${inputClass(null)} h-32 resize-none py-3`} 
                        placeholder="Tell us about specific skills, project contexts, or customization needs..."
                      />
                    </FormField>
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <button type="submit" className="w-full md:w-auto bg-primary-600 text-white font-bold h-12 px-8 rounded-btn hover:bg-primary-700 transition-colors shadow-lg">
                      Request Corporate Training Proposal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </main>
  );
};

// Sub-components
const ChevronRightIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const DeliveryModeCard = ({ icon: Icon, title, desc, useCases }) => (
  <div className="bg-slate-50 rounded-2xl p-8 border border-border hover:border-primary-300 transition-colors h-full flex flex-col">
    <div className="w-14 h-14 bg-white rounded-xl border border-border flex items-center justify-center mb-6 shadow-sm">
      <Icon className="w-7 h-7 text-primary-600" />
    </div>
    <h3 className="font-bold text-xl text-navy mb-3">{title}</h3>
    <p className="text-secondary leading-relaxed mb-6 flex-grow">{desc}</p>
    <div className="bg-white rounded-xl p-4 border border-border">
      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-3">Ideal For</span>
      <ul className="space-y-2">
        {useCases.map((uc, i) => (
          <li key={i} className="flex items-center gap-2 text-sm font-semibold text-navy">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> {uc}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const FormField = ({ label, error, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-navy">{label}</label>
    {children}
    {error && <span className="text-[13px] text-red-500 font-medium">{error}</span>}
  </div>
);

const inputClass = (error) => `w-full h-12 px-4 rounded-xl border bg-slate-50 text-sm font-medium text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors ${error ? 'border-red-300 focus:border-red-500' : 'border-border focus:border-primary-400'}`;

export default CorporateTraining;
