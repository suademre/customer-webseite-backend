const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database/connect");
const jwt = require("jsonwebtoken");
const Usersmodel = require("./model/usersmodel");

const app = express();
const port = 3100;

app.use(cors());

app.use(express.json());

app.use("/", require("./router/index").router);

app.use("/admin", require("./router/admin"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

connectDatabase();

/* app.get("/users", (req, res) => {
  res.json([
    {
      email: "mail@test.com",
      company: {
        name: "Muster Inc.",
        address: {
          street_and_no: "Musterstraße 1",
          zip_code: "12335",
          city: "Musterstadt",
          state: "BW",
          country: "Deutschland",
        },
      },
      contact: {
        name: "Max Muster",
        email: "mail@test.com",
        tel: "08123 89123",
        mobile: "+49 213 128313",
        fax: "08123 89123",
      },
    },
    {
      email: "aa@test.com",
      company: {
        name: "aaa",
        address: {
          street_and_no: "aaaa",
          zip_code: "aaa",
          city: "aaa",
          state: "aaaaa",
          country: "aaaaaa",
        },
      },
      contact: {
        name: "Max aa",
        email: "aaaaa@test.com",
        tel: "aaaaaa 89123",
        mobile: "+49 21aaa3 128313",
        fax: "aaaaaa 89123",
      },
    },
  ]);
});

app.get("/admin/questions", (req, res) => {
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
});

app.get("/admin/requests", (req, res) => {
  res.json([
    {
      request: [
        {
          id: "1",
          request_user: "aa",
          application: "Web", //bunu yeni ekledim
          status: "accept",
          saved_data_id: 1,
          days: 30,
          cost: 119.5,
        },
      ],
    },
    {
      request: [
        {
          id: "2",
          request_user: "abdullah",
          application: "App", //bunu yeni ekledim
          status: "recekt",
          saved_data_id: 1,
          days: 30,
          cost: 119.5,
        },
      ],
    },
  ]);
}); */
