const Router = require('express')
const router = new Router
const TelegramController = require('../controllers/TelegramController')


router.get( '*', TelegramController.getStore )


module.exports = router