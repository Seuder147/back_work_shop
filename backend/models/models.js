const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketItem = sequelize.define('basket_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Items = sequelize.define('items', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
})

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketItem)
BasketItem.belongsTo(Basket)

Category.hasMany(Items)
Items.belongsTo(Category)

Items.hasOne(BasketItem)
BasketItem.belongsTo(Items)

module.exports = {
    User,
    Basket,
    BasketItem,
    Items,
    Category
}
