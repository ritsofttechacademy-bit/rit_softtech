import { useState } from "react";
import { ArrowRight, MoveDown, Quote, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import { testimonials } from "../../data/testimonials";

const SuccessStoryCard = ({ story, onClick }) => {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 md:p-8 flex flex-col h-full hover:border-primary-300 hover:shadow-xl transition-all duration-300 group">
      {/* Student Meta */}
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
          style={{ backgroundColor: story.imageColor || "#006EDB" }}
        >
          {story.initials}
        </div>
        <div>
          <h4 className="font-bold text-navy text-lg leading-tight">{story.name}</h4>
          <p className="text-xs text-secondary mt-0.5 line-clamp-1">{story.course}</p>
        </div>
      </div>

      {/* Before / After Journey */}
      <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 flex-grow flex flex-col justify-center">
        <div className="text-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">BEFORE</span>
          <span className="text-sm font-semibold text-slate-700">{story.previousStatus}</span>
        </div>
        
        <div className="flex justify-center my-3 text-slate-300">
          <MoveDown className="w-5 h-5" />
        </div>
        
        <div className="text-center">
          <span className="text-[10px] font-black text-primary-500 uppercase tracking-wider mb-1 block">AFTER</span>
          <span className="text-sm font-bold text-navy leading-tight block">{story.role}</span>
          <span className="text-xs font-semibold text-slate-500">{story.company}</span>
        </div>
      </div>

      {/* Short Quote & CTA */}
      <div className="mt-auto">
        <div className="relative mb-6">
          <Quote className="absolute -top-2 -left-2 w-6 h-6 text-primary-100 -z-10" />
          <p className="text-sm text-secondary italic line-clamp-2 pl-4">
            "{story.review}"
          </p>
        </div>
        
        <button 
          onClick={() => onClick(story)}
          className="w-full inline-flex items-center justify-center gap-2 text-sm font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 py-2.5 rounded-lg transition-colors"
        >
          Read Full Story <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const SuccessStoryModal = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-navy/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-auto flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-border flex justify-between items-start bg-slate-50">
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0"
                style={{ backgroundColor: story.imageColor || "#006EDB" }}
              >
                {story.initials}
              </div>
              <div>
                <h4 className="font-bold text-navy text-xl leading-tight">{story.name}</h4>
                <p className="text-sm text-secondary mt-1">{story.course}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-slate-500 hover:text-navy hover:bg-slate-100 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body - scrollable if needed */}
          <div className="p-6 md:p-8 overflow-y-auto">
            {/* The Journey */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-slate-50 p-6 rounded-xl border border-border mb-8">
              <div className="text-center md:text-left flex-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">BACKGROUND</span>
                <span className="text-sm font-semibold text-slate-700">{story.previousStatus}</span>
              </div>
              
              <div className="text-slate-300 md:-rotate-90 hidden md:block">
                <MoveDown className="w-6 h-6" />
              </div>
              
              <div className="text-center md:text-left flex-1">
                <span className="text-[10px] font-black text-primary-500 uppercase tracking-wider mb-1 block">CURRENT ROLE</span>
                <span className="text-base font-bold text-navy leading-tight block">{story.role}</span>
                <span className="text-sm font-semibold text-slate-500 block">{story.company}</span>
                <span className="inline-block mt-2 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded border border-emerald-200">{story.package}</span>
              </div>
            </div>

            {/* Testimonial */}
            <div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Learning Experience</h5>
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary-100 -z-10" />
                <p className="text-slate-700 leading-relaxed pl-6 relative z-10 italic">
                  "{story.review}"
                </p>
              </div>
            </div>
          </div>
          
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const StudentSuccessStories = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <section className="section-pad bg-slate-50 overflow-hidden border-t border-border/50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionHeader
            tag="SUCCESS STORIES"
            title="Real Learning. Real Career Progress."
            subtitle="Discover how learners transformed their skills through structured training, practical projects and career preparation."
            align="center"
            className="mb-0"
          />
        </div>

        <div className="relative">
          {/* Custom Navigation Targets for Swiper */}
          <div className="swiper-button-prev-custom absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-navy hover:text-primary-600 hover:border-primary-300 transition-colors cursor-pointer z-10 hidden sm:flex">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-navy hover:text-primary-600 hover:border-primary-300 transition-colors cursor-pointer z-10 hidden sm:flex">
            <ArrowRight className="w-5 h-5" />
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            spaceBetween={16}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              1024: { slidesPerView: 2.5, spaceBetween: 24 },
              1280: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="!pb-14 px-1"
          >
            {testimonials.map((story) => (
              <SwiperSlide key={story.id} className="h-auto">
                <SuccessStoryCard story={story} onClick={setSelectedStory} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      {/* Modal Overlay */}
      {selectedStory && (
        <SuccessStoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}
    </section>
  );
};

export default StudentSuccessStories;
