import { MailAttachmentCore, MailPersonCore } from "@/types/letter";
import mongoose, { Document, Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

// Re-export types for backward compatibility
export type MailPerson = MailPersonCore;
export type MailAttachment = MailAttachmentCore;
export interface MailMessageDocument extends Document {
  _id: string;
  threadId: string;
  from: MailPersonCore;
  to: MailPersonCore[];
  cc: MailPersonCore[];
  sentAt: Date;
  subject?: string;
  bodyPreview?: string;
  html?: string;
  attachments: MailAttachmentCore[];
  contentHash?: string;
  flagged?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string; // virtual
}

const MailPersonSchema = new Schema<MailPersonCore>(
  {
    name: { type: String },
    address: { type: String, required: true },
  },
  { _id: false },
);

const MailAttachmentSchema = new Schema<MailAttachmentCore>(
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
