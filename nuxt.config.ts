import { projects } from './app/content/projects'

const paths = ['', 'portfolio', 'reviews', 'about-me', 'logistics', 'quest-saas', ...projects.map(project => project.slug)]

export default defineNuxtConfig({
  compatibilityDate: '2026-11-17',
  devtools: { enabled: false },
  css: ['~~/Style.css'],
  hooks: {
    'pages:extend'(pages) {
      const english = pages.map((page) => {
        const home = page.path === '/'
        if (home) page.alias = ['/about-me']
        return {
          ...page,
          name: `${page.name}-en`,
          path: home ? '/en' : `/en${page.path}`,
          alias: home ? ['/en/about-me'] : undefined,
        }
      })
      pages.push(...english)
    },
  },
  app: {
    head: {
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/images/Logo.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap' },
      ],
    },
  },
  nitro: {
    publicAssets: [{ dir: '~~/images', baseURL: '/images' }],
    prerender: {
      routes: paths.flatMap(slug => [`/${slug}`, slug ? `/en/${slug}` : '/en']),
      failOnError: true,
    },
  },
})
