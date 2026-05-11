const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const Ad = require('../models/Ad');
const { protect } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, `avatar-${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/users/:id — public profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    const ads = await Ad.find({ author: req.params.id, isActive: true }).limit(6);
    res.json({ user, ads });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/me — update profile
router.put('/me', protect, upload.single('avatar'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.avatar = `/uploads/${req.file.filename}`;
    if (req.body.preferences) updates.preferences = JSON.parse(req.body.preferences);
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select(
      '-password'
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/me/saved — saved ads
router.get('/me/saved', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'savedAds',
      populate: { path: 'author', select: 'name avatar' },
    });
    res.json(user.savedAds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;