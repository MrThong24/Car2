const mongoose = require('mongoose');
const { Product } = require('../models');
// const ApiError = require('../utils/ApiError');
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<product>}
 */

const getProducts = async (query) => {
  const filter = {};
  if (query.search) {
    const { search } = query;
    const reqSearch = new RegExp(`${search}`);
    filter.name = { $regex: reqSearch, $options: 'i' };
  }
  if (query.category) {
    filter.category = query.category;
  }
  if (query.categoryType) {
    filter.categoryType = query.categoryType;
  }
  const count = await Product.countDocuments(filter);
  const page = query.page * 1 || 1;
  const limit = query.limit * 1 || 6; // limit
  const skip = limit * (page - 1);
  const products = await Product.find(filter)
    .limit(limit)
    .skip(skip)
    .populate({ path: 'category' })
    .populate({ path: 'categoryType' })
    .sort({ createdAt: -1 });
  return { products, count };
};

const createProduct = async (body, file) => {
  const objectValue = { ...body, image: file };
  const product = await Product.create(objectValue);
  return product;
};

const getProductById = async (id) => {
  const productById = await Product.findById(id).populate({ path: 'category' }).populate({ path: 'categoryType' });
  return productById;
};

const deleteProductById = async (id) => {
  const product = await Product.deleteOne({ _id: id });
  return product;
};
const getProductSuggest = async (params) => {
  const listSuggest = await Product.find({
    category: params.category,
    _id: { $ne: params.id }, // so sánh các giá trị không bằng giá trị được chỉ định
  }).limit(3);

  return listSuggest;
};

// edit product form
const editProductById = async (body, files, id, image) => {
  const product = await getProductById(id);
  const sizeSlider = product.slider?.length;
  const newSlider = product.slider;
  const newValues = { ...body };
  if (sizeSlider === 0 && files) {
    Array(...newValues?.position)?.forEach((element, index) => {
      newSlider.push({
        position: body.position[index],
        sliderImage: files[index].filename,
      });
    });

    if (!!newValues.noposition) {
      Array(...newValues?.noposition)?.forEach((element, index) => {
        newSlider.push({
          position: body.noposition[index],
          sliderImage: '',
        });
      });
    }
    // sort by asc position
    newSlider.sort((a, b) => Number(a.position) - Number(b.position));
    newValues.slider = newSlider;
  }

  if (newValues?.position && sizeSlider > 0 && files) {
    Array(...newValues?.position)?.forEach((element, index) => {
      const indexSlide = newSlider.findIndex((slide) => slide.position === Number(element));
      newSlider[indexSlide] = { position: Number(element), sliderImage: files[index].filename };
    });
    newValues.slider = newSlider;
  }

  if (body?.noposition && sizeSlider > 0) {
    Array(...body?.noposition)?.forEach((element, index) => {
      const indexSlide = newSlider.findIndex((slide) => slide.position === Number(element));
      if (indexSlide >= 0 && newSlider[indexSlide].sliderImage) {
        newSlider[indexSlide] = { position: Number(element), sliderImage: '' };
      }
    });
  }

  if (image) {
    newValues.image = image;
  }
  Object.assign(product, newValues);

  const productUpdate = Product.findByIdAndUpdate(id, product, { new: true, useFindAndModify: false });
  return productUpdate;
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  deleteProductById,
  getProductSuggest,
  editProductById,
};
