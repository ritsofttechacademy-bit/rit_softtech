export const ROUTES = {
  HOME: "/",
  COURSES: "/courses",
  COURSE_DETAIL: "/courses/:slug",
  BATCHES: "/batches",
  PLACEMENTS: "/placements",
  CORPORATE_TRAINING: "/corporate-training",
  ABOUT: "/about",
  TRAINERS: "/trainers",
  STUDENT_REVIEWS: "/student-reviews",
  SUCCESS_STORIES: "/success-stories",
  BLOG: "/blog",
  BLOG_DETAIL: "/blog/:slug",
  FAQ: "/faq",
  CONTACT: "/contact",
  ENQUIRY: "/enquiry",
  COURSE_FINDER: "/course-finder",
  COMPARE_COURSES: "/compare-courses",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS: "/terms",
  REFUND_POLICY: "/refund-policy",
  NOT_FOUND: "*",
};

// Helper to build course URL
export const courseUrl = (slug) => `/courses/${slug}`;
export const blogUrl = (slug) => `/blog/${slug}`;
