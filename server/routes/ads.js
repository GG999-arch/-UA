const express = require('express');
const multer = require('multer');
const path = require('path');
const Ad = require('../models/Ad');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// GET /api/ads — list with filters
router.get('/', async (req, res) => {
  try {
    const { city, minPrice, maxPrice, type, page = 1, limit = 12 } = req.query;
    const filter = { isActive: true };
    if (city) filter.city = new RegExp(city, 'i');
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const total = await Ad.countDocuments(filter);
    const ads = await Ad.find(filter)
      .populate('author', 'name avatar isVerified')
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ ads, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/ads/:id
router.get('/:id', async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name avatar bio isVerified city');
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ads — create
router.post('/', protect, upload.array('photos', 10), async (req, res) => {
  try {
    const photoUrls = (req.files || []).map((f) => `/uploads/${f.filename}`);
    const adData = {
      ...req.body,
      author: req.user._id,
      photos: photoUrls,
      amenities: req.body.amenities ? JSON.parse(req.body.amenities) : {},
    };
    const ad = await Ad.create(adData);
    res.status(201).json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/ads/:id
router.put('/:id', protect, upload.array('photos', 10), async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    if (ad.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const updates = { ...req.body };
    if (req.files?.length) updates.photos = req.files.map((f) => `/uploads/${f.filename}`);
    if (req.body.amenities) updates.amenities = JSON.parse(req.body.amenities);

    const updated = await Ad.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/ads/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    if (ad.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    await ad.deleteOne();
    res.json({ message: 'Ad removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/ads/:id/save
router.post('/:id/save', protect, async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    const idx = ad.savedBy.indexOf(req.user._id);
    if (idx === -1) ad.savedBy.push(req.user._id);
    else ad.savedBy.splice(idx, 1);
    await ad.save();
    res.json({ saved: idx === -1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;