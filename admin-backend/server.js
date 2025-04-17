const express = require('express');
const app = express();
require('dotenv').config();
const adminRoutes = require('./routes/admin');

// Middleware
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
