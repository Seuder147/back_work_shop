const Router = require('express')
const router = new Router()
const itemRouter = require('./itemRoutes')
const categoryRouter = require('./categoryRoutes')
const userRouter = require('./userRoutes')
const basketRouter = require('./basketRoutes')

router.use('/user', userRouter)
router.use('/item', itemRouter)
router.use('/category',categoryRouter)
router.use('/basket', basketRouter)

module.exports = router