const { Router } = require("express");
const userController = require("../controllers/UserController");
const router = Router();
const multer  = require('multer')
let destination = './public/images';
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
    cb(null, 'public/images/');
    },
    filename: function(req, file, cb) {
     cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
      }
  }); 

  var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) {
        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/gif' && file.mimetype !== 'image/jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
      fileSize:  10 * 1024 * 1024
    }
});

router.get("/",userController.userList);
router.post("/",userController.insertUser);
router.get("/:id",userController.getUser);
router.put('/update/:id',userController.updateUser);
router.delete('/delete/:id',userController.deleteUser);

// file upload
router.post("/uploadUserFiles",upload.array("files",5),userController.uploadFile);//files is the field name
router.post("/uploadUserProfile", upload.single("image"),userController.uploadProfile); 

module.exports = router;
