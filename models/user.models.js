const mongoose = require('mongoose')


let userSchema = new mongoose.Schema ({
    firstName: {
      type:String,
      required: [true, "First Name is required"],
      match: [/^[A-Za-z]+$/, 'First Name must contain only letters'],
      trim: true,
    },

    lastName: {
      type:String,
      required: [true, 'Last Name is required'],
      match: [/^[A-Za-z]+$/, 'Last name must contain only letters'],
      trim: true,
    },

    email: {
      type:String,
      required: [true, 'Email is required'],
      unique: [true, 'Email has been used, please choose another email'],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
      lowercase: true,
    },

    password: {
      type:String,
      require:true,
    }
  })

  module.exports = mongoose.model('user', userSchema) 