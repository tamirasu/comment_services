require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const commentRoutes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/comments', commentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
