const Router = require('express')
const router = new Router
const BotController = require('../controllers/BotController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.get( '*', authMiddleware, BotController.getBot )


module.exports = router