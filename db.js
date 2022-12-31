const mongoose = require('mongoose');
const connectDB = async () => {
  const dbUrl = process.env.MONGO_DB_URL;
  try {
    mongoose.connect(dbUrl);
    console.log('Connected to DB');
  } catch (err) {
    console.log('Error connecting to DB', err);
  }
};
module.exports = connectDB;
