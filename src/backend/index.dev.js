import express from 'express';
import comp from 'compression';

import routes from './routes';
import config from '../../config';

const app = express();
const {ip, url, port, etag, compression} = config.backend.http;

app.set('etag', etag);
if (compression) {
  app.use(comp());
}

app.listen(port, ip, err => {
  if (err) throw err;
  routes('dev')(app);

  console.log('\n----------------------');
  console.log(`Listening on port ${ip}:${port}.`);
  console.log(`Open up ${url} in your browser.`);
  console.log('----------------------\n');
});
