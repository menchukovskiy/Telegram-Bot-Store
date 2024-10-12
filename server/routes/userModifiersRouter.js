const Router = require('express')
const router = new Router
const modifiersController = require('../controllers/ModifiersController')
const authMiddleware = require('../middleware/AuthMiddleware')


router.post( '/add', authMiddleware, modifiersController.add )

router.get( '/all', authMiddleware, modifiersController.getAll )

router.delete( '/:id', authMiddleware, modifiersController.remove )

router.put(  '/:id', authMiddleware, modifiersController.edit)

router.delete( '/item/:id', authMiddleware, modifiersController.removeItem )



module.exports = router