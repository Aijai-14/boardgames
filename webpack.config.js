const path = require('path');
// './sudoku_game/static/js/userInput.js', 
// './sudoku_game/static/js/checkSolution.js'

module.exports = {
    entry: ['./sudoku/static/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'static/js'),
        filename: 'bundle.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'static'),
        compress: true,
        port: 9000,
    },
};
