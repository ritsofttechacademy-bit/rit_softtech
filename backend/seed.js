import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import Course from './models/Course.js';
import Batch from './models/Batch.js';
import Placement from './models/Placement.js';
import Trainer from './models/Trainer.js';
import Testimonial from './models/Testimonial.js';
import SuccessStory from './models/SuccessStory.js';
import Blog from './models/Blog.js';

// Setup env variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

// Import data
import { courses } from '../src/data/courses.js';
import { batches } from '../src/data/batches.js';
import { placements } from '../src/data/placements.js';
import { trainers } from '../src/data/trainers.js';
import { testimonials } from '../src/data/testimonials.js';
import { successStories } from '../src/data/successStories.js';
import { blogs } from '../src/data/blogs.js';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing old data...');
    await Promise.all([
      Course.deleteMany(),
      Batch.deleteMany(),
      Placement.deleteMany(),
      Trainer.deleteMany(),
      Testimonial.deleteMany(),
      SuccessStory.deleteMany(),
      Blog.deleteMany()
    ]);

    // Insert new data
    console.log('Inserting new data...');
    await Promise.all([
      Course.insertMany(courses),
      Batch.insertMany(batches),
      Placement.insertMany(placements),
      Trainer.insertMany(trainers),
      Testimonial.insertMany(testimonials),
      SuccessStory.insertMany(successStories),
      Blog.insertMany(blogs)
    ]);

    console.log('All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();
