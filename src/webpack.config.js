const path = require('path');
    
module.exports = {
    return {
        entry: path.resolve(__dirname, './main.js'), // 入口
        module: {
            rules: [
                {
                    test: /.vue$/,
                    use: 'vue-loader'
                },
                {
                  test: /\.(css|scss|sass)$/,
                  use: [
                      'style-loader',
                      'css-loader',
                      'postcss-loader',
                      'sass-loader'
                  ]
                }
            ]
        },
        plugins: [new VueLoaderPlugin()]
    }
}