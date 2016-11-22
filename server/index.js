import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

console.log('__dirname')
console.log(__dirname)
app.use(express.static(`${__dirname}/app`));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started on port: ${PORT}`);
  }
});
