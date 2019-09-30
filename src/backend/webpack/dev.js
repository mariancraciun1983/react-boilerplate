import webpack from 'webpack';
import path from 'path';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import config from '../../../config';

const getPlugins = function() {
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: true,
    __CONFIG__: JSON.stringify(config.frontend.app)
  };

  const plugins = [];
  plugins.push(new webpack.ProvidePlugin({}));
  plugins.push(new webpack.DefinePlugin(GLOBALS));
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
    }),
  );
  plugins.push(new webpack.NamedModulesPlugin());
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.NoEmitOnErrorsPlugin());
  plugins.push(
    new ProgressBarPlugin({
      complete: '.',
      format: 'build [:bar] :percent  (:elapsed seconds)\n',
      clear: false,
      summary: false,
    }),
  );
  return plugins;
};

const getEntry = function() {
  const entry = [];
  entry.push('react-hot-loader/patch');
  entry.push('./src/frontend/core/polyfill');
  entry.push('webpack-hot-middleware/client?reload=true');
  entry.push('./src/frontend/index.dev.js');

  return entry;
};

const getRules = function() {
  const rules = [
    {
      test: /\.jsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: ['react-hot-loader/babel'],
          },
        },
      ],
      exclude: /node_modules/,
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            injectType: 'lazySingletonStyleTag',
            insert: 'head',
          },
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './src/frontend/.postcssrc',
            },
          },
        },
        {
          loader: 'sass-loader?sourceMap=0',
          options: {
            sassOptions: {
              sourceMap: false,
            },
          },
        },
      ],
    },
  ];
  return rules;
};

const getResolve = function() {
  return {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  };
};

const getOutput = function() {
  return {
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: 'chunk_[name].[chunkhash].js',
  };
};

function getConfig() {
  return {
    mode: 'development',
    context: path.resolve('./'),
    entry: getEntry(),
    output: getOutput(),
    module: {
      rules: getRules(),
    },
    plugins: getPlugins(),
    resolve: getResolve(),
    devtool: 'eval', // 'source-map',
    target: 'web',
    stats: {
      colors: true,
      children: false,
      chunks: true,
      chunkModules: false,
      modules: true,
    },
    watchOptions: {
      poll: 1000, // Check for changes every second,
      aggregateTimeout: 300,
      ignored: /node_modules/,
    },
  };
}
module.exports = getConfig;
