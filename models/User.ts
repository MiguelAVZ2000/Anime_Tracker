import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Interface for the unlocked achievement subdocument
export interface IUnlockedAchievement extends Document {
  achievementId: string;
  unlockedAt: Date;
}

// Interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional because it won't always be selected
  image?: string;
  unlockedAchievements: IUnlockedAchievement[];
  createdAt: Date;
  updatedAt: Date;
}

const UnlockedAchievementSchema: Schema = new Schema({
  achievementId: { type: String, required: true },
  unlockedAt: { type: Date, default: Date.now },
});

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    select: false, // Do not return password by default
  },
  image: {
    type: String,
  },
  unlockedAchievements: [UnlockedAchievementSchema],
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// The 'mongoose.models.User' check is to prevent redefining the model in Next.js dev environment (hot-reloading)
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);