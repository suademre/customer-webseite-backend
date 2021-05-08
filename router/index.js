const express = require("express");
const router = express.Router();
const Usersmodel = require("../model/usersmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ACCESS_TOKEN_SECRET = "gizli burasi";
const REFRESH_TOKEN_SECRET = "gizli burasi da";

router.get("/", (req, res) => {
  res.send("Success");
});

router.post("/register", async (req, res) => {
  const userinfo = req.body;
  console.log(req.body);
  const saltRounds = 8;
  const hashPassword = bcrypt.hashSync(userinfo.password, saltRounds);
  console.log(hashPassword);

  const user = await Usersmodel.create({ ...userinfo, password: hashPassword });
  user.save();
  res.sendStatus(200);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Usersmodel.findOne({ "contact.email": email });

  if (user) {
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (isPasswordCorrect) {
      const accessToken = jwt.sign(
        { data: { email } },
        ACCESS_TOKEN_SECRET,

        { expiresIn: 60 * 60 * 24 * 15 } // 15 days
        //{ expiresIn: 60 * 5 } // 5 minutes
      );
      const refreshToken = jwt.sign(
        { data: { email } },
        REFRESH_TOKEN_SECRET,
        { expiresIn: 60 * 60 * 24 * 30 * 6 } // 6 months
      );
      res.json({ accessToken, refreshToken, email, name: user.contact.name });
    } else res.sendStatus(400);
  } else res.sendStatus(400);
});

router.get("/test", async (req, res) => {});

module.exports.ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
module.exports.REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;

module.exports.router = router;
