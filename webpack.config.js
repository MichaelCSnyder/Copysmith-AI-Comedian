const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/client/src/index',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build/build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/client/public/index.html')
        })
    ],
    mode: process.env.NODE_ENV,
    devServer: {
        proxy: { '/api': 'http://localhost:3000' },
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader' // translates CSS into CommonJS
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.css']
    }
};
