const jwt = require("jsonwebtoken");
const Usersmodel = require("../model/usersmodel");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../router/index");

module.exports = async function authMiddleware(req, res, next) {
  try {
    let accessToken = req.headers.authorization;
    accessToken = accessToken.split(" ")[1];
    let decoded = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    /* Users.find({email:decoded.email); */

    req.user = await Usersmodel.findOne({
      "contact.email": decoded.data.email,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }

  next();
};
