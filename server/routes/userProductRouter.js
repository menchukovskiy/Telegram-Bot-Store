const Router = require('express')
const router = new Router
const userProductController = require('../controllers/UserProductController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/create', authMiddleware, userProductController.create)

router.get('/all', authMiddleware,  userProductController.getAll )

router.put('/public', authMiddleware,  userProductController.changePublic)

router.delete( '/:id', authMiddleware, userProductController.remove )

router.get( '/mod_list/:id', authMiddleware, userProductController.getModListForProduct )

router.get( '/:id', authMiddleware, userProductController.getProductById )

router.put('/:id', authMiddleware,  userProductController.edit)


module.exports = router