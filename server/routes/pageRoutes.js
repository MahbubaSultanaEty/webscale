// server/routes/pageRoutes.js
// Routes for /api/pages endpoints

const express = require('express');
const router = express.Router();
const {
  getAllPages,
  getPageById,
  createPage,
  updatePage,
  deletePage,
} = require('../controllers/pageController');

// /api/pages
router
  .route('/')
  .get(getAllPages)
  .post(createPage);

// /api/pages/:id
router
  .route('/:id')
  .get(getPageById)
  .put(updatePage)
  .delete(deletePage);

module.exports = router;
