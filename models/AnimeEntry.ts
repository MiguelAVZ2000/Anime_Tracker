import mongoose, { Document, Schema } from 'mongoose';

export interface IAnimeEntry extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  mediaId: number;
  title: string;
  image?: string;
  status: 'Watching' | 'Completed' | 'Plan to Watch' | 'Dropped' | 'On Hold';
  progress: number;
  total: number;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const AnimeEntrySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  mediaId: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String },
  status: {
    type: String,
    enum: ['Watching', 'Completed', 'Plan to Watch', 'Dropped', 'On Hold'],
    required: true,
  },
  progress: { type: Number, default: 0 },
  total: { type: Number },
  rating: { type: Number, min: 1, max: 10 },
}, {
  timestamps: true,
});

export default mongoose.models.AnimeEntry || mongoose.model<IAnimeEntry>('AnimeEntry', AnimeEntrySchema);