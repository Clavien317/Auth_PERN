const { register, getUser, login } = require("../controllers/UserController");
const router = require("express").Router();
const validationMiddleware = require("../middleware/validAuth");
const registerValid = require("../validation/authValidation")
const loginValidation = require("../validation/authValidation");

router.get("/", getUser);
router.post("/register", registerValid, validationMiddleware, register);
router.post("/login",loginValidation,validationMiddleware,login)

module.exports = router;
