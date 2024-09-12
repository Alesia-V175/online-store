const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    port: 'auto',
    watchFiles: path.join(__dirname, 'src'),
  },
};

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: path.resolve(__dirname, './src/index.ts'),
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[file]',
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [{loader: MiniCssExtractPlugin.loader, options: { publicPath: './' }}, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [{loader: MiniCssExtractPlugin.loader, options: { publicPath: './' }}, 'css-loader', 'sass-loader']
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new CopyPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, './src'),
          globOptions: {
            ignore: [
              '**/*.js',
              '**/*.ts',
              '**/*.scss',
              '**/*.html',
              '**/*.json',
            ],
          },
          noErrorOnMissing: true,
          force: true,
        }
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.scss'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      database: path.resolve(__dirname, 'src/database/'),
      types: path.resolve(__dirname, 'src/types/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      helpers: path.resolve(__dirname, 'src/helpers/'),
    },
  },
  ...devServer(development)
});
