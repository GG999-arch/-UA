const mongoose = require('mongoose');

const adSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['room', 'apartment', 'studio', 'seeking'],
      required: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, maxlength: 2000 },
    price: { type: Number, required: true, min: 0 },
    city: { type: String, required: true },
    district: { type: String, default: '' },
    address: { type: String, default: '' },
    photos: [{ type: String }],
    amenities: {
      wifi: { type: Boolean, default: false },
      kitchen: { type: Boolean, default: false },
      bathroom: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
      gym: { type: Boolean, default: false },
      pets: { type: Boolean, default: false },
      tv: { type: Boolean, default: false },
      cleaning: { type: Boolean, default: false },
    },
    roommates: { type: Number, default: 0 },
    availableFrom: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isUrgent: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

adSchema.index({ city: 1, price: 1, type: 1 });
adSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Ad', adSchema);