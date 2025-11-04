import mongoose, { Document, Schema } from 'mongoose';

export interface IMangaEntry extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  mediaId: number;
  title: string;
  image?: string;
  status: 'Reading' | 'Completed' | 'Plan to Read' | 'Dropped' | 'On Hold';
  progress: number;
  total: number;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const MangaEntrySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  mediaId: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String },
  status: {
    type: String,
    enum: ['Reading', 'Completed', 'Plan to Read', 'Dropped', 'On Hold'],
    required: true,
  },
  progress: { type: Number, default: 0 },
  total: { type: Number },
  rating: { type: Number, min: 1, max: 10 },
}, {
  timestamps: true,
});

export default mongoose.models.MangaEntry || mongoose.model<IMangaEntry>('MangaEntry', MangaEntrySchema);