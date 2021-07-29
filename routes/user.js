const express = require('express');
const router = express.Router();


const userController = require('../controllers/auth-controller')


// http://localhost:8000/news
router.post('/register', userController.create);
router.post('/login/action', userController.auth);
router.get('/users', userController.index);
router.get('/user/:userId', userController.show);
router.post('/user/destroy/:userId', userController.destroy);
router.post('/user/amend/:userId', userController.update);
 
module.exports = router;
