const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usersmodel = new Schema({
  /* id: { required: true, type: Number }, */
  name: String,
  email: String,
  address: {
    street_and_no: String,
    zip_code: Number,
    city: String,
    state: String,
    country: String,
  },
  contact: {
    name: String,
    email: String,
    tel: Number,
    mobile: Number,
    fax: Number,
  },
  password: String,
  userType: { default: "user", type: String },
});

module.exports = mongoose.model("Usersmodel", Usersmodel);
