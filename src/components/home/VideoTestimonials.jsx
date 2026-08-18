import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import { videoTestimonials } from "../../data/videoTestimonials";

const VideoTestimonialCard = ({ testimonial, onClick, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-[300px] md:w-auto shrink-0 snap-center"
    >
      {/* Thumbnail Area (16:9 ratio approximately) */}
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        <img
          src={testimonial.thumbnail}
          alt={`Thumbnail of ${testimonial.name}'s testimonial`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Subtle Dark Gradient at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10" />
        
        {/* Play Button */}
        <button
          onClick={() => onClick(testimonial)}
          aria-label={`Play testimonial from ${testimonial.name}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-600 shadow-[0_4px_20px_rgb(0,0,0,0.15)] group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 transition-all z-20"
        >
          <Play className="w-6 h-6 ml-1" />
        </button>

        {/* Duration Badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded z-20">
          {testimonial.duration}
        </div>

        {/* Student Info (over gradient) */}
        <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
          <h4 className="font-bold text-lg leading-tight">{testimonial.name}</h4>
          <p className="text-xs text-slate-200 mt-1 line-clamp-1">{testimonial.course}</p>
        </div>
      </div>

      {/* Outcome Banner */}
      <div className="bg-navy px-4 py-3 flex items-center justify-between">
        <div>
          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Now Working As</span>
          <span className="block text-sm text-white font-bold">{testimonial.role}</span>
        </div>
        <div className="text-right">
          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">At</span>
          <span className="block text-sm text-white font-bold">{testimonial.company}</span>
        </div>
      </div>
    </motion.div>
  );
};

const VideoTestimonialModal = ({ testimonial, open, onClose }) => {
  if (!open || !testimonial) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-navy/90 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Area */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {testimonial.videoUrl ? (
                // If real video url exists
                <iframe
                  className="w-full h-full"
                  src={testimonial.videoUrl}
                  title={`Testimonial from ${testimonial.name}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                // Demo State
                <div className="text-center p-6 flex flex-col items-center">
                  <Play className="w-16 h-16 text-white/20 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Video testimonial preview</h3>
                  <p className="text-slate-400 max-w-sm text-sm">
                    Demo video content for {testimonial.name} will be connected here.
                  </p>
                </div>
              )}
            </div>
            
            {/* Video Meta */}
            <div className="bg-slate-900 p-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold">{testimonial.name}</h4>
                <p className="text-sm text-slate-400">{testimonial.course}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-primary-400">{testimonial.role}</span>
                <span className="text-sm text-slate-400 block">@ {testimonial.company}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="section-pad bg-white border-t border-border/50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionHeader
            tag="LEARNER EXPERIENCES"
            title="Hear It Directly From Our Learners"
            subtitle="Watch learners share their training experience, project journey, interview preparation and career progression."
            align="center"
            className="mb-0"
          />
        </div>

        {/* Horizontal scroll on mobile, Grid on desktop */}
        <div className="flex overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 snap-x md:snap-none -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
          {videoTestimonials.map((testimonial, index) => (
            <VideoTestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              onClick={setSelectedVideo}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Container>

      <VideoTestimonialModal
        testimonial={selectedVideo}
        open={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};

export default VideoTestimonials;
