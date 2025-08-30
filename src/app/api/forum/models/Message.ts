import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document<string> {
  content: string;
  createdAt: Date;
  deletedAt?: Date;
}

const MessageSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
  },
});

// 防止重复编译模型
const Message =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
