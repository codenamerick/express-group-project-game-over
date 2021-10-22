const express = require("express");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const db = require("../db/models");
const { User } = db;
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { loginUser, logoutUser } = require("../auth");

/* GET users listing. */

// SIGNUP VALIDATORS
const userValidator = [
  check("first_name")
    .exists({ checkFalsy: true })
    .withMessage(`Please provide a value for First Name.`)
    .isLength({ max: 50 })
    .withMessage("First Name cannot be longer than 50 characters."),
  check("last_name")
    .exists({ checkFalsy: true })
    .withMessage(`Please provide a value for Last Name.`)
    .isLength({ max: 50 })
    .withMessage("Last Name cannot be longer than 50 characters."),
  check("user_name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for username.")
    .isLength({ max: 100 })
    .withMessage("Username cannot be longer than 100 characters.")
    .custom((value) => {
      return User.findOne({
        where: {
          user_name: value,
        },
      }).then((user) => {
        if (user) {
          return Promise.reject("Provided username already in use.");
        }
      });
    }),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide email address.")
    .isLength({ max: 100 })
    .withMessage("Email cannot be longer than 100 characters.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .custom((value) => {
      return User.findOne({
        where: {
          email: value,
        },
      }).then((user) => {
        if (user) {
          return Promise.reject("Provided email address already in use.");
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage(" Please provide password.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check("confirm_password")
    .exists({ checkFalsy: true })
    .withMessage("Please confirm password.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
];

//SIGN UP ROUTES
router.get(
  "/sign-up",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = await User.build();
    res.render("sign-up", { user, csrfToken: req.csrfToken() });
  })
);

router.post(
  "/sign-up",
  csrfProtection,
  userValidator,
  asyncHandler(async (req, res) => {
    const { first_name, last_name, user_name, email, password } = req.body;

    const validatorErrors = validationResult(req);

    const user = await User.build({
      first_name,
      last_name,
      user_name,
      email,
    });

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);

      user.hashed_password = hashedPassword;
      await user.save();

      loginUser(req, res, user);
      res.redirect("/");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("sign-up", { user, errors, csrfToken: req.csrfToken() });
    }
  })
);

//LOGIN VALIDATOR

const loginValidators = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide email address."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please enter valid password"),
];

//LOGIN ROUTES
router.get(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("user-login", { csrfToken: req.csrfToken() });
  })
);

router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const validatorErrors = validationResult(req);
    let errors = [];
    if (validatorErrors.isEmpty()) {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user !== null) {
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashed_password.toString()
        );

        if (passwordMatch) {
          loginUser(req, res, user);
          return res.redirect("/");
        }
      }
      errors.push("Login failed for provided credentials.");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render("user-login", { errors, email, csrfToken: req.csrfToken() });
  })
);

//LOGOuT ROUTES
router.post("/logout", (req, res) => {
  logoutUser(req, res);
  res.redirect("/");
});

//DEMO USER LOGIN



router.get(
  "/demo_user",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const demoPassword = "Scarecrows!4";
    const { email, password } = req.body;
    const validatorErrors = validationResult(req);
    let errors = [];
    if (validatorErrors.isEmpty()) {
      const user = await User.findOne({
        where: {
          email: "demo@demo.com",
        },
      });
      console.log();
      loginUser(req, res, user);
    }
    console.log("made it to the bottom of the function! yay");
    return res.redirect("/");
  })
);


//DEMO LOGIN ROUTES

router.get('/login-demo', csrfProtection, asyncHandler( async (req, res) => {
  let demoUser = await User.findByPk(1);
  console.log(demoUser)

  loginUser(req, res, demoUser);
  res.redirect('/');
}))

module.exports = router;
