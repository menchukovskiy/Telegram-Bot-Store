const { defaultValueSchemable } = require('sequelize/lib/utils')
const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define( 'user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, defaultValue: "USER" }
} )

const UserInfo = sequelize.define( 'user_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    balance: { type: DataTypes.INTEGER, defaultValue: 0 },
    package: { type: DataTypes.INTEGER, defaultValue: 0 }
} )

const UserBots = sequelize.define( 'user_bots', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    token: { type: DataTypes.STRING, allowNull: true,  defaultValue: '' },
    description: {type: DataTypes.TEXT, allowNull: true,  defaultValue: ''},
    currency: {type: DataTypes.TEXT, defaultValue: 'UAH' },
    public: { type: DataTypes.INTEGER, defaultValue: 0 }
} )

const UserCategory = sequelize.define( 'user_category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    parents: { type: DataTypes.INTEGER, defaultValue: 0 },
    public: { type: DataTypes.INTEGER, defaultValue: 1 }
} )

const UserProduct = sequelize.define( 'user_product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, defaultValue: 0 },
    currency: { type: DataTypes.STRING, defaultValue: process.env.CURRENCY_DEFAULT  },
    cover: { type: DataTypes.STRING, allowNull: true },
    category: { type: DataTypes.INTEGER,  defaultValue: 0 },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    orders: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.TEXT, allowNull: true },
    count: { type: DataTypes.STRING, defaultValue: 0 },
    public: { type: DataTypes.INTEGER, defaultValue: 1 }
} )

const UserModifiers = sequelize.define( 'user_modifiers', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.INTEGER, allowNull: true },
} )

const UserModifiersList = sequelize.define( 'user_modifiers_list', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
} )

const UserProductsModifiers = sequelize.define( 'user_products_modifiers', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    price: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.INTEGER, allowNull: false },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    id_modifiers: { type: DataTypes.INTEGER, allowNull: false }
} )

const UserStock = sequelize.define( 'user_stock', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_product: { type: DataTypes.INTEGER, allowNull: false },
    count: { type: DataTypes.STRING, defaultValue: 0 },
    units: { type: DataTypes.STRING, allowNull: false }
} )

const UserDelivery = sequelize.define( 'user_delivery', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_delivery: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.STRING, defaultValue: 0 },
    public: { type: DataTypes.INTEGER, defaultValue: 0 }
} )

const UserPaymentMethod = sequelize.define( 'user_payment_method', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_pm: { type: DataTypes.INTEGER, allowNull: false },
    commission: { type: DataTypes.STRING, defaultValue: 0 },
    public: { type: DataTypes.INTEGER, defaultValue: 0 }
} )

const Customer = sequelize.define( 'customer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: true },
    id_chat: { type: DataTypes.STRING, unique: true, allowNull: false },
    data: { type: DataTypes.TEXT, allowNull: true }
} )

const CustomerBasket = sequelize.define( 'customer_basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_bot: { type: DataTypes.INTEGER, allowNull: false },
    data: { type: DataTypes.TEXT, allowNull: true }
} )

const CustomerOrders = sequelize.define( 'customer_orders', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, allowNull: false },
    id_bot: { type: DataTypes.INTEGER, allowNull: false },
    id_user: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    currency: { type: DataTypes.STRING, defaultValue: process.env.CURRENCY_DEFAULT  },
    payment_method: { type: DataTypes.INTEGER, allowNull: false },
    delivery: { type: DataTypes.INTEGER, allowNull: false },
    data: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
} )

const Delivery = sequelize.define( 'deliverys', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
} )

const PaymentMethods = sequelize.define( 'peyment_methods', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
} )

const Package = sequelize.define( 'packages', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    category_limit: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    banner_limit: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    product_limit: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
} )

const UserBanner = sequelize.define( 'user_banner', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    cover: { type: DataTypes.STRING, allowNull: true },
    orders: { type: DataTypes.INTEGER, defaultValue: 0 },
    public: { type: DataTypes.INTEGER, defaultValue: 0 }
} )

const ProductImage = sequelize.define( 'user_products_img', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img: { type: DataTypes.STRING, allowNull: true },
} )


Customer.hasMany(CustomerBasket)
CustomerBasket.belongsTo(Customer)

Customer.hasMany(CustomerOrders)
CustomerOrders.belongsTo(Customer)

User.hasMany(UserBots)
UserBots.belongsTo(User)

User.hasMany(UserCategory)
UserCategory.belongsTo(User)

User.hasMany(UserProduct)
UserProduct.belongsTo(User)

User.hasOne(UserInfo)
UserInfo.belongsTo(User)

UserProduct.hasMany(UserProductsModifiers)
UserProductsModifiers.belongsTo(UserProduct)

UserProduct.hasMany(ProductImage)
ProductImage.belongsTo(UserProduct)

User.hasMany(UserDelivery)
UserDelivery.belongsTo(User)

User.hasMany(UserPaymentMethod)
UserPaymentMethod.belongsTo(User)

User.hasMany(UserStock)
UserStock.belongsTo(User)

User.hasMany(UserBanner)
UserBanner.belongsTo(User)

User.hasMany(UserModifiers)
UserModifiers.belongsTo(User)

UserModifiers.hasMany(UserModifiersList)
UserModifiersList.belongsTo(UserModifiers)

module.exports = {
    User,
    UserInfo,
    UserBots,
    UserCategory,
    UserProduct,
    UserModifiers,
    UserModifiersList,
    UserProductsModifiers,
    UserStock,
    UserDelivery,
    UserPaymentMethod,
    Customer,
    CustomerBasket,
    CustomerOrders,
    Delivery,
    PaymentMethods,
    Package,
    UserBanner,
    ProductImage
}