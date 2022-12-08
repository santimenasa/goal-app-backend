const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel"); //ahora esta constante va a tener un monton de metodos de mongoose para interactuar con la db
const User = require("../models/userModel")
//@desc Get goals
//@route GET/api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user.id}); //metodo para obtener los documentos dentro de la coleccion
  res.status(200).json(goals);
});

//@desc Set goals
//@route POST /api/goals
//@access private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add some text field");
  }
  const goal = await Goal.create({ 
    text: req.body.text,
    user:req.user.id,//relaciono user con goal
  }); //metodo para crear un documento
  res.status(200).json(goal);
});

//@desc Update goals
//@route PUT /api/goals/id
//@access private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400).send("Goal not found");
  }
//ahora uqe tengo creado el modelo user, lo debo llamar
const user = await User.findById(req.user.id)
//check for user
if (!user) {
  res.status(401)
  throw new Error('User not found')
}
//make shure the loggedin user matches the goal user
if (goal.user.toString() !== user.id) {
  res.status(401)
  throw new Error('User not Authorized')
}

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.status(200).json({ updatedGoal });
});

//@desc Delete goals
//@route DELETE /api/goals/id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400).send("Goal not found");
  }

  const user = await User.findById(req.user.id)
//check for user
if (!user) {
  res.status(401)
  throw new Error('User not found')
}
//make shure the loggedin user matches the goal user
if (goal.user.toString() !== user.id) {
  res.status(401)
  throw new Error('User not Authorized')
}

  goal.remove();

  res.status(200).json({id: req.params.id});
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
};
