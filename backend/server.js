const express = require('express');
const apiRoutes = require('./routes/api');
const path = require('path');
const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// API routes
app.use('/api', apiRoutes);

// Start server
var server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
