import path from 'path';
import webpack from 'webpack';

import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';

const reactVendors = [
  'react',
  'react-dom',
  'react-router-dom',
  'react-redux',
  'react-hot-loader',
  'redux',
  'redux-devtools',
  'redux-devtools-dock-monitor',
  'redux-devtools-log-monitor',
  'redux-logger',
  'redux-thunk',
  'connected-react-router',
];

const materializeVendors = [
  'materialize-css',
];

const immutableVendors = [
  'immutable',
];

const miscVendors = [
  'lodash',
  'prismjs',
];

// Base config
const config = {
  // Production mode
  mode: 'production',

  // The base directory, an absolute path, for resolving entry points and loaders from configuration
  context: path.resolve(__dirname),

  // Start entry point(s)
  entry: {
    react: reactVendors,
    materialize: materializeVendors,
    immutable: immutableVendors,
    misc: miscVendors,
  },

  // Affecting the output of the compilation
  output: {
    // path: the output directory as an absolute path (required)
    path: path.resolve(__dirname, 'frontend/dist/dll/'),
    // filename: specifies the name of output file on disk (required)
    filename: '[name]_dll.js',
    // library: name of the generated dll reference
    library: '[name]_dll',
  },

  // A list of used webpack plugins
  plugins: [
    // Better building progress display
    new ProgressBarWebpackPlugin({
      clear: false,
    }),
    // jQuery support
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery',
    }),
    // Output manifest json file for each generated dll reference file
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'frontend/dist/dll/[name]_manifest.json'),
      name: '[name]_dll',
    }),
  ],

  // Turn off performance hints (assets size limit)
  performance: {
    hints: false,
  },
};

export default config;
