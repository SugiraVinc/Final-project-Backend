import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'testimony', // Reference to your content model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to your user model
    required: true,
  },
  like: {
    type: Number,
    default: 1, // Default value for a "like"
  },
}, { timestamps: true });

// Do not add any unique index here
const Like = mongoose.model('Like', likeSchema);
export default Like;
