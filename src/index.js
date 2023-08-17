const express = require('express');
const cors = require('cors');
const databaseConnection = require('./database');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

app.listen(process.env.PORT || 3001, databaseConnection());
