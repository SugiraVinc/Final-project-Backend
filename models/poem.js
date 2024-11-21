import mongoose from 'mongoose';

const { Schema } = mongoose;

const poemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    room: {
      type: String,
      required: [true, 'Room is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Poem = mongoose.model('Poem', poemSchema);

export default Poem;
