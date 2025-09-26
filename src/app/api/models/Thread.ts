import mongoose, { Document, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import { ThreadParticipantCore, ThreadDbCore } from "@/types/letter";

// Re-export types for backward compatibility
export type ThreadParticipant = ThreadParticipantCore;
export interface ThreadDocument extends Document {
  _id: string;
  subject?: string;
  participants: ThreadParticipantCore[];
  messageCount?: number;
  lastSyncAt?: Date;
  deltaLink?: string;
  contentHash?: string;
  tags?: string[];
  visibility: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

const ParticipantSchema = new Schema<ThreadParticipantCore>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
  },
  { _id: false },
);

const ThreadSchema = new Schema<ThreadDocument>(
  {
    _id: { type: String, required: true },
    subject: { type: String },
    participants: { type: [ParticipantSchema], required: true },
    messageCount: { type: Number },
    lastSyncAt: { type: Date },
    deltaLink: { type: String },
    contentHash: { type: String },
    tags: [{ type: String }],
    visibility: { type: String, default: "private" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

ThreadSchema.virtual("id").get(function (this: ThreadDocument) {
  return this._id?.toString();
});

ThreadSchema.plugin(mongooseLeanVirtuals);
ThreadSchema.index({ updatedAt: -1 });

const Thread =
  mongoose.models.Thread ||
  mongoose.model<ThreadDocument>("Thread", ThreadSchema);
export default Thread;
