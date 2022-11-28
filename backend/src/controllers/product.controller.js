const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
const httpStatus = require('http-status');

const getAllProducts = catchAsync(async (req, res) => {
  const { products, count } = await productService.getProducts(req.query);
  res.send({ products, count });
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body, req.file.filename);
  res.status(httpStatus.CREATED).send(product);
});

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.send(product);
});

const deleteProductById = catchAsync(async (req, res) => {
  const product = await productService.deleteProductById(req.params.id);
  res.send(product);
});

const editProductById = catchAsync(async (req, res) => {
  console.log(req.body);
  const productUpdate = await productService.editProductById(
    req.body,
    req.files['slider'],
    req.params.id,
    req.files['image']?.[0].filename
  );
  res.send(productUpdate);
});

const getProductSuggest = catchAsync(async (req, res) => {
  const listSuggest = await productService.getProductSuggest(req.query);
  res.send(listSuggest);
});

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProductById,
  getProductSuggest,
  editProductById,
};
