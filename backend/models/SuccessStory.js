import mongoose from 'mongoose';

const successStorySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String },
  course: { type: String },
  previousStatus: { type: String },
  role: { type: String },
  company: { type: String },
  year: { type: String },
  image: { type: String },
  quote: { type: String },
  story: { type: String },
  careerPath: { type: String }
});

export default mongoose.model('SuccessStory', successStorySchema);
