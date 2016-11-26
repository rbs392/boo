const app = require('express')();

app.get('/', (req, res) => {
  res.end('<html><body><h1>Title</h1><h2>What is this </h2></body></html>');
});
app.listen(3000);
