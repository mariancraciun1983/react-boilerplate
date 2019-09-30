import webpack from 'webpack';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin'
import crypto from 'crypto';
import config from '../../../config';



const baseDir = path.join(__dirname, '../../../');
const destination = path.join(baseDir, 'release');
const version = crypto.createHash('md5').update(Math.random().toString()).digest('hex');

const getPlugins = function() {
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false,
    __CONFIG__: JSON.stringify(config.frontend.app)
  };
  const plugins = [];
  plugins.push(new CleanWebpackPlugin({
    dry: false,
    verbose: true,
  }));
  plugins.push(new HtmlWebpackPlugin({
    version,
    template: 'src/public/prod/index.html',
    filename: 'index.html',
    inject: false
}));
  plugins.push(new webpack.ProvidePlugin({}));
  plugins.push(new webpack.DefinePlugin(GLOBALS));
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  );
  plugins.push(new webpack.NamedModulesPlugin());
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  plugins.push(new webpack.NoEmitOnErrorsPlugin());
  plugins.push(new webpack.HashedModuleIdsPlugin());
  plugins.push(new CopyWebpackPlugin([
    { from: 'src/public/prod/', to: '', ignore: 'index.html'},
    { from: 'src/assets', to: 'assets' },
  ], {
      debug:'debug'
  }));

  if (process.env.NODE_ENV === 'analyse') {
    plugins.push(new BundleAnalyzerPlugin({
        analyzerHost: '0.0.0.0',
        analyzerPort: '8888',
        logLevel: 'warn',
    }));
  }

  return plugins;
};

const getOptimization = function() {
  const minimizer =  [
    new TerserPlugin({
      sourceMap: true,
      terserOptions: {
        ecma: undefined,
        warnings: false,
        parse: {},
        compress: {},
        mangle: true,
        module: false,
        output: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      },
    }),
  ];

  const splitChunks = {
    chunks: 'all',
    maxInitialRequests: Infinity,
    minSize: 0,
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all'
      }
    },
  };
  return {
    minimize: true,
    minimizer,
    splitChunks,
  }
}

const getEntry = function() {
  const entry = [];
  entry.push('./src/frontend/core/polyfill/index.js');
  entry.push('./src/frontend/index.prod.js');
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
              path: 'src/frontend/.postcssrc',
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

    },
  };
};

const getOutput = function() {
  return {
    path: destination,
    publicPath: config.frontend.build.jsBaseDir, //__webpack_public_path__ = 'https://CDN?';
    filename: 'code/[name].[hash].js',
    pathinfo: false,
    chunkFilename: 'code/chunk_[name].[hash].js',
  };
};

function getConfig() {
  return {
    mode: 'production',
    context: baseDir,
    entry: getEntry(),
    output: getOutput(),
    optimization: getOptimization(),
    module: {
      rules: getRules(),
    },
    plugins: getPlugins(),
    resolve: getResolve(),
    devtool: 'cheap-source-map',
    target: 'web',
    stats: {
      colors: true,
      children: false,
      chunks: true,
      chunkModules: false,
      modules: true,
    }
  };
}
module.exports = getConfig;
