<script setup lang="ts">
import '~/assets/nuxt.css'

const { language, slug, pathFor } = usePortfolioRouting()

useHead(() => ({
  htmlAttrs: { lang: language.value },
  link: [
    { rel: 'canonical', href: `https://max-ermolov.work${pathFor(slug.value)}` },
    ...(['ru', 'en'] as const).map(lang => ({
      rel: 'alternate' as const,
      hreflang: lang,
      href: `https://max-ermolov.work${pathFor(slug.value, lang)}`,
    })),
    { rel: 'alternate', hreflang: 'x-default', href: `https://max-ermolov.work${pathFor(slug.value, 'ru')}` },
  ],
}))
</script>

<template>
  <div class="portfolio-site">
    <SitePreloader />
    <a class="skip-link" href="#main-content">{{ language === 'en' ? 'Skip to content' : 'К содержанию' }}</a>
    <SiteHeader />
    <main id="main-content" class="content" tabindex="-1">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
