'use strict'
const express = require('express')
const router = express.Router()
const { Login, Register } = require('../controllers/user_controller');

/* GET users listing. */
router.get('/:id', (req, res) => {
  console.log('profile');
});

router.post('/login', (req, res) => {
  console.log('users');
})
router.post('/register', (req, res) => {
  console.log('users');
})

module.exports = router
