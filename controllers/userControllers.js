const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//=============================================================================================================================================================
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//@desc  Register a new User
//@route POST/api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  //1) set the logic
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields must be completed");
  }
  //2)check if the user already exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("The User already exist");
  }
  //3)hash the password with bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //4) Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });
  if (user) {
    res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//@desc  Authenticate User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
 const { email, password } = req.body
 //obtengo el mail 
  const user = await User.findOne({email}) 
  //lo macheo con la contrasenia
if (user && (await bcrypt.compare(password, user.password))) {//usar compare que es un metodo de bcrypt para comparar la pass hasheada con el usuari y la pass
    res.json({
        _id:user.id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    })
} else{
    res.status(400)
    throw new Error("Email or password are incorrect")
} 
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//@desc  get User data
//@route Get /api/users/me
//@access private
const getMe = asyncHandler(async (req, res) => {
 const { _id,name, email } = await User.findById(req.user.id)
 res.status(200).json({
  _id:_id,
  name,
  email,
 })
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//Generate JWT
const generateToken = (id) => {//esta funcion va en register y en login
return jwt.sign({ id }, process.env.JWT_SECRET,{
    expiresIn:'30d'
})
}
//=============================================================================================================================================================
module.exports = { registerUser, loginUser, getMe };
