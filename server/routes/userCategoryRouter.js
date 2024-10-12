const Router = require('express')
const router = new Router
const categoryController = require('../controllers/CategoryController')
const authMiddleware = require('../middleware/AuthMiddleware')


router.post( '/add', authMiddleware, categoryController.add )

router.get( '/all', authMiddleware, categoryController.getAll )

router.delete( '/:id', authMiddleware, categoryController.remove )

router.put(  '/:id', authMiddleware, categoryController.edit)



module.exports = router