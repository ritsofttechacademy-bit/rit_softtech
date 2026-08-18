import Hero from "../components/home/Hero";
import StatsSection from "../components/home/StatsSection";
import PopularCourses from "../components/home/PopularCourses";
import CourseCategories from "../components/home/CourseCategories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import UpcomingBatches from "../components/home/UpcomingBatches";
import ExpertTrainers from "../components/home/ExpertTrainers";
import PlacementSection from "../components/home/PlacementSection";
import BlogSection from "../components/home/BlogSection";
import FAQSection from "../components/home/FAQSection";
import CareerAdvisorCTA from "../components/home/CareerAdvisorCTA";

const Home = () => {
  return (
    <main>
      <Hero />
      <StatsSection />
      <PopularCourses />
      <CourseCategories />
      <WhyChooseUs />
      <UpcomingBatches />
      <PlacementSection />
      <ExpertTrainers />
      <BlogSection />
      <FAQSection />
      <CareerAdvisorCTA />
    </main>
  );
};

export default Home;
