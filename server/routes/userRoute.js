const { Router } = require("express");
const userController = require("../controllers/UserController");
const router = Router();

router.get("/",userController.userList);
router.post("/",userController.insertUser);
router.get("/:id",userController.getUser);
router.put('/update/:id',userController.updateUser);
router.delete('/delete/:id',userController.deleteUser);

module.exports = router;
