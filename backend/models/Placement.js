import mongoose from 'mongoose';

const placementSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String },
  course: { type: String },
  courseSlug: { type: String },
  company: { type: String },
  role: { type: String },
  package: { type: String },
  batch: { type: String },
  location: { type: String },
  initials: { type: String },
  imageColor: { type: String },
});

export default mongoose.model('Placement', placementSchema);
