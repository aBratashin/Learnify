module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.yandex.net',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'secure.gravatar.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'cdn.discordapp.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'old-images.hb.ru-msk.vkcs.cloud',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'old-images.hb.ru-msk.vkcs.cloudhttp',
				pathname: '**'
			}
		]
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(rule =>
			rule.test?.test?.('.svg')
		)

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/
			},

			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: ['@svgr/webpack']
			}
		)

		fileLoaderRule.exclude = /\.svg$/i

		return config
	}
}
