export const COURSE_FILTERS = {
  categories: [
    { value: "all", label: "All Categories" },
    { value: "Software Development", label: "Software Development" },
    { value: "Data Science", label: "Data Science" },
    { value: "AI & Machine Learning", label: "AI & Machine Learning" },
    { value: "Cloud Computing", label: "Cloud Computing" },
    { value: "DevOps", label: "DevOps" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Software Testing", label: "Software Testing" },
    { value: "Database", label: "Database" },
    { value: "UI/UX Design", label: "UI/UX Design" },
  ],
  modes: [
    { value: "all", label: "All Modes" },
    { value: "Online", label: "Online" },
    { value: "Classroom", label: "Classroom" },
    { value: "Hybrid", label: "Hybrid" },
  ],
  levels: [
    { value: "all", label: "All Levels" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Beginner to Advanced", label: "Beginner to Advanced" },
  ],
  durations: [
    { value: "all", label: "Any Duration" },
    { value: "short", label: "Less than 2 Months" },
    { value: "medium", label: "2–4 Months" },
    { value: "long", label: "4–6 Months" },
    { value: "extended", label: "6+ Months" },
  ],
  sortOptions: [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "learners", label: "Most Learners" },
    { value: "duration-asc", label: "Shortest First" },
    { value: "duration-desc", label: "Longest First" },
  ],
};

export const BATCH_FILTERS = {
  modes: [
    { value: "all", label: "All Modes" },
    { value: "Online", label: "Online" },
    { value: "Classroom", label: "Classroom" },
    { value: "Hybrid", label: "Hybrid" },
  ],
  batchTypes: [
    { value: "all", label: "Weekday & Weekend" },
    { value: "Weekday", label: "Weekday" },
    { value: "Weekend", label: "Weekend" },
  ],
  timings: [
    { value: "all", label: "Any Time" },
    { value: "morning", label: "Morning (6–10 AM)" },
    { value: "afternoon", label: "Afternoon (10 AM–3 PM)" },
    { value: "evening", label: "Evening (3 PM onwards)" },
  ],
};
