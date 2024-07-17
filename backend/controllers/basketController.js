const { Basket, BasketItem, Items } = require('../models/models');

class BasketController {
    async addItem(req, res) {
        const { itemId } = req.body;
        const userId = req.user.id;

        let basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            basket = await Basket.create({ userId });
        }

        const basketItem = await BasketItem.create({ basketId: basket.id, itemId });
        const item = await Items.findByPk(itemId);
        return res.json({ ...basketItem.dataValues, item });
    }

    async removeItem(req, res) {
        const { itemId } = req.body;
        const userId = req.user.id;

        const basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }

        await BasketItem.destroy({ where: { basketId: basket.id, itemId } });
        return res.json({ message: 'Item removed' });
    }

    async getBasket(req, res) {
        try {
            const { userId } = req.query;
            const basket = await Basket.findOne({
                where: { userId },
                include: [{ model: BasketItem, include: [Items] }]
            });

            if (!basket) {
                return res.status(404).json({ message: "Basket not found" });
            }

            const basketItems = basket.basket_items.map(basketItem => ({
                id: basketItem.id,
                title: basketItem.item.title,
                img: basketItem.item.img,
                desc: basketItem.item.desc,
                price: basketItem.item.price,
            }));

            return res.json(basketItems);
        } catch (error) {
            console.error('Error fetching basket:', error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new BasketController();
