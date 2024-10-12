const Router = require('express')
const router = new Router
const userProductController = require('../controllers/UserProductController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/create', authMiddleware, userProductController.create)

//router.get('/:id', userProductController.getOne )

router.get('/all', authMiddleware,  userProductController.getAll )

router.put('/public', authMiddleware,  userProductController.changePublic)



module.exports = router