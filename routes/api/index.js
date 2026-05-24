const router = require('express').Router();
const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');

// Use user routes for /users
router.use('/users', userRoutes);

// Use note routes for /notes
router.use('/notes', noteRoutes);
 
module.exports = router;