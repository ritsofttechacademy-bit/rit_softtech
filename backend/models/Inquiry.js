import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String },
  message: { type: String },
  type: { type: String, default: 'general' }, // 'general' or 'corporate'
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Inquiry', inquirySchema);
