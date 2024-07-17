const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const checkRole = require('../middleware/checkRoleMilddleware')

router.post('/',checkRole('ADMIN'), itemController.create)
router.get('/', itemController.get)
router.get('/:id', itemController.getOne)

module.exports = router