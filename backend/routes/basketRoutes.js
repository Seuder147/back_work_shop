const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, basketController.addItem);
router.post('/remove', authMiddleware, basketController.removeItem);
router.get('/', authMiddleware, basketController.getBasket);

module.exports = router;
