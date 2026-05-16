import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 24 },
    reached: { type: Number, required: true },
    total: { type: Number, required: true },
    livesLeft: { type: Number, default: 0 },
    skipsUsed: { type: Number, default: 0 },
    won: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Score = mongoose.model('Score', scoreSchema);
