const router = require('express').Router();
const thoughtRoutes = require('./thRoutes');
const userRoutes = require('./userRoutes');
//api 
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
