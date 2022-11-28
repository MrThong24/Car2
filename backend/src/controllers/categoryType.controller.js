const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryTypeService } = require('../services');

const getAllCategoryType = catchAsync(async (req, res) => {
  try {
    const categoryTypes = await categoryTypeService.getCategoryType();
    res.send(categoryTypes);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

const createCategoryType = catchAsync(async (req, res) => {
  const categoryTypes = await categoryTypeService.createCategoryType(req.body);
  res.status(httpStatus.CREATED).send(categoryTypes);
});

module.exports = {
  getAllCategoryType,
  createCategoryType,
};
