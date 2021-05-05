const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RequestsSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "Usersmodel" },
  status: {default:"waiting" , type:String},
  request:String,
  questions: [
      {
    question: String,
    answers:[
        {
            isSelected:Boolean,
            text:String
        }
    ]
  }
  ],
  days:Number,
  cost:Number,
  
});



module.exports = mongoose.model("Requests", RequestsSchema);