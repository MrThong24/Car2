const { CategoryType } = require('../models');

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<product>}
 */
const getCategoryType = async () => {
  const categoryType = await CategoryType.find();
  return categoryType;
};

const createCategoryType = async (typeBody) => {
  const categoryType = await CategoryType.create(typeBody);
  return categoryType;
};

module.exports = {
  getCategoryType,
  createCategoryType,
};
