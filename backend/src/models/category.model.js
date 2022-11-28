const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brands: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categoryType',
    },
  ],
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
