const { Category } = require('../models');

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<product>}
 */
const getCategories = async () => {
  return Category.find().populate('brands');
};

const createCategory = async (body) => {
  const category = await Category.create(body);
  return category;
};

module.exports = {
  getCategories,
  createCategory,
};
