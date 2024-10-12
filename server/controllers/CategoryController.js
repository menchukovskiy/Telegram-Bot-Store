const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserCategory, UserInfo, Package, UserProduct } = require('../models/models')


class CategoryController {

    async getAll( req, res, next ){
        const category = await UserCategory.findAll( { where: { userId: req.user.id } } )
        return res.json( category )
    }

    async add( req, res, next ){
       
        const { name, parents } = req.body
        const info = await UserInfo.findOne({ where: { userId: req.user.id  } })
        
        const categoryInfo = await UserCategory.findAll( { where: { userId: req.user.id } } )
        const packageData = await Package.findOne({ where: { id: info.package } })
       
        
       if( packageData.category_limit > categoryInfo.length ){
            const category = await UserCategory.create({ name, parents, userId: req.user.id })
            return res.json( category )
        }

        return next(ApiError.badRequest('Number of categories exceeded!'))
            
    }

    async remove( req, res, next ){
        const {id} = req.params
        const findCategoryByid = await UserCategory.findOne({ where: { userId: req.user.id, id } })

        if( !findCategoryByid ){
            return next(ApiError.badRequest('Category not found!'))
        }

        const removeCategory = findCategoryByid.destroy()
        if( !removeCategory ){
            return next(ApiError.badRequest('The category was not deleted!'))
        }

        await UserProduct.update( { category: 0 }, { where: { category: id} } )

        res.status(200).send({
            status: 'success',
            id : id
        })

    }

    async edit(req, res, next){
        
        const {id} = req.params
        const { name } = req.body

        const findCategoryByid = await UserCategory.findOne({ where: { userId: req.user.id, id } })

        if( !findCategoryByid ){
            return next(ApiError.badRequest('Category not found!'))
        }
        findCategoryByid.name = name
        const editCategory = await findCategoryByid.save({ fields: ['name'] })
        if( !editCategory ){
            return next(ApiError.badRequest('The category has not been renamed!'))
        }

        res.status(200).send({
            status: 'success',
            id : id,
            name : name
        })
    }

}

module.exports = new CategoryController()