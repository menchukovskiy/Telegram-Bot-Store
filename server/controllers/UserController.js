const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, UserInfo, Package, UserBots } = require('../models/models')

const generateJWT = (id, email, type, login) => {
    return jwt.sign(
        { id, email, type, login },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {


    async registration(req, res, next) {
        const { email, password, password2, login, type } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }

        if (password != password2) {
            return next(ApiError.badRequest('Password mismatch!'))
        }

        const issetUser = await User.findOne({ where: { email } })
        if (issetUser) {
            return next(ApiError.badRequest('A user with this email already exists'))
        }

        const issetLogin = await User.findOne({ where: { login } })
        if (issetLogin) {
            return next(ApiError.badRequest('A user with this login already exists'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, login, password: hashPassword, type })
        const userInfo = await UserInfo.create({ userId: user.id })
        const token = generateJWT(user.id, email, user.type, login)

        const bot = await UserBots.create( {userId: user.id} )

        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal( 'User is not found!' ))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Incorrect password!'))
        }

        const token = generateJWT(user.id, user.email, user.type, user.login)
        const info = await UserInfo.findOne({ where: { userId: user.id } })

        let packageData = {
            name: '',
            category_limit: 0,
            banner_limit: 0,
            product_limit: 0
        }

        if (info.package) {
            packageData = await Package.findOne({ where: { id: info.package } })
        }

        return res.json({
            "token": token,
            "balance": info.balance,
            "package": packageData
        })
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.type, req.user.login)
        const info = await UserInfo.findOne({ where: { userId: req.user.id } })
        let packageData = {
            name: '',
            category_limit: 0,
            banner_limit: 0,
            product_limit: 0
        }

        if (info.package) {
             packageData = await Package.findOne({ where: { id: info.package } })
        }
        return res.json({
            "token": token,
            "balance": info.balance,
            "package": packageData
        })
    }


}

module.exports = new UserController()