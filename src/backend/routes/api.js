import express from 'express';

import mockData from '../../../__mock__/api';
const bodyParser = require('body-parser');
const router = express.Router();
router.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-authentication',
  );
  next();
});

router.use(bodyParser.json());
router.use((req, res, next) => {
  res.reply = function(data = '', status = 200, statusMessage = 'OK', dataType = 'json') {
    res.statusMessage = statusMessage;
    if (dataType === 'json') {
      res.status(status).json(data);
    } else {
      res.status(status).send(data);
    }
  };

  res.error = function(data = '', status = 400, statusMessage = 'Server Error', dataType = 'json') {
    res.statusMessage = statusMessage;
    if (dataType === 'json') {
      res.status(status).json(data);
    } else {
      res.status(status).send(data);
    }
  };

  next();
});

router.route('/auth/login').post((req, res) => {
  if (!req.body.email) return res.error('BAD EMAIL');
  // https://snyk.io/blog/node-js-timing-attack-ccc-ctf/
  if (!req.body.password) return res.error('BAD PASSWORD');
  const { user, token } = mockData.user;
  return res.reply({ user, token });
});

router.route('/auth/token').post((req, res) => {
  if (!req.body.token) return res.error('Missing Token');
  const { user, token } = mockData.user;
  if (req.body.token === token) {
    return res.reply({ user, token });
  }
  return res.error('Invalid token');
});

router.route('/auth/register').post((req, res) => {
  const { user, token } = mockData.user;
  return res.reply({ user, token });
});

router.route('/genres').get((req, res) => {
  const { genres } = mockData;
  return res.reply({ genres });
});

router.route('/movies').get((req, res) => {
  const { movies } = mockData;
  return res.reply({ movies });
});

router
  .route('/cart')
  .get((req, res) => {
    const {
      user: { token },
    } = mockData;
    if (req.headers['x-authentication'] !== token) return res.error('Secure page');

    const { cart } = mockData;
    return res.reply({ cart });
  })
  .post((req, res) => {
    const {
      user: { token },
    } = mockData;
    if (req.headers['x-authentication'] !== token) return res.error('Secure page');

    // const { cart } = req.body;
    return res.reply({ success: true });
  });

router.route('*').all((req, res) => {
  return res.reply({
    info: 'This is the default /api handler',
    routes: ['/genres', '/movies', '/cart', '/auth/login', '/auth/register', '/auth/token'],
  });
});

export default router;
