const router = require('express').Router();

router.get('/test',(req,res) => {
    res.status(200).json({message: 'Hello word. Successfull test'})
})
function initializeRoute(route, routeName) {
    const newRouter = require(`./${route}`);
    router.use(`/${routeName}`, newRouter);
}
initializeRoute('user', 'user')
module.exports = router;