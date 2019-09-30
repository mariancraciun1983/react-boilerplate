import express from 'express';
import path from 'path';

const devBasePath = path.join(__dirname, '../../public/dev/');
const assetsBasePath = path.join(__dirname, '../../assets/');
const router = express.Router({ strict: false });
const options = {
  dotfiles: 'ignore',
  maxAge: '1d',
  redirect: false,
  etag: true,
};

const rootFiles = ['index.css', 'index.js', 'manifest.json'];
rootFiles.forEach(file => {
  router.use(`/${file}`, express.static(path.join(devBasePath, file), options));
});
router.use(
  '/favicon.ico',
  express.static(path.join(assetsBasePath, 'images/favicon/favicon.ico'), options),
);
router.use('/assets', express.static(assetsBasePath, options));

export default router;
