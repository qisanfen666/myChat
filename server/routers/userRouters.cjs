const Router = require('@koa/router')
const {authenticate} = require('../middlewares/auth.cjs')
const {registerUser,loginUser} = require('../controllers/userController.cjs')

const router = new Router({prefix:'/user'})

//登录和注册不需要验证token
router.post('/register',registerUser)
router.post('/login',loginUser)

router.get('/profile',authenticate,async(ctx)=>{
    ctx.body = ctx.state.user
})

module.exports = router