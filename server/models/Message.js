const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    adRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad', default: null },
    content: { type: String, required: true, maxlength: 2000 },
    read: { type: Boolean, default: false },
    readAt: { type: Date, default: null },
  },
  { timestamps: true }
);

messageSchema.index({ sender: 1, receiver: 1 });
messageSchema.index({ receiver: 1, read: 1 });

// Virtual conversation ID (sorted pair of user IDs)
messageSchema.virtual('conversationId').get(function () {
  return [this.sender.toString(), this.receiver.toString()].sort().join('_');
});

module.exports = mongoose.model('Message', messageSchema);