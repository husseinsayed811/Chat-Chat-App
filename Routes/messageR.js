const express = require("express");
const router = express.Router();
const message = require("../Controllers/messageC");
const { verifing } = require("../Middlewares/authMW");

router.get("/:chatId" ,verifing, message.getAllMessages);
router.post("/" , verifing, message.sendMessage);

module.exports = router;


