const { Router } = require("express");
const router = Router();
const productController = require("../controllers/ProductController");
const {check,body} = require('express-validator')
const isGreaterThanToday = (value) => {
    if (value) {
        const expiryDate = new Date(value);
        const today = new Date();
  
        if (expiryDate <= today) {
        throw new Error('Expiry date must be greater than today');
        }
    
        return true;
    } else {
        throw new Error('Expiry date is required');
    }
    
  };
router.get('',productController.getProduct);
router.post('',[
    body('name', 'name is required').exists(),
    body('manufacture_date').isISO8601().withMessage('Invalid date'),
    body('expiry_date').custom(isGreaterThanToday),
    body('categoryId').isNumeric().withMessage('Invalid categoryId')
],productController.addProduct);
router.put('/:id',[
    body('name', 'name is required').exists(),
    body('manufacture_date').isISO8601().withMessage('Invalid date'),
    body('expiry_date').custom(isGreaterThanToday),
    body('categoryId').isNumeric().withMessage('Invalid categoryId')
],productController.updateProduct);
router.delete('/:id',productController.deleteProduct);
module.exports = router;
