const router = requier('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes')

router.use('/users' , userRoutes);
router.use('/thoughts' , thoughtRoutes);


//Exporting

module.exports = router;