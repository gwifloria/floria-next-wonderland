import { AuthorCore, CommentDbCore } from "@/types/letter";
import mongoose, { Document, Model, Schema } from "mongoose";

// Re-export types for backward compatibility
export interface IComment extends Document, CommentDbCore {}

const AuthorSchema = new Schema<AuthorCore>({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
});

const CommentSchema = new Schema<IComment>(
  {
    threadId: { type: String, required: true, index: true, trim: true },
    author: { type: AuthorSchema, required: true },
    type: { type: String, default: "comment", trim: true },
    content: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

// 可选虚拟 id
CommentSchema.virtual("id").get(function (this: { _id?: any }) {
  return this._id?.toString();
});

// 索引
CommentSchema.index({ threadId: 1, createdAt: -1 });

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
