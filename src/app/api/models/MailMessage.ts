import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
const MailMessageSchema = new mongoose.Schema(
  {
    _id: String,
    threadId: { type: String, index: true },
    from: { name: String, address: String },
    to: [{ name: String, address: String }],
    cc: [{ name: String, address: String }],
    sentAt: { type: Date, index: true },
    subject: String,
    bodyPreview: String,
    html: String,
    attachments: [
      {
        id: String,
        name: String,
        contentType: String,
        size: Number,
        isInline: Boolean,
        contentId: String,
        url: String,
      },
    ],
    contentHash: String,
    flagged: Boolean,
  },
  { timestamps: false },
);
MailMessageSchema.virtual("id").get(function (this: { _id?: any }) {
  return this._id?.toString();
});
MailMessageSchema.plugin(mongooseLeanVirtuals);
MailMessageSchema.index({ threadId: 1, sentAt: 1 });
export default mongoose.models.MailMessage ||
  mongoose.model("MailMessage", MailMessageSchema);
