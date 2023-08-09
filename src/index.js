const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5100;

const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use('/uploads', express.static('uploads'));

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Adding Routes
app.use('/users',userRoutes);
app.use('/contacts',contactRoutes);

// Initial API Call
app.get("/", (req, res) =>{
    res.send("Email API YouWeUs INC")
});


// MongoDB connection

const mongoDBURL = process.env.MONGODB_URL;
mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the application on connection error
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});