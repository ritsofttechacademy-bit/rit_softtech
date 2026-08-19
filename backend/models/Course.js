import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortTitle: { type: String },
  category: { type: String },
  categorySlug: { type: String },
  description: { type: String },
  duration: { type: String },
  level: { type: String },
  mode: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  learners: { type: Number, default: 0 },
  popular: { type: Boolean, default: false },
  bestseller: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  skills: [{ type: String }],
  tools: [{ type: String }],
  jobRoles: [{ type: String }],
  salaryRange: {
    entry: { type: String },
    mid: { type: String },
    senior: { type: String }
  },
  projectCount: { type: Number, default: 0 },
  moduleCount: { type: Number, default: 0 },
  icon: { type: String },
  color: { type: String },
  image: { type: String },
  curriculum: [{
    module: { type: Number },
    title: { type: String },
    lessons: { type: Number },
    duration: { type: String },
    topics: [{ type: String }]
  }]
});

export default mongoose.model('Course', courseSchema);
