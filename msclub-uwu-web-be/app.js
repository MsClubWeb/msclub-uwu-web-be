const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const adminRoutes = require('./routes/admin');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);


app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({message: 'Something went wrong!'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('Database synced ');
  })
  .catch(err => {
    console.error('Sync error :', err);
  });
