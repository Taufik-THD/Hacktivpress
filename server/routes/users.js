const express = require('express')
const router = express.Router()
const { getUsers, signUp, signIn } = require('../controllers/user_controller');

/* GET users listing. */
router.get('/:id', (req, res) => {
  console.log('profile');
});

router.post('/signin', signIn)

router.post('/signup', signUp)

module.exports = router
