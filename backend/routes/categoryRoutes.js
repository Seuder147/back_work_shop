const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMilddleware')

router.post('/',checkRole('ADMIN'), categoryController.create)
router.get('/', categoryController.get)

module.exports = router