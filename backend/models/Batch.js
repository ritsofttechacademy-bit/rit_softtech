import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  courseId: { type: Number },
  courseSlug: { type: String },
  courseName: { type: String },
  startDate: { type: String },
  time: { type: String },
  batchType: { type: String },
  mode: { type: String },
  trainer: { type: String },
  trainerId: { type: Number },
  seats: { type: Number },
  seatsLeft: { type: Number },
  status: { type: String },
  duration: { type: String },
  fees: { type: String },
  highlights: [{ type: String }]
});

export default mongoose.model('Batch', batchSchema);
