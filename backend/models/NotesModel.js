const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 500, // limit the title length to about 100 words (500 characters is a good estimate)
    },
    content: {
      type: String,
      required: true,
      maxlength: 3000, // limit the content to about 500 words (3000 characters is a reasonable estimate)
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you're linking to a 'User' model
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
