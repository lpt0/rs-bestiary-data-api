import { Document, Schema } from "mongoose";

export const MonsterLookupSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: Number, required: true }
  },
  {
    id: false,
    timestamps: false
  }
);