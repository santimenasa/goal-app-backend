const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongoDB connected successfully:${conn.connection.host}`.cyan);
  } 
  catch (error) {
    console.log(error);
  }
}

module.exports =  connectDB 