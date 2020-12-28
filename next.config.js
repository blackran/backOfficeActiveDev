module.exports = {
    webpack: (config, { dev }) => {
        config.module.rules.push(
            {
                test: /\.test.js$/,
                loader: 'ignore-loader'
            }
        )
        return config
    }
}

module.exports = {
    webpack: (config, { webpack }) => {
        config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
        return config
    }
}
