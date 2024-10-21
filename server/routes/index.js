const Router = require('express')
const router = new Router
const userRouter = require('./userRouter')
const userProductRouter = require('./userProductRouter')
const userCategoryRouter = require('./userCategoryRouter')
const userModifiersRouter = require('./userModifiersRouter')
const userBotRouter = require('./userBotRouter')
const telegramRouter = require('./telegramRouter')

router.use('/user', userRouter)
router.use('/product', userProductRouter)
router.use('/category', userCategoryRouter)
router.use('/modifiers', userModifiersRouter)
router.use('/bot', userBotRouter)
router.use('/telegram', telegramRouter)



module.exports = router