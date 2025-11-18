const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();
const ejs = require("ejs");
const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;
app.set("view engine", "ejs");
// const bcrypt = require("bcryptjs");
// const saltRounds = 10;
// const nodemailer = require('nodemailer')
const User = require('./models/user.models')
const userRoutes = require('./routes/user.routes')
const cors = require('cors')
app.use(cors ({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT,', 'DELETE', 'PATCH'],
  credentials: true
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', userRoutes)



mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  // let userSchema = new mongoose.Schema ({
  //   firstName: {
  //     type:String,
  //     required: [true, "First Name is required"],
  //     match: [/^[A-Za-z]+$/, 'First Name must contain only letters'],
  //     trim: true,
  //   },

  //   lastName: {
  //     type:String,
  //     required: [true, 'Last Name is required'],
  //     match: [/^[A-Za-z]+$/, 'Last name must contain only letters'],
  //     trim: true,
  //   },

  //   email: {
  //     type:String,
  //     required: [true, 'Email is required'],
  //     unique: [true, 'Email has been used, please choose another email'],
  //     match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
  //     lowercase: true,
  //   },

  //   password: {
  //     type:String,
  //     require:true,
  //   }
  // })

  // const User = mongoose.model('user', userSchema)


// app.get("/signup", (req, res) => {
//   res.render("signup");
// });

// app.get("/signin", (req, res) => {
//   res.render("signin");
// });

// app.post('/signup', (req, res)=>{
//   const {firstName, lastName, email, password} = req.body
//   console.log(req.body)

//   const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   if(!strongPasswordRegex.test(password)) {
//     return res.status(400).send("password must be at least 8 characters long, contain uppercase, lowercase, a number, and a special character")
//   }

//   User.findOne({email})
//   .then((existingUser)=>{
//     if (existingUser) {
//       res.status(400).send('Email already exists')
//       return Promise.reject('User already exists')
//     }

//     return bcrypt.hash(password, saltRounds);
//   })
//   .then((hashedPassword)=>{
//     if(!hashedPassword) return;

//     const newUser = new User ({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword
//     });
//     console.log(newUser)
//     return newUser.save();
//   })
//   .then((savedUser)=>{
//     if(!savedUser) return;
//     console.log("User registered successfully")
//     let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'timetomisin@gmail.com',
//         pass: 'orqlgprdubicojpt'
//       }
//     });
//     let mailOptions = {
//       from: 'timetomisin@gmail.com',
//       to: [req.body.email],
//       subject: 'Welcome to Our Application',
//       html: `<div style='background: #f4f6fb; padding: 40px 0; font-family:"Segoe UI", Arial, sans-serif;'>
//               <div style='max-width: 480px; margin: auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08); overflow: hidden;'>
//               <div style='background: linear-gradient(90deg, #4f8cff 0%, #38c6fa 100%); padding: 24px 32px; color: #fff; text-align: center'>
//               <h1 style='margin: 0; font-size: 2rem; font-weight: 700; letter-spacing: 1px;'>Welcome to Our Application</h1>
//               </div>
//               <div style='padding: 32px 32px 24px 32px; text-align: center'>
//               <p style='font-size: 1.1rem; margin-bottom: 16px; color: #333;'><strong>Congratulations!</strong> Your sign-up was successful!</p>
//               <p style='font-size: 1rem; margin-bottom: 16px; color: #333;'>Thank you for registering. We are excited to have you on board</p>
//               <hr style='border: none; border-top: 1px solid #435; margin: 24px 0;'>
//               <p style='font-size: 0.95rem; color: #888;'>Best Regards,<br>< style='font-weight: 600; color: #4f8cff;'>Your Application Team</p>
//               </div>
//               </div>
//       </div>`
//     }
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error)
//       } else {
//         console.log('Email sent:' + info.responsible)
//       }
//     })
//     res.redirect('/signin')
//   })
//   .catch((err)=>{
//     if (err !== 'User already exits') {
//       console.error('Error saving user', err);
//       res.status(500).send('Internal server error')
//     }
//   });
// });

// app.post("/signin", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.send("Invalid credentials entry — user not found");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.send("Invalid credentials entry");
//     }

//     res.render("dashboard", { 
//   firstname: user.firstName, 
//   lastname: user.lastName 
// });

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error signing in");
//   }
// });


// app.post("/signin", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email, password });

//     if (user) {
//       res.render("dashboard", { firstname: user.firstname });
//     } else {
//       res.send("Invalid crendentials entry");
//     }
//   } catch (err) {
//     console.log(err);
//     res.send("Error signing in");
//   }
// });

app.listen(3000, () => console.log("Server running on port 3000"));


