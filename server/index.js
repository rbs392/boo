import http from 'http';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

/* Statics*/
app.use(express.static(`${__dirname}/app`));

/* Api */
app.get('/api/page', (request, response) => {
  const { url } = request.query;
  const httpReq = http.get(url, (socket) => {
    let data = '';
    socket.on('data', (chunk) => { data += chunk; });
    socket.on('end', () => {
      response.status(200).json({ data });
    });
    socket.on('error', (err) => {
      response.status(500).json({ err });
    });
  });
  httpReq.on('error', (err) => {
    response.status(500).json({ err });
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started on port: ${PORT}`);
  }
});
