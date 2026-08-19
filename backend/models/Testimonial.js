import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String },
  slug: { type: String },
  course: { type: String },
  courseSlug: { type: String },
  previousStatus: { type: String },
  company: { type: String },
  role: { type: String },
  package: { type: String },
  batch: { type: String },
  rating: { type: Number },
  review: { type: String },
  location: { type: String },
  initials: { type: String },
  imageColor: { type: String },
  featured: { type: Boolean }
});

export default mongoose.model('Testimonial', testimonialSchema);
