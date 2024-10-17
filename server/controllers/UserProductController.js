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
                for (let i = 0; i <= 3; i++) {
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
        const { category, page, limit, order, sort } = req.query
        let offset = page * limit - limit
        let products
        let out = {
            "rows" : {},
            "count" : 0,
            "countAll" : 0
        }

        products = await UserProduct.findAndCountAll({ where: { userId: req.user.id }, limit, offset, order: [
            [order, sort],
        ], })

        out.countAll = products.count

        if (Number(category)) {
            products = await UserProduct.findAndCountAll({ where: { category, userId: req.user.id }, limit, offset, order: [
                [order, sort],
            ], })
        } 
        out.rows = products.rows
        out.count = products.count

        return res.json(out)

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

    async getModListForProduct(req, res, next) {
        const { id } = req.params
        const userId = req.user.id

        const findProductByid = await UserProduct.findOne({ where: { userId, id } })

        if (!findProductByid) {
            return next(ApiError.badRequest('Product not found!'))
        }

        const productModList = await UserProductsModifiers.findAll({ where: { userProductId: id } })

        res.json(productModList)

    }

    async getProductById(req, res, next) {
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

    async edit(req, res, next) {
        const { id } = req.params
        const userId = req.user.id

        

        const findProductByid = await UserProduct.findOne({ where: { userId, id } })

        if (!findProductByid) {
            return next(ApiError.badRequest('Product not found!'))
        }

        const userModifiers = await UserModifiers.findAll({ where: { userId: req.user.id } })
        let { name, category, price, currency, description, modifiers, cover } = req.body

        const productModList = await UserProductsModifiers.findAll({ where: { userProductId: id } })

        description.slice(0, 999)

        //Проверяем изменилас ли категория
        if (category !== findProductByid.category) {
            if (!category) {
                category = 0
            }

            if (Number(category)) {
                const findCategoryByid = await UserCategory.findOne({ where: { userId: req.user.id, id: category } })
                if (!findCategoryByid) {
                    category = 0
                }
            }
        }
        //Проверяем цену
        if (price === '' || Number(price) < 0) {
            price = 0
        }
        //Проверяем обложку товара
        let fileName = "none.jpg"

        if (cover === 'file') {
            if (findProductByid.cover !== "none.jpg") {
                fs.unlinkSync(path.resolve(__dirname, '..', 'static', findProductByid.cover))
            }


            const { coverImg } = req.files

            let fileNamePrev = coverImg.name

            await coverImg.mv(path.resolve(__dirname, '..', 'static', fileNamePrev))

            if (Image.checkImageType(path.resolve(__dirname, '..', 'static', fileNamePrev))) {
                fileName = uuid.v4() + ".jpg"
                await Image.createImage(path.resolve(__dirname, '..', 'static', fileNamePrev), path.resolve(__dirname, '..', 'static', fileName), 800, null)
            }

            fs.unlinkSync(path.resolve(__dirname, '..', 'static', fileNamePrev))

        } else if (cover !== '') {
            if (cover === findProductByid.cover) {
                fileName = findProductByid.cover
            }
        }

        if (fileName === "none.jpg" && findProductByid.cover !== "none.jpg") {
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', findProductByid.cover))
        }

        //Обновляем товар

        findProductByid.name = name
        findProductByid.price = price
        findProductByid.currency = currency
        findProductByid.cover = fileName
        findProductByid.category = category
        findProductByid.description = description

        const editProduct = await UserProduct.update(
            {
                name: name,
                price: price,
                currency: currency,
                cover: fileName,
                category: category,
                description: description
            },
            { where: { id: findProductByid.id } })

        if (!editProduct) {
            return next(ApiError.badRequest('The product has not been renamed!'))
        }


        //Обновления дополнительних фото
        const productImgList = await ProductImage.findAll({
            where: { userProductId: id },
            order: [
                ['id', 'ASC'],
            ],
        })


        for (let i = 0; i <= 3; i++) {

            let sub = 'sub_photo_' + i
            if (req.files) {
                if (req.files[sub]) {
                    let fileNamePrev = req.files[sub].name
                    await req.files[sub].mv(path.resolve(__dirname, '..', 'static', fileNamePrev))
                    if (Image.checkImageType(path.resolve(__dirname, '..', 'static', fileNamePrev))) {
                        let fileName = uuid.v4() + ".jpg"
                        await Image.createImage(path.resolve(__dirname, '..', 'static', fileNamePrev), path.resolve(__dirname, '..', 'static', fileName), 800, null)

                        if (Number(req.body[sub + '_id'])) {
                            const checkSubImg = productImgList.filter(i => i.id === Number(req.body[sub + '_id']))

                            if (checkSubImg.length) {
                                fs.unlinkSync(path.resolve(__dirname, '..', 'static', checkSubImg[0]['img']))
                            }
                            ProductImage.update(
                                {
                                    img: fileName,
                                },
                                { where: { id: req.body[sub + '_id'] } })
                        } else {
                            ProductImage.create({
                                img: fileName,
                                userProductId: id
                            })
                        }
                    }
                    fs.unlinkSync(path.resolve(__dirname, '..', 'static', fileNamePrev))
                }
            } else {
                if (req.body[sub] === '' && Number(req.body[sub + '_id'])) {
                    const checkSubImg = productImgList.filter(i => i.id === Number(req.body[sub + '_id']))
                    fs.unlinkSync(path.resolve(__dirname, '..', 'static', checkSubImg[0]['img']))
                    await ProductImage.destroy({ where: { id: checkSubImg[0]['id'] } })
                }
            }

        }



    //Обновления модификаторов
    if (modifiers) {
        modifiers = JSON.parse(modifiers)
        productModList.forEach( item => {
            const upMod = modifiers.find( i => i.id === item.id )
            if( upMod  ){
                let upPrice = price
                if (upMod.price !== '') {
                    upPrice = upMod.price
                }
                UserProductsModifiers.update( {
                    
                    price: upPrice,
                    count: upMod.count
                },
                { where: { id: item.id } } )
            } else {
                UserProductsModifiers.destroy({ where: { id: item.id } })
            }
        } )

        const newMod = modifiers.filter( data => data.id === 0 )

        if( newMod.length ){
            newMod.forEach(mod => {
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
                        userProductId: id
                    })
                }

            })
        }
    }

   



        return res.json({
            "id": id,
        })


    }
}

module.exports = new UserProductController()