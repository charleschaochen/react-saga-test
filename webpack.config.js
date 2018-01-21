var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = function (env) {
    var bRelease = env && env.release;
    return {
        target: 'web',
        entry: [
            'babel-polyfill',
            './src/index',
            ...!bRelease ? [
                'webpack-hot-middleware/client?reload=true'
            ] : []
        ],
        output: {
            filename: !bRelease ? '[name].js' : 'bundle/[name]' + '.[hash:8].js',
            path: path.resolve(__dirname, 'build')
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: [path.resolve(__dirname, 'src')],
                    loader: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.less/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.(png)|(jpeg)|(gif)$/,
                    use: [
                        'url-loader'
                    ]
                }
            ]
        },
        resolve: {
            modules: [
                'node_modules',
                path.resolve(__dirname, 'src')
            ],
            extensions: ['.js', '.jsx']
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(!bRelease ? 'development' : 'production')
                }
                , 'global': {__isRelease: bRelease}, // bizarre lodash(?) webpack workaround
                'global.GENTLY': false // superagent client fix
            }),

            new HtmlWebpackPlugin({
                title: 'Charles | Redux Saga learning',
                template: 'underscore-template-loader!index.html'
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: module => /node_modules/.test(module.resource)
            }),

            //["transform-runtime", {
            //    "polyfill": false,
            //    "regenerator": true
            //}],

            ...!bRelease ? [] : [
                new webpack.optimize.UglifyJsPlugin({
                    text: /\.jsx?$/,
                    sourceMap: true,
                    compress: {
                        warnings: false
                    }
                })
            ]
        ],

        node: {
            console: false,
            global: false,
            __dirname: false
        },
        devtool: !bRelease ? 'inline-source-map' : 'source-map',
    }
}