const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  async headers() {
    (
      source:'/',
      headers:[
        {
          key: `Cache-Control`,
          value:'public, max-age=60, s-maxage=86400, stale-while-revalidate=86400`
        },
        ]
       )},
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
