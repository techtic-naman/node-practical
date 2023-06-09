const { Router } = require("express");
const router = Router();
const categoryController = require("../controllers/CategoryController");
router.get('',categoryController.getCategory);
router.post('',categoryController.addCategory);
router.put('/:id',categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);
module.exports = router;
