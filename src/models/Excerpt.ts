import mongoose, { Schema, models, model } from "mongoose";

const ExcerptSchema = new Schema({
  bookName: { type: String, required: true },
  content: { type: String, required: true },
});

export default models.Excerpt || model("Excerpt", ExcerptSchema);
