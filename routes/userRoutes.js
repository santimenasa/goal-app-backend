const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userControllers')


const { protect } = require("../middleware/authMiddleware")
//aca van las rutas para el register(post) login(POST) getUsersInfo(GET)

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/me',protect,  getMe)

module.exports = router