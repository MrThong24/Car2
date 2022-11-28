const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getCategories();
  res.send(categories);
});

const createCategory = catchAsync(async (req, res) => {
  const categories = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(categories);
});

module.exports = {
  getAllCategories,
  createCategory,
};
