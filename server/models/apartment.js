const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  rooms: { type: Number, required: true },
  size: { type: Number, required: true },
  floor: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }], // רשימה של מאפיינים
  furniture: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  images: { type: String, required: true }
    
});

// יצירת המודל
//module.exports = mongoose.model('Apartment', apartmentSchema);
module.exports = mongoose.model('Apartment', apartmentSchema, 'apartment');

