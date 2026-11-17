<script setup lang="ts">
import '~/assets/nuxt.css'

const { language, slug, pathFor } = usePortfolioRouting()
const palettes: Record<string, [string, string, string]> = {
  portfolio: ['#46bd2c', '#1a9a1e', '#aa6812'],
  fintech: ['#6d7372', '#788381', '#565757'],
  quests: ['#856100', '#aa800d', '#bb720c'],
  kpd: ['#4fac50', '#db7a03', '#bbbb0c'],
  logistic: ['#046959', '#024138', '#9c8000'],
  restaurant: ['#671c2d', '#4b2222', '#610118'],
  barber: ['#275ff4', '#580a0a', '#032fa7'],
}
const backdrop = computed(() => {
  const [first, second, third] = palettes[slug.value] ?? ['#321459', '#042552', '#580952']
  return { '--bg-blob-1': first, '--bg-blob-2': second, '--bg-blob-3': third }
})

useHead(() => ({
  htmlAttrs: { lang: language.value },
  link: [
    { rel: 'canonical', href: `https://max-ermolov.work${pathFor(slug.value)}` },
    ...(['ru', 'en'] as const).map(lang => ({
      rel: 'alternate' as const,
      hreflang: lang,
      href: `https://max-ermolov.work${pathFor(slug.value, lang)}`,
    })),
  ],
}))
</script>

<template>
  <div class="portfolio-site">
    <SitePreloader />
    <a class="skip-link" href="#main-content">{{ language === 'en' ? 'Skip to content' : 'К содержанию' }}</a>
    <div class="bg-mesh" :style="backdrop" aria-hidden="true">
      <div class="blob blob-1" />
      <div class="blob blob-2" />
      <div class="blob blob-3" />
    </div>
    <SiteHeader />
    <main id="main-content" class="content">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
