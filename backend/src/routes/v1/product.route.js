const express = require('express');
const { productController } = require('../../controllers');
const upload = require('../../middlewares/uploadFile');

const router = express.Router();

router.route('/').get(productController.getAllProducts);

router.post('/', upload.single('image'), productController.createProduct);

router.route('/detail-product/:id').get(productController.getProductById);

router.route('/delete/:id').delete(productController.deleteProductById);

router.route('/product-suggest').get(productController.getProductSuggest);
// router.route('/edit-product/:id').put(productController.editProductById);
router.put(
  '/edit-product/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'slider', maxCount: 4 },
  ]),
  productController.editProductById
);

module.exports = router;
