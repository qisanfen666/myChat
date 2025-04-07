const Router = require('@koa/router')
const {registerUser,loginUser} = require('../controllers/userController.cjs')

const router = new Router({prefix:'/user'})

router.post('/register',registerUser)
router.post('/login',loginUser)

module.exports = router