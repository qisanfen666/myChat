const { joinRoomController,getUserRoomsController,createRoomController } = require('../controllers/roomController.cjs')
const Router = require('@koa/router')   
const { authenticate } = require('../middlewares/auth.cjs')

const router = new Router({prefix:'/room'})

router.get('/:username',authenticate,getUserRoomsController)
router.post('/create',authenticate,createRoomController)
router.post('/join',authenticate,joinRoomController)

module.exports = router



