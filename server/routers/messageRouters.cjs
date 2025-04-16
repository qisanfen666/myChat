const Router = require('@koa/router')
const { authenticate } = require('../middlewares/auth.cjs')
const { saveMessageConttoller, getMessagesByRoomController } = require('../controllers/messageController.cjs')

const router = new Router({prefix:'/message'})

router.post('/', authenticate, saveMessageConttoller)
router.get('/:room', authenticate, getMessagesByRoomController)

module.exports = router