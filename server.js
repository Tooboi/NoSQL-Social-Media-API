const express = require('express');
const db = require('./config/connection');

// - Require models
// const { Genre } = require('./models'); EXAMPLE


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// once db connection is made, run server
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  