const path = require("path");
 
module.exports = {
  entry: "./src/client/index.tsx",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json"]
  },
  output: {
    path: path.join(__dirname, "dist/client"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: false,
            plugins: ["@babel/plugin-transform-regenerator", "@babel/plugin-transform-runtime"],
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: "last 2 versions" } } // or whatever your project requires
              ],
              "@babel/preset-typescript",
              "@babel/preset-react"
            ],
          }
        }
      },
      {
        test: /\.s?(a|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  }
};