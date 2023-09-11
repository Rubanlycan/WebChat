const express = require('express')
const router = express.Router()
const {addAccountDetails,findUser, getAllUsers,userLogout} =  require('../controllers/userControllers')

router.post("/addAccountDetails", addAccountDetails);
router.post("/login", findUser);
router.get("/usersList",getAllUsers)
router.post("/logout",userLogout)

module.exports = router;