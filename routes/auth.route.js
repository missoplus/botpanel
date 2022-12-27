const express = require('express')
const router = express.Router()
const  {
    createUser,
    loginUser,
    loginView,
    registerView,
} = require('../controllers/auth/authController.js')
const {logoutUser} = require("../controllers/auth/authController");
const sessionChecker = require("../middlewares/admin.middleware");
router.get('/register',registerView)
router.post('/register',createUser)
router.get('/login',loginView )
router.post('/login', loginUser)
router.get('/logout', logoutUser)
module.exports = {
    routes: router
}