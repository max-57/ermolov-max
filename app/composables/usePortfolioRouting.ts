import { canonicalSlug, localizedPath } from '~/utils/portfolioRoutes'

export function usePortfolioRouting() {
  const route = useRoute()
  const language = computed(() => /^\/en(?:\/|$)/.test(route.path) ? 'en' as const : 'ru' as const)
  const slug = computed(() => canonicalSlug(route.path.replace(/^\/en(?=\/|$)/, '').replace(/^\/|\/$/g, '')))
  const pathFor = (page = '', lang = language.value) => localizedPath(page, lang)

  return { language, slug, pathFor }
}
