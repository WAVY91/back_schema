const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: [true, 'First name is required' ]},
  lastname:  { type: String, required: [true, 'Second name is required' ]},
  email:     { type: String, required: true, unique: [true, 'Email is required']},
  password:  { type: String, required: [true, 'Password is required']},
  date:      { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);


// const mongoose = require('mongoose')
// const userSchema = new mongoose.Schema({
//     firstName:String,
//     lastName:String,
//     email:String,
//     password:String
// })
// module.exports = mongoose.model('User', userSchema)