const express = require("express");
const router = express.Router()
const {getSignUp, getSignIn, postSignUp, postSignIn} = require ('../controllers/user.controllers')


router.get("/signup", getSignUp);

router.get("/signin", getSignIn);

router.post("/signup", postSignUp);

router.post("/signin", postSignIn);

module.exports = router;
