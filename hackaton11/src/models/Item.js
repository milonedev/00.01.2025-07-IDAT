import mongoose from 'mongoose';
import { v4 as uuidv4 } from "uuid";

const itemSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    dateCompleted: { type: Date, required: false },
  },
  { timestamps: true },
);

export const Item = mongoose.model('Item', itemSchema);
