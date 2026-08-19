import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  slug: { type: String },
  title: { type: String },
  shortTitle: { type: String },
  category: { type: String },
  categorySlug: { type: String },
  author: { type: String },
  authorRole: { type: String },
  publishedDate: { type: String },
  readTime: { type: String },
  featured: { type: Boolean },
  tags: [{ type: String }],
  excerpt: { type: String },
  content: { type: String },
  heroColor: { type: String }
});

export default mongoose.model('Blog', blogSchema);
