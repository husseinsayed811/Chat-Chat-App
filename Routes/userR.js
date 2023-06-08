const express = require("express");
const router = express.Router();
const user = require("../Controllers/userC");
const { verifing } = require("../Middlewares/authMW");

router.post("/newUser", user.addNewUser);
router.post("/signin", user.signIn);
router.get("/", verifing, user.allSearchUsers);

module.exports = router;
