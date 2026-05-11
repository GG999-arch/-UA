const express = require('express');
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/messages/conversations — list all conversation partners
router.get('/conversations', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'name avatar')
      .populate('receiver', 'name avatar');

    // Deduplicate by conversation partner
    const seen = new Set();
    const conversations = [];
    for (const msg of messages) {
      const partner =
        msg.sender._id.toString() === userId.toString() ? msg.receiver : msg.sender;
      const pid = partner._id.toString();
      if (!seen.has(pid)) {
        seen.add(pid);
        const unread = await Message.countDocuments({
          sender: partner._id,
          receiver: userId,
          read: false,
        });
        conversations.push({ partner, lastMessage: msg, unread });
      }
    }
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/messages/:userId — conversation with specific user
router.get('/:userId', protect, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate('sender', 'name avatar')
      .populate('receiver', 'name avatar');

    // Mark as read
    await Message.updateMany(
      { sender: req.params.userId, receiver: req.user._id, read: false },
      { read: true, readAt: new Date() }
    );

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/messages — send message
router.post('/', protect, async (req, res) => {
  try {
    const { receiverId, content, adRef } = req.body;
    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
      adRef: adRef || null,
    });
    await message.populate('sender', 'name avatar');
    await message.populate('receiver', 'name avatar');
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;