//punto de entrada al servidor
const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler} = require('./middleware/errorMIddleware')
const port = process.env.PORT || 5000   //ACORDARSE(npm i dotenv ===> crear archivo .env ===> crear las variables ===> process.env.laVariableQueQUIERO)
const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/goals',require('./routes/goalRoutes'))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server starts on port:${port}`)
})