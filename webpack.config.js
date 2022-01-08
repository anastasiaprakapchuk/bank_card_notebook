const path = require("path");

const  MiniCssExtractPlugin = require("mini-css-extract-plugin");
const  HTMLWebpackPlugin = require("html-webpack-plugin");
const extractCSS = new MiniCssExtractPlugin({
    filename: "bundle.css"
});

module.exports = { 
    entry: ["regenerator-runtime/runtime.js","./index.js"], // основной файл приложения["babel-polyfill", "./app.js"]
    output:{ 
        path: __dirname, // путь к каталогу выходных файлов
        filename: "bundle.js"  // название создаваемого файла 
    }, 
    mode: "development",
    devtool:"source-map",
    module:{ 
        rules:[
            { 
                test: /\.jsx?$/, // какие файлы обрабатывать
                exclude: /node_modules/, // какие файлы пропускать
                use: { loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    
                  },},
                  
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            }, 
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: {loader: "file-loader",
                options: {
                  outputPath: "./public/img" // Chage this like 'public/images' or any other relative path to the root
                }}
            },        
        ], 
    },
    plugins: [
        extractCSS,
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
            inject: false
        })
    ],
    // devServer: {
    //     hot: true,
    //     liveReload: true,
    //     webSocketServer: false,
    //     port: 8080,
    //   },
      experiments: {
       
        topLevelAwait: true,
      },
};