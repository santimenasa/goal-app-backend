const express = require('express')
const router = express.Router()
const  { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')// requiero las funcionalidades de controllers
//cambio el "app.get" por el "router.get"
router.get('/', getGoals) // creo la funcionalidad en controllers y le paso el codigo que antes estaba aca

  router.post('/', setGoal)

  router.put('/:id', updateGoal )

  router.delete('/:id', deleteGoal)



module.exports = router