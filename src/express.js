const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from the test server!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Test server running at http://192.168.0.183:${port}`);
});