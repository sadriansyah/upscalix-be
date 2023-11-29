const router = require('express').Router()
const userController = require("../controllers/user.controller")

router.post("/", userController.create);
router.get("/", userController.all);
router.get("/:id",userController.find);
router.put("/:id",userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;