import mongoose, { Document, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

// 子对象
export interface MailPerson {
  name?: string;
  address: string;
}

export interface MailAttachment {
  id: string;
  name: string;
  contentType: string;
  size: number;
  isInline?: boolean;
  contentId?: string;
  url?: string;
}

export interface MailMessageDocument extends Document {
  _id: string;
  threadId: string;
  from: MailPerson;
  to: MailPerson[];
  cc: MailPerson[];
  sentAt: Date;
  subject?: string;
  bodyPreview?: string;
  html?: string;
  attachments: MailAttachment[];
  contentHash?: string;
  flagged?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string; // virtual
}

const MailPersonSchema = new Schema<MailPerson>(
  {
    name: { type: String },
    address: { type: String, required: true },
  },
  { _id: false },
);

const MailAttachmentSchema = new Schema<MailAttachment>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    isInline: Boolean,
    contentId: String,
    url: String,
  },
  { _id: false },
);

const MailMessageSchema = new Schema<MailMessageDocument>(
  {
    _id: { type: String, required: true },
    threadId: { type: String, required: true, index: true },
    from: { type: MailPersonSchema, required: true },
    to: { type: [MailPersonSchema], required: true },
    cc: { type: [MailPersonSchema], required: true },
    sentAt: { type: Date, required: true, index: true },
    subject: String,
    bodyPreview: String,
    html: String,
    attachments: { type: [MailAttachmentSchema], required: true },
    contentHash: String,
    flagged: Boolean,
  },
  { timestamps: true },
);

MailMessageSchema.virtual("id").get(function (this: { _id?: any }) {
  return this._id?.toString();
});

MailMessageSchema.plugin(mongooseLeanVirtuals);
MailMessageSchema.index({ threadId: 1, sentAt: 1 });

const MailMessage =
  mongoose.models.MailMessage ||
  mongoose.model<MailMessageDocument>("MailMessage", MailMessageSchema);

export default MailMessage;
