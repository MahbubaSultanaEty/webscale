// server/controllers/pageController.js
// Controller functions for Page CRUD operations

const mongoose = require('mongoose');
const Page = require('../models/Page');

// @desc    Get all pages
// @route   GET /api/pages
// @access  Public
const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find().sort({ updatedAt: -1 });
    return res.status(200).json({
      success: true,
      data: pages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching pages',
    });
  }
};

// @desc    Get single page by ID
// @route   GET /api/pages/:id
// @access  Public
const getPageById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid page ID',
      });
    }

    const page = await Page.findById(id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching page',
    });
  }
};

// @desc    Create a new page
// @route   POST /api/pages
// @access  Public
const createPage = async (req, res) => {
  try {
    const { name, sections } = req.body;

    const newPage = await Page.create({
      name: name || 'Untitled Page',
      sections: Array.isArray(sections) ? sections : [],
    });

    return res.status(201).json({
      success: true,
      data: newPage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while creating page',
    });
  }
};

// @desc    Update a page (sections and/or name)
// @route   PUT /api/pages/:id
// @access  Public
const updatePage = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid page ID',
      });
    }

    const updateFields = {};

    if (req.body.name !== undefined) {
      updateFields.name = req.body.name;
    }

    if (req.body.sections !== undefined) {
      if (!Array.isArray(req.body.sections)) {
        return res.status(400).json({
          success: false,
          message: 'Sections must be an array',
        });
      }
      updateFields.sections = req.body.sections;
    }

    const updatedPage = await Page.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedPage) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedPage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while updating page',
    });
  }
};

// @desc    Delete a page by ID
// @route   DELETE /api/pages/:id
// @access  Public
const deletePage = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid page ID',
      });
    }

    const deletedPage = await Page.findByIdAndDelete(id);

    if (!deletedPage) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Page deleted successfully',
      data: deletedPage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while deleting page',
    });
  }
};

module.exports = {
  getAllPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
};
