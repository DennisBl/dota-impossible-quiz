import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './db.js';
import { Question } from './models/Question.js';
import { seedQuestions } from './data/questions.js';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dota_quiz';

async function run() {
  await connectDB(MONGODB_URI);
  await Question.deleteMany({});
  await Question.insertMany(seedQuestions);
  console.log(`[seed] inserted ${seedQuestions.length} questions`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('[seed] failed:', err.message);
  process.exit(1);
});
