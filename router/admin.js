const express = require("express");
const router = express.Router();
const Usersmodel = require("../model/usersmodel");
const CategoryModel = require("../model/categorymodel");
const QuestionsModel = require("../model/questionsmodel");
const UsersModel = require("../model/usersmodel");
const RequestsModel = require("../model/requestsmodel");
const authMiddleware = require("../middlewares/authMiddleware");

// Get request

router.use(authMiddleware);

router.get("/users", async (req, res) => {
  const users = await UsersModel.find();
  res.json(users);
  console.log(users);
});

router.get("/questions", async (req, res) => {
  const questions = await QuestionsModel.find().populate("category_id");
  res.json(questions);
  console.log(questions);
});

router.get("/requests/update/:id/:operation", async (req, res) => {
  let operation =
    req.params["operation"] === "canceled"
      ? "canceled"
      : req.params["operation"] === "accepted"
      ? "accepted"
      : "waiting";
  const request = await RequestsModel.findByIdAndUpdate(
    req.params["id"],
    { status: operation },
    { new: true, runValidators: true }
  );
  res.status(200);
  console.log(request);
});

router.get("/requests", async (req, res) => {
  if (req.user.userType === "admin") {
    const requests = await RequestsModel.find().populate("user");
    //console.log(requests);
    res.json(requests);
  } else res.send(401);
});

router.get("/myrequests", async (req, res) => {
  console.log(req.user);
  const requests = await RequestsModel.find({ user: req.user._id }).populate(
    "user"
  );
  console.log(requests);
  res.json(requests);
});

router.get("/categories", async (req, res) => {
  const categories = await CategoryModel.find();
  console.log(categories);
  res.json(categories);
});

// Post Request

router.post("/questions", (req, res) => {
  console.log(req.body);
});

router.post("/categories", (req, res) => {
  const category = new CategoryModel(req.body);
  category.save();
  res.status(200);
});

router.post("/questions/add", async (req, res) => {
  const questions = req.body;
  await QuestionsModel.create({ ...questions });
});

router.post("/requests", async (req, res) => {
  const requests = new RequestsModel(req.body);
  requests.user = req.user._id;
  requests.save();
  res.status(200);
});

//Delete request
router.delete("/questions/:id", async (req, res) => {
  const item = await QuestionsModel.findByIdAndDelete(req.params["id"]);
  res.status(200);
  res.json(item);
  console.log(item);
});

module.exports = router;
