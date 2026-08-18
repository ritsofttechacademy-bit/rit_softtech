import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import HeroSlide from "./HeroSlide";
import { ROUTES } from "../../constants/routes";

const slidesData = [
  {
    id: 1,
    badge: "India's Career-Focused IT Training Academy",
    headingPart1: "Build Skills That",
    headingHighlight: "Technology Companies",
    headingPart2: "Actually Hire For",
    description: "Master job-ready technology skills through instructor-led training, real-world projects and dedicated career support.",
    primaryAction: { label: "Explore Courses", url: ROUTES.COURSES },
    secondaryAction: { label: "View Upcoming Batches", url: ROUTES.BATCHES, action: "link" },
  },
  {
    id: 2,
    badge: "Artificial Intelligence • Machine Learning • GenAI",
    headingPart1: "Build Your Career",
    headingHighlight: "in the Age of AI",
    headingPart2: "",
    description: "Learn Artificial Intelligence, Machine Learning and Generative AI through practical projects and industry-focused training.",
    primaryAction: { label: "Explore AI Programs", url: `${ROUTES.COURSES}?category=Artificial%20Intelligence` },
    secondaryAction: { label: "Talk to an Advisor", action: "inquiry" },
  },
  {
    id: 3,
    badge: "Full Stack Career Programs",
    headingPart1: "Become a Job-Ready",
    headingHighlight: "Full Stack Developer",
    headingPart2: "",
    description: "Learn frontend, backend, databases, APIs, version control and cloud deployment in one structured career program.",
    primaryAction: { label: "Explore Full Stack", url: `${ROUTES.COURSES}?category=Software%20Development` },
    secondaryAction: { label: "View Curriculum", url: ROUTES.COURSES, action: "link" },
  }
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-slate-50 overflow-hidden min-h-[620px] max-h-[720px] h-[100vh] lg:h-[85vh]">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%230F172A\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
      
      <Swiper
        modules={[Autoplay, EffectFade, Keyboard, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={700}
        loop={true}
        keyboard={{ enabled: true }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full custom-hero-swiper"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <HeroSlide slide={slide} isActive={activeIndex === index} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Styles for Swiper Pagination positioned at bottom left of container */}
      <style>{`
        .custom-hero-swiper .swiper-pagination {
          text-align: left;
          padding-left: max(1rem, calc((100% - 1280px) / 2 + 2rem));
          bottom: 2rem !important;
        }
        @media (max-width: 1024px) {
          .custom-hero-swiper .swiper-pagination {
            text-align: center;
            padding-left: 0;
            bottom: 1.5rem !important;
          }
        }
        .custom-bullet {
          background: #94A3B8 !important;
          width: 8px !important;
          height: 8px !important;
          opacity: 0.5 !important;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active.custom-bullet {
          background: #006EDB !important;
          width: 32px !important;
          border-radius: 4px !important;
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
