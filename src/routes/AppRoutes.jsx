import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { lazy, Suspense } from "react";
import PublicLayout from "../layouts/PublicLayout";
import LegalLayout from "../layouts/LegalLayout";

// Lazy load pages for better performance
const Home = lazy(() => import("../pages/Home"));
const Courses = lazy(() => import("../pages/Courses"));
const CourseDetail = lazy(() => import("../pages/CourseDetail"));
const Batches = lazy(() => import("../pages/Batches"));
const Placements = lazy(() => import("../pages/Placements"));
const CorporateTraining = lazy(() => import("../pages/CorporateTraining"));
const About = lazy(() => import("../pages/About"));
const Trainers = lazy(() => import("../pages/Trainers"));
const StudentReviews = lazy(() => import("../pages/StudentReviews"));
const SuccessStories = lazy(() => import("../pages/SuccessStories"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const FAQ = lazy(() => import("../pages/FAQ"));
const Contact = lazy(() => import("../pages/Contact"));
const Enquiry = lazy(() => import("../pages/Enquiry"));
const CourseFinder = lazy(() => import("../pages/CourseFinder"));
const CompareCourses = lazy(() => import("../pages/CompareCourses"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const Terms = lazy(() => import("../pages/Terms"));
const RefundPolicy = lazy(() => import("../pages/RefundPolicy"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Fallback loader
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.COURSES} element={<Courses />} />
          <Route path={ROUTES.COURSE_DETAIL} element={<CourseDetail />} />
          <Route path={ROUTES.BATCHES} element={<Batches />} />
          <Route path={ROUTES.PLACEMENTS} element={<Placements />} />
          <Route path={ROUTES.CORPORATE_TRAINING} element={<CorporateTraining />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.TRAINERS} element={<Trainers />} />
          <Route path={ROUTES.STUDENT_REVIEWS} element={<StudentReviews />} />
          <Route path={ROUTES.SUCCESS_STORIES} element={<SuccessStories />} />
          <Route path={ROUTES.BLOG} element={<Blog />} />
          <Route path={ROUTES.BLOG_DETAIL} element={<BlogDetail />} />
          <Route path={ROUTES.FAQ} element={<FAQ />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.ENQUIRY} element={<Enquiry />} />
          <Route path={ROUTES.COURSE_FINDER} element={<CourseFinder />} />
          <Route path={ROUTES.COMPARE_COURSES} element={<CompareCourses />} />
          <Route path="*" element={<NotFound />} />
          
          {/* Legal Pages nested within LegalLayout */}
          <Route element={<LegalLayout />}>
            <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
            <Route path={ROUTES.TERMS} element={<Terms />} />
            <Route path={ROUTES.REFUND_POLICY} element={<RefundPolicy />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
