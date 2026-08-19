import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String },
  slug: { type: String },
  designation: { type: String },
  experience: { type: String },
  specializations: [{ type: String }],
  courses: [{ type: String }],
  technologies: [{ type: String }],
  bio: { type: String },
  education: { type: String },
  previousCompanies: [{ type: String }],
  rating: { type: Number },
  students: { type: Number },
  linkedin: { type: String },
  achievements: [{ type: String }],
  imageColor: { type: String },
  initials: { type: String }
});

export default mongoose.model('Trainer', trainerSchema);
