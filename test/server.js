const app = require('express')();

app.get('/', (req, res) => {
  res.end('<html><body><h1>Title</h1></body></html>');
});
app.listen(3000);
