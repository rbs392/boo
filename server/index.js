import Url from 'url';
import http from 'http';
import https from 'https';
import cheerio from 'cheerio';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

/* Statics*/
app.use(express.static(`${__dirname}/app`));

/* Api */
app.get('/api/page', (request, response) => {
  const { url } = request.query;
  const urlObj = Url.parse(url);
  const hostname = `${urlObj.protocol}//${urlObj.hostname}`;
  const client = (urlObj.protocol === 'http:') ? http : https;
  const httpReq = client.get(url, (socket) => {
    let data = '';
    socket.on('data', (chunk) => { data += chunk; });
    socket.on('end', () => {
      const $ = cheerio.load(data);
      ['src', 'href'].forEach((attr) => {
        $(`[${attr}]`).each((i, el) => {
          const val = $(el).attr(attr);
          if (val && !(/(data)|(http)/.test(val))) {
            // TODO: handle urls without / or .
            const resolvedUrl = Url.resolve(hostname, val);
            $(el).attr(attr, resolvedUrl);
          }
        });
      });
      response.status(200).json({ data: $('html').html() });
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
