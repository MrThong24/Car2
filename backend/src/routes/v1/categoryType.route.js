const express = require('express');
const { categoryTypeController } = require('../../controllers');

const router = express.Router();

router.route('/').get(categoryTypeController.getAllCategoryType);
router.post('/', categoryTypeController.createCategoryType);

module.exports = router;
