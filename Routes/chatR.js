const express = require("express");
const router = express.Router();
const chat = require("../Controllers/chatC");
const { verifing } = require("../Middlewares/authMW");

router.get("/", verifing , chat.getAllChats);
router.post("/", verifing , chat.accessChat);
router.post("/newGroupChat", verifing , chat.createNewGroup);
router.put("/renameGroup", verifing , chat.renameGroup);
router.put("/addInGroup", verifing , chat.addInGroup);
router.put("/removeFromGroup", verifing , chat.removeFromGroup);


module.exports = router;


