var mongoose = require('mongoose');

var qSchema = mongoose.Schema({
  question:String,
  answer:String,
  //mail:String,
  create_date:Number
});
var Enigma = mongoose.model("Enigma",qSchema);
module.exports=Enigma;