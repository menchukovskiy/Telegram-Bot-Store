const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserProduct, UserInfo, Package, UserProductsModifiers, ProductImage, UserCategory, UserModifiers, UserModifiersList } = require('../models/models')
const uuid = require('uuid')
const path = require('path');
const fs = require('fs')
const Image = require('../classes/Image.class')
const { where } = require('sequelize')



class UserProductController {

    async changePublic(req, res, next) {
        const { id, publicProduct } = req.body

        const product = await UserProduct.findOne({ where: { userId: req.user.id, id } })

        if (!product) {
            return next(ApiError.badRequest('Product not found!'))
        }

        let publicPR = 1

        if (publicProduct) {
            publicPR = 0
        }

        product.public = publicPR
        const editCategory = await product.save({ fields: ['public'] })
        if (!product) {
            return next(ApiError.badRequest('The product has not been renamed!'))
        }

        res.status(200).send({
            status: 'success',
            id: id,
            public: publicPR
        })
    }


    async create(req, res, next) {

        const info = await UserInfo.findOne({ where: { userId: req.user.id } })

        if (!info) {
            return next(ApiError.badRequest('User not found!'))
        }

        const packageData = await Package.findOne({ where: { id: info.package } })
        const productInfo = await UserProduct.findAll({ where: { userId: req.user.id } })
        const userModifiers = await UserModifiers.findAll({ where: { userId: req.user.id } })

        if (packageData.product_limit > productInfo.length) {

            let { name, category, price, currency, description, modifiers, cover } = req.body

            description.slice(0, 999)

            if (!category) {
                category = 0
            }

            if (Number(category)) {
                const findCategoryByid = await UserCategory.findOne({ where: { userId: req.user.id, id: category } })
                if (!findCategoryByid) {
                    category = 0
                }
            }

            if (price === '' || Number(price) < 0) {
                price = 0
            }


            let fileName = "none.jpg"




            if (cover === 'file') {
                const { coverImg } = req.files



                let fileNamePrev = coverImg.name

                await coverImg.mv(path.resolve(__dirname, '..', 'static', fileNamePrev))

                if (Image.checkImageType(path.resolve(__dirname, '..', 'static', fileNamePrev))) {
                    fileName = uuid.v4() + ".jpg"
                    await Image.createImage(path.resolve(__dirname, '..', 'static', fileNamePrev), path.resolve(__dirname, '..', 'static', fileName), 800, null)
                }

                fs.unlinkSync(path.resolve(__dirname, '..', 'static', fileNamePrev))
            }



            const product = await UserProduct.create({ name, category, price, currency, description, cover: fileName, userId: req.user.id })

            if (req.files) {
                for (let i = 0; i < 3; i++) {
                    let sub = 'sub_photo_' + i
                    if (req.files[sub]) {

                        let fileNamePrev = req.files[sub].name

                        await req.files[sub].mv(path.resolve(__dirname, '..', 'static', fileNamePrev))

                        if (Image.checkImageType(path.resolve(__dirname, '..', 'static', fileNamePrev))) {
                            let fileName = uuid.v4() + ".jpg"
                            await Image.createImage(path.resolve(__dirname, '..', 'static', fileNamePrev), path.resolve(__dirname, '..', 'static', fileName), 800, null)
                            ProductImage.create({
                                img: fileName,
                                userProductId: product.id
                            })
                        }

                        fs.unlinkSync(path.resolve(__dirname, '..', 'static', fileNamePrev))

                    }
                }
            }


            if (modifiers) {
                modifiers = JSON.parse(modifiers)
                modifiers.forEach(mod => {
                    const check = userModifiers.find((item) => item.id === mod.modId)
                    if (check) {
                        let modPrice = price
                        if (mod.price !== '') {
                            modPrice = mod.price
                        }
                        UserProductsModifiers.create({
                            count: mod.count,
                            price: modPrice,
                            id_modifiers: mod.modId,
                            value: mod.listId,
                            userProductId: product.id
                        })
                    }

                })
            }



            return res.json(product)


        }

        return next(ApiError.badRequest('Number of product exceeded!'))


    }

    async getOne(req, res, next) {

    }

    async getAll(req, res, next) {
        const { category, page, limit } = req.query
        let offset = page * limit - limit
        let products

        if (Number(category)) {
            products = await UserProduct.findAndCountAll({ where: { category, userId: req.user.id }, limit, offset })
        } else {

            products = await UserProduct.findAndCountAll({ where: { userId: req.user.id }, limit, offset })
        }

        return res.json(products)

    }

    async remove(req, res, next) {
        const { id } = req.params
        const userId = req.user.id


        const findProductByid = await UserProduct.findOne({ where: { userId, id } })
        const findProductImgByid = await ProductImage.findAll({ where: { userProductId: id } })

        if (!findProductByid) {
            return next(ApiError.badRequest('Product not found!'))
        }

        const removeProduct = await findProductByid.destroy({
            include: {
                model: UserProductsModifiers,
                where: {
                    userProductId: id
                }
            }
        },)

        if (!removeProduct) {
            return next(ApiError.badRequest('The product was not deleted!'))
        }

        await UserProductsModifiers.destroy({ where: { userProductId: null } })

        if (findProductByid.cover !== "none.jpg") {
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', findProductByid.cover))
        }

        if (findProductImgByid.length) {

            findProductImgByid.forEach(prImg => {
                fs.unlinkSync(path.resolve(__dirname, '..', 'static', prImg.img))
            })

            await ProductImage.destroy({ where: { userProductId: null } })
        }


        const { category, page, limit } = req.query
        let offset = page * limit - limit
        let products

        if (Number(category)) {
            products = await UserProduct.findAndCountAll({ where: { category, userId }, limit, offset })
        } else {

            products = await UserProduct.findAndCountAll({ where: { userId }, limit, offset })
        }

        return res.json(products)

    }

    async getModListForProduct( req, res, next ){
        const { id } = req.params
        const userId = req.user.id

        const findProductByid = await UserProduct.findOne({ where: { userId, id } })

        if (!findProductByid) {
            return next(ApiError.badRequest('Product not found!'))
        }

        const productModList = await UserProductsModifiers.findAll({ where: { userProductId: id } })

        res.json( productModList )

    }

    async getProductById(req, res, next){
        const { id } = req.params
        const userId = req.user.id
        const findProductByid = await UserProduct.findOne({ where: { userId, id } })

        if (!findProductByid) {
            return next(ApiError.badRequest('Product not found!'))
        }

        const productModList = await UserProductsModifiers.findAll({ 
            where: { userProductId: id },
            order: [
                ['id', 'ASC'],
            ], 
        })
        const productImgList = await ProductImage.findAll({ 
            where: { userProductId: id },
            order: [
                ['id', 'ASC'],
            ],
        })

        res.status(200).send({
            "data": findProductByid,
            "modList": productModList,
            "imgList": productImgList
        })

    }

    async edit(req, res, next){

    }
}

module.exports = new UserProductController()