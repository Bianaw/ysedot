const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  rooms: { type: Number, required: true },
  size: { type: Number, required: true },
  floor: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: [String], required: true },
  furniture: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  galleryFolder: { type: String, required: true },
  imageCount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("apartment", apartmentSchema);
