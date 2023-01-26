const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  require('child_process').fork('./schemacleaner.js');
  res.send('Schema Cleaner Called Successfully!');
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
