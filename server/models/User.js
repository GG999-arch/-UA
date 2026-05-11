const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '', maxlength: 500 },
    age: { type: Number, min: 18, max: 100 },
    occupation: { type: String, default: '' },
    city: { type: String, default: '' },
    preferences: {
      smoking: { type: Boolean, default: false },
      pets: { type: Boolean, default: false },
      earlyBird: { type: Boolean, default: false },
      nightOwl: { type: Boolean, default: false },
      workFromHome: { type: Boolean, default: false },
    },
    isVerified: { type: Boolean, default: false },
    savedAds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ad' }],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);