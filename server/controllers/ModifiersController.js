const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserInfo, UserModifiers, UserModifiersList, UserProductsModifiers } = require('../models/models')


class ModifiersController {

    async getAll(req, res, next) {
        const userMod = []
        const modifiers = await UserModifiers.findAll({ where: { userId: req.user.id } })
        for (let i = 0; i < modifiers.length; i++) {
            const listMod = await UserModifiersList.findAll({ where: { userModifierId: modifiers[i].id } })
            userMod.push({
                "name": modifiers[i].name,
                "id": modifiers[i].id,
                "list": listMod
            })
        }

        return res.json(userMod)
    }

    async add(req, res, next) {

        const { name, list } = req.body

        const countMod = await UserModifiers.findAll( { where: { userId: req.user.id } } )

        if( countMod.length <= 15 ){
            const modifiers = await UserModifiers.create({ name, type: 0, userId: req.user.id })
            const addList = []
    
            for (let i = 0; i < list.length; i++) {
                if (list[i].name !== '') {
                    const UMList = await UserModifiersList.create({ name: list[i].name, userModifierId: modifiers.id })
                    addList.push({ id: UMList.id, name: list[i].name })
                }
    
            }
    
            return res.json({
                "name": name,
                "id": modifiers.id,
                "list": addList
            })
        }

        return next(ApiError.badRequest('Number of modifiers exceeded!'))

    }

    async removeItem(req, res, next) {
        const { id } = req.params
        const userId = req.user.id

        const findModItemById = await UserModifiersList.findOne({ where: { id } })

        if (!findModItemById) {
            return next(ApiError.badRequest('Modifiers Item not found!'))
        }

        const findModByid = await UserModifiers.findOne({ where: { userId: req.user.id, id: findModItemById.userModifierId } })

        if (!findModByid) {
            return next(ApiError.badRequest('Modifiers not found!'))
        }

        const removeModItem = findModItemById.destroy()

        if (!removeModItem) {
            return next(ApiError.badRequest('The modifiers item was not deleted!'))
        }

        

        res.status(200).send({
            status: 'success',
            id: id
        })
    }

    async remove(req, res, next) {
        const { id } = req.params


        const findModByid = await UserModifiers.findOne({ where: { userId: req.user.id, id } })

        if (!findModByid) {
            return next(ApiError.badRequest('Modifiers not found!'))
        }

        const removeMod = findModByid.destroy({
            include: {
                model: UserModifiersList,
                where: {
                    userModifierId: id
                }
            }
        },)
        if (!removeMod) {
            return next(ApiError.badRequest('The modifiers was not deleted!'))
        }

        await UserProductsModifiers.destroy({ where: { id_modifiers: id } })

        await UserModifiersList.destroy({ where: { userModifierId: null } })


        res.status(200).send({
            status: 'success',
            id: id
        })
    }

    async edit(req, res, next) {
        const { id } = req.params
        const { name, list } = req.body
        const editList = []
        const newList = []
        const findModByid = await UserModifiers.findOne({ where: { userId: req.user.id, id } })

       


        if (!findModByid) {
            return next(ApiError.badRequest('Modifiers not found!'))
        }

        findModByid.name = name
        const editModByid = await findModByid.save({ fields: ['name'] })
        if (!editModByid) {
            return next(ApiError.badRequest('The modifiers has not been renamed!'))
        }

        const editModItemList = await UserModifiersList.findAll( { where: { userModifierId: id } } )

       
          
        let test = []
        

        for( let i = 0; i < editModItemList.length; i++ ){
            const issetItem = list.find( item => item.id == editModItemList[i].id )
            
            if( issetItem !== undefined ){
              editList.push( editModItemList[i].id  )
              newList.push({ id: editModItemList[i].id, name: issetItem.name })
              await UserModifiersList.update( { name: issetItem.name }, {where: { id: editModItemList[i].id } })
            } else {
                test.push(editModItemList[i].id)
                const DelItemList = await UserModifiersList.destroy({ where: { id: editModItemList[i].id } })
                await UserProductsModifiers.destroy({ where: { value: editModItemList[i].id } })
            }

            
        }

        const newItem = list.reduce( (acc, item) => {
            if (!editList.includes(parseInt(item.id))){
                acc.push(item);
            } 
          return acc;
        }, []);


        for( let i = 0; i < newItem.length; i++ ){
            const UMList = await UserModifiersList.create({ name: newItem[i].name, userModifierId: id })
                newList.push({ id: UMList.id, name: newItem[i].name })
        }
       
        await UserModifiersList.destroy({ where: { userModifierId: null } })

        return res.json({
            "name": name,
            "id": id,
            "list": newList
        })

    }

}

module.exports = new ModifiersController()