const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
const { User } = db;
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


/* GET users listing. */

// insert user creation validators
const userValidator = [
  check('first_name')
    .exists({ checkFalsy: true })
    .withMessage(`Please provide a value for First Name.`)
    .isLength({ max: 50 })
    .withMessage('First Name cannot be longer than 50 characters.'),
  check('last_name')
    .exists({ checkFalsy: true })
    .withMessage(`Please provide a value for Last Name.`)
    .isLength({ max: 50 })
    .withMessage('Last Name cannot be longer than 50 characters.'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide email address.')
    .isLength({ max: 100 })
    .withMessage('Email cannot be longer than 100 characters.')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .custom((value) => {
      return User.findOne({
        where: {
          email: value,
        }
      })
      .then((user) => {
        if(user) {
          return Promise.reject('Provided email address already in use.')
        }
      })
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage(' Please provide password.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirm_password')
    .exists({ checkFalsy: true })
    .withMessage('Please confirm password.')
    .custom((value, {req}) => {
      if(value !== req.body.password) {
        throw new Error('Passwords do not match.')
      }
      return true
    })
]

// get routes
router.get('/sign-up', csrfProtection, asyncHandler(async(req, res) => {
  const user = await User.build();
  res.render('sign-up', { user, csrfToken: req.csrfToken() });

}));


// post routes
router.post('/sign-up', csrfProtection, userValidator, asyncHandler( async( req, res) => {
  const {
    first_name,
    last_name,
    user_name,
    email,
    password
  } = req.body

  const validatorErrors = validationResult(req);

  const user = await User.build ({
    first_name,
    last_name,
    user_name,
    email
  })

  if(!validatorErrors.length) {
    const hashedPassword = await bcrypt.hash(password, 10);

    user.hashed_password = hashedPassword
    await user.save();
    // TODO: login user function
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('/sign-up', { user, errors , csrfToken: req.csrfToken() })
  }

}));
module.exports = router;
