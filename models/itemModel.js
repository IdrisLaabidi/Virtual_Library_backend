const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  collection: { type: String, required: true },
  itemType: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  edition: { type: String, required: true },
  publicationDate: { type: String, required: true },
  isbn10: { type: String, required: true },
  isbn13: { type: String, required: true },
  pages: { type: Number, required: true },
  price: { type: Number, required: true }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
