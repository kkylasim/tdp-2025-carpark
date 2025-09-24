const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Server is running!');
});

const carparksRoute = require('./routes/carparks');
app.use('/api/carparks', carparksRoute);

// Only start the server if the file is run directly
if (process.env.NODE_ENV !== 'test') {
 app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
 });
}
// Export the app for testing
module.exports = app;
