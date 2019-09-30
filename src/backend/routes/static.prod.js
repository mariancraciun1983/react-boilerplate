import express from 'express';
import path from 'path';

const basePath = path.join(__dirname, '../../../release');
const router = express.Router({ strict: false });
const options = {
  dotfiles: 'ignore',
  maxAge: '1d',
  redirect: false,
  etag: true,
};

router.use('/', express.static(basePath, options));

export default router;
