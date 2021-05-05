const express = require("express");
const router = express.Router();
const Usersmodel = require("../model/usersmodel");
const CategoryModel = require("../model/categorymodel");
const QuestionsModel = require("../model/questionsmodel");
const UsersModel = require("../model/usersmodel");
const RequestsModel = require("../model/requestsmodel")

/* router.get("/questions", (req, res) => {
  res.json([
    {
      category: [
        {
          category_id: "2",
          category_title: "Application",
        },
      ],

      questions: [
        {
          questions_id: "1",
          question_text: "asdasd",
          category_id: "",
          isMultiple: "true",
          answers: [
            {
              value: "1",
              text: "asdg",
              days: 5,
              cost: 10.5,
            },
            {
              value: "2",
              text: "asdasda",
              days: 10,
              cost: 10.5,
            },
          ],
        },
      ],
    },
    {
      category: [
        {
          category_id: "2",
          category_title: "Application",
        },
      ],

      questions: [
        {
          questions_id: "2",
          question_text: "asdasd",
          category_id: "2",
          isMultiple: "true",
          answers: [
            {
              value: "1",
              text: "asdg",
              days: 5,
              cost: 10.5,
            },
            {
              value: "2",
              text: "asdasda",
              days: 10,
              cost: 10.5,
            },
          ],
        },
      ],
    },
    {
      category: [
        {
          category_id: "3",
          category_title: "Wep Application",
        },
      ],

      questions: [
        {
          questions_id: "1",
          question_text: "asdasd",
          category_id: "3",
          isMultiple: "false",
          answers: [
            {
              value: "1",
              text: "asdg",
              days: 5,
              cost: 10.5,
            },
            {
              value: "2",
              text: "asdasda",
              days: 10,
              cost: 30.5,
            },
          ],
        },
      ],
    },
    {
      category: [
        {
          category_id: "3",
          category_title: "Web Application",
        },
      ],

      questions: [
        {
          questions_id: "2",
          question_text: "asdasd",
          category_id: "2",
          isMultiple: "true",
          answers: [
            {
              value: "1",
              text: "asdg",
              days: 5,
              cost: 10.5,
            },
            {
              value: "2",
              text: "asdasda",
              days: 10,
              cost: 50.5,
            },
          ],
        },
      ],
    },
    {
      category: [
        {
          category_id: "2",
          category_title: "Web Application",
        },
      ],

      questions: [
        {
          questions_id: "3",
          question_text: "asdasd",
          category_id: "2",
          isMultiple: "true",
          answers: [
            {
              value: "1",
              text: "asdg",
              days: 5,
              cost: 10.5,
            },
            {
              value: "2",
              text: "asdasda",
              days: 10,
              cost: 10.5,
            },
          ],
        },
      ],
    },
    {
      category: [
        {
          category_id: "4",
          category_title: "Dataanalyst",
        },
      ],

      questions: [
        {
          questions_id: "1",
          question_text: "ww",
          category_id: "4",
          isMultiple: "false",
          answers: [
            {
              value: "3",
              text: "tz",
              days: 2,
              cost: 5,
            },
            {
              value: "2",
              text: "tzutzu",
              days: 3,
              cost: 8,
            },
          ],
        },
      ],
    },
    {
      category: [
        {
          category_id: "4",
          category_title: "Dataanalyst",
        },
      ],

      questions: [
        {
          questions_id: "2",
          question_text: "wgffsgsdgsdfgw",
          category_id: "4",
          isMultiple: "true",
          answers: [
            {
              value: "3",
              text: "tz",
              days: 5,
              cost: 10.5,
            },
            {
              value: "2",
              text: "tzutzu",
              days: 10,
              cost: 30.5,
            },
          ],
        },
      ],
    },
    {
      category: [
        {
          category_id: "4",
          category_title: "Dataanalyst",
        },
      ],

      questions: [
        {
          questions_id: "2",
          question_text: "wgffsgsdgsdfgw",
          category_id: "4",
          isMultiple: "true",
          answers: [
            {
              value: "3",
              text: "tz",
              days: 6,
              cost: 16.5,
            },
            {
              value: "2",
              text: "tzutzu",
              days: 20,
              cost: 100.5,
            },
          ],
        },
      ],
    },
    {
      category: [
        {
          category_id: "4",
          category_title: "Dataanalyst",
        },
      ],

      questions: [
        {
          questions_id: "5",
          question_text: "asdasd",
          category_id: "4",
          isMultiple: "false",
          answers: [
            {
              value: "1",
              text: "asdg",
              days: 7,
              cost: 25,
            },
            {
              value: "2",
              text: "asdasda",
              days: 3,
              cost: 10.5,
            },
          ],
        },
      ],
    },
  ]);
}); */

// Get request

router.get("/users", async(req,res)=>{
  const users = await UsersModel.find();
  res.json(users);
  console.log(users);
});

router.get("/questions", async (req,res)=>{
  const questions = await QuestionsModel.find().populate("category_id");
  res.json(questions)
  console.log(questions);
})

router.get("/requests/update/:id/:operation",async(req,res)=>{

  let operation = req.params["operation"] === "canceled" ? "canceled" : req.params["operation"] === "accepted" ? "accepted" : "waiting"
  const request = await RequestsModel.findByIdAndUpdate(req.params["id"],{status:operation},{new: true, runValidators:true})
  res.status(200);
  console.log(request);

})

router.get("/requests", async(req,res)=>{
  if(req.user.userType==="admin"){
    const requests = await RequestsModel.find();
    //console.log(requests);
    res.json(requests)
    }
  else
  res.send(401);
})


router.get("/myrequests", async(req,res)=>{
  const requests = await RequestsModel.find({user:req.user._id});
  //console.log(requests);
  res.json(requests)
})

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

router.post("/questions/add", async (req,res)=>{
  const questions = req.body
  await QuestionsModel.create({...questions})
})

router.post("/requests",async(req,res)=>{
  const requests = new RequestsModel(req.body);
  requests.save();
  res.status(200);
})


//Delete request
router.delete("/questions/:id", async(req,res)=>{
  const item = await QuestionsModel.findByIdAndDelete(req.params["id"])
  res.status(200);
  res.json(item);
  console.log(item);
  
})







module.exports = router;
