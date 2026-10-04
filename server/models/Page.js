// server/models/Page.js
// Mongoose Page model representing a complete WebScale page schema

const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Untitled Page',
      trim: true,
    },
    // The sections array stores the entire visual builder tree (sections, elements, styles, content)
    // Using an array allows storing dynamic, flexible section/element structures
    sections: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt dates
  }
);

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
