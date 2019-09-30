import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigBuilder from '../webpack/dev';

const basePath = path.join(__dirname, '../../');
const router = express.Router();
const webpackConfig = webpackConfigBuilder();
const compiler = webpack(webpackConfig);

router.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    lazy: false,
    logLevel: 'info',
    publicPath: webpackConfig.output.publicPath,
  }),
);
router.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
router.use(webpackHotMiddleware(compiler));
router.all('*', (req, res) => {
  res.sendFile(path.join(basePath, '/public/dev/index.html'));
});

export default router;
