import mongoose, { Document, Schema, Model } from "mongoose";

export interface IMangaEntry extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  mal_id: number;
  title: string;
  image: string;
  status: "reading" | "completed" | "on_hold" | "dropped" | "plan_to_read";
  score: number;
  progress: number; // chapters read
  totalChapters?: number;
  type: string;
}

const MangaEntrySchema: Schema<IMangaEntry> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mal_id: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String },
  status: {
    type: String,
    enum: ["reading", "completed", "on_hold", "dropped", "plan_to_read"],
    default: "plan_to_read",
  },
  score: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  totalChapters: { type: Number },
  type: { type: String },
});

const MangaEntry: Model<IMangaEntry> = mongoose.models.MangaEntry || mongoose.model<IMangaEntry>("MangaEntry", MangaEntrySchema);

export default MangaEntry;