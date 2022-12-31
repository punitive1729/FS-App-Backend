const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');
const connectDB = require('./db');
const PORT = process.env.PORT || 8000;

// Connect to server
app.listen(PORT, async () => {
  console.log(process.env.ALLOWED_CLIENTS);
  console.log(process.env.BASE_URL);
  console.log(process.env.MONGO_DB_URL);
  console.log(process.env.ALLOWED_CLIENTS);
  console.log(process.env.ALLOWED_CLIENTS);
  await connectDB(process.env.MONGO_DB_URL);
  console.log(`listening on PORT: ${PORT}`);
});
