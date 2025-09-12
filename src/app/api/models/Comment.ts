import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
const CommentSchema = new mongoose.Schema({
  threadId: { type: String, index: true },
  author: { id: String, name: String },
  type: { type: String, default: "comment" },
  content: String,
  status: { type: String, default: "published" },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
});
CommentSchema.virtual("id").get(function (this: { _id?: any }) {
  return this._id?.toString();
});
CommentSchema.plugin(mongooseLeanVirtuals);
CommentSchema.index({ threadId: 1, createdAt: -1 });
export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
