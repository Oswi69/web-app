const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', itemRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log("Database synced.");
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
