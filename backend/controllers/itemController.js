const uuid = require('uuid')
const path = require('path');
const {Items} = require('../models/models')
const ApiError = require('../error/ApiError')
class ItemController{
    async create (req,res, next){

        try {
            const {title, desc, price, categoryId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname,'..', 'static', fileName))

            const item = await Items.create({title,img: fileName, desc, price, categoryId})

            return res.json(item)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }

    }

    async get (req,res){
        let {categoryId, limit, page} = req.body
        let items;

        page = page || 1
        limit = limit || 8

        let offset = page * limit - limit
        if (!categoryId){
            items = await Items.findAndCountAll({limit, offset})
        }

        else {
            items = await Items.findAndCountAll({where: {categoryId}, limit, offset})
        }

        return res.json(items)
    }

    async getOne (req,res){
        const {id} = req.params
        const item = await Items.findOne({
            where:{id}
        })
        return res.json(item)
    }
}

module.exports = new ItemController()