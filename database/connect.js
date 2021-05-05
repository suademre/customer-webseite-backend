const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://suad:test123@cluster0.crx67.mongodb.net/connect?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      }
    )
    .then(() => console.log("Success to Connection"))
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;
