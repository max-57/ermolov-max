<script setup lang="ts">
import { profileContacts, resumeUrl } from '~/content/profile'

const { language, slug, pathFor } = usePortfolioRouting()
const email = profileContacts.find(contact => contact.name === 'mail')!.href
const names = {
  ru: { home: 'Главная', name: 'Максим Ермолов', portfolio: 'Проекты', nav: 'Основная навигация', contact: 'Связаться', resume: 'Резюме' },
  en: { home: 'Home', name: 'Maxim Ermolov', portfolio: 'Work', nav: 'Main navigation', contact: 'Contact', resume: 'Résumé' },
}
</script>

<template>
  <header class="site-header">
    <nav class="site-header-inner" :aria-label="names[language].nav">
      <NuxtLink :to="pathFor()" class="site-brand" :aria-label="names[language].home" :aria-current="!slug ? 'page' : undefined">
        <img src="/images/Logo.svg" alt="" width="27" height="27">
        <span>{{ names[language].name }}</span>
      </NuxtLink>
      <div class="site-nav-links">
        <NuxtLink :to="pathFor('portfolio')" :class="{ active: Boolean(slug) && slug !== 'reviews' }" :aria-current="slug === 'portfolio' ? 'page' : undefined">
          {{ names[language].portfolio }}
        </NuxtLink>
        <a :href="email">{{ names[language].contact }}</a>
        <a :href="resumeUrl" class="site-nav-resume">{{ names[language].resume }}</a>
      </div>
      <div class="site-languages">
        <NuxtLink v-for="lang in ['ru', 'en'] as const" :key="lang" :to="pathFor(slug, lang)" :lang="lang" :hreflang="lang"
          :aria-current="lang === language ? 'true' : undefined" :aria-label="lang === 'ru' ? 'По-русски' : 'In English'">
          {{ lang.toUpperCase() }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
