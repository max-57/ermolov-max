import type { Language } from '~/content/projects'

export function canonicalSlug(slug: string) {
  switch (slug) {
    case 'about-me': return ''
    case 'logistics': return 'ai-logistic'
    case 'quest-saas': return 'quests'
    default: return slug
  }
}

export function localizedPath(slug: string, language: Language) {
  const page = slug ? `/${slug}` : ''
  return language === 'en' ? `/en${page}` : page || '/'
}
