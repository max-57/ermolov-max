import { projects } from '~/content/projects'
import { canonicalSlug, localizedPath } from '~/utils/portfolioRoutes'

export default defineNuxtPlugin(() => {
  const router = useRouter()
  const pages = new Set(['', 'portfolio', 'reviews', ...projects.map(project => project.slug)])

  onNuxtReady(() => {
    const redirect = () => {
      const { hash, path, query } = router.currentRoute.value
      const englishHome = /^\/en\/?$/.test(path)
      if ((path !== '/' && !englishHome) || !hash || hash === '#') return

      const slug = canonicalSlug(hash.slice(1))
      if (!pages.has(slug)) return

      let english = englishHome
      try {
        english ||= localStorage.getItem('preferred_lang') === 'en'
      } catch {
        // Browsers that block local storage still follow the legacy link.
      }
      void router.replace({ path: localizedPath(slug, english ? 'en' : 'ru'), query })
    }
    redirect()
    window.addEventListener('hashchange', redirect)
  })
})
