const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { connectDB } = require('./db');

app.use(cors());
app.use(express.json());
app.use('/api/places', require('./routes/place.routes'));

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});