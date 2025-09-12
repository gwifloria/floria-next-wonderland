import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
const ThreadSchema = new mongoose.Schema(
  {
    _id: String,
    subject: String,
    participants: [{ name: String, address: String }],
    firstAt: Date,
    updatedAt: Date,
    messageCount: Number,
    lastSyncAt: Date,
    deltaLink: String,
    contentHash: String,
    tags: [String],
    visibility: { type: String, default: "private" },
  },
  { timestamps: false },
);
ThreadSchema.virtual("id").get(function (this: { _id?: any }) {
  return this._id?.toString();
});
ThreadSchema.plugin(mongooseLeanVirtuals);
ThreadSchema.index({ updatedAt: -1 });
export default mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);
