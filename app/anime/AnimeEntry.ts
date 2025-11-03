import mongoose, { Document, Schema, Model } from "mongoose";

export interface IAnimeEntry extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  mal_id: number;
  title: string;
  image: string;
  status: "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch";
  score: number;
  progress: number; // episodes watched
  totalEpisodes?: number;
  type: string;
}

const AnimeEntrySchema: Schema<IAnimeEntry> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mal_id: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String },
  status: {
    type: String,
    enum: ["watching", "completed", "on_hold", "dropped", "plan_to_watch"],
    default: "plan_to_watch",
  },
  score: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  totalEpisodes: { type: Number },
  type: { type: String },
});

const AnimeEntry: Model<IAnimeEntry> = mongoose.models.AnimeEntry || mongoose.model<IAnimeEntry>("AnimeEntry", AnimeEntrySchema);

export default AnimeEntry;