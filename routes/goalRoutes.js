const express = require('express')
const router = express.Router()
const  { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')// requiero las funcionalidades de controllers

const { protect } = require("../middleware/authMiddleware")
//cambio el "app.get" por el "router.get"
router.get('/',protect, getGoals) // creo la funcionalidad en controllers y le paso el codigo que antes estaba aca

  router.post('/',protect, setGoal)

  router.put('/:id',protect, updateGoal )

  router.delete('/:id',protect, deleteGoal)



module.exports = router