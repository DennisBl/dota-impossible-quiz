import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  kind: {
    type: String,
    required: true,
    enum: ['standard', 'glyph', 'sequence', 'period', 'roshan'],
  },
  prompt: { type: String, required: true },
  hint: { type: String, default: '' },
  answers: { type: [String], default: [] },
  // standard questions
  correctIndex: { type: Number, default: null },
  // sequence questions
  correctSequence: { type: [String], default: [] },
  // freeform tuning (glyph timing, roshan start index, ...)
  config: { type: Object, default: {} },
});

export const Question = mongoose.model('Question', questionSchema);
