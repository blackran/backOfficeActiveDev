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

module.exports = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH
}

module.exports = {
    async redirects () {
        return [
            {
                source: '/',
                destination: '/Login',
                permanent: true
            }
        ]
    }
}
