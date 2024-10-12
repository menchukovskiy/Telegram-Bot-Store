const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserBots } = require('../models/models')

class BotController {

    async getBot( req, res, next ){
        const bot = await UserBots.findAll( { where: { userId: req.user.id } } )
        return res.json( bot )
    }

   

}

module.exports = new BotController()