<script setup lang="ts">
import { profileContacts } from '~/content/profile'

const { language, slug, pathFor } = usePortfolioRouting()
const isProject = computed(() => Boolean(slug.value && slug.value !== 'portfolio'))
const names = {
  ru: { about: 'Обо мне', portfolio: 'Портфолио', nav: 'Основная навигация', back: 'Назад' },
  en: { about: 'About me', portfolio: 'Portfolio', nav: 'Main navigation', back: 'Back' },
}
</script>

<template>
  <nav class="site-navbar" :class="isProject ? 'back-and-lang' : 'navbar-frame'" :aria-label="names[language].nav">
    <NuxtLink v-if="isProject" v-magnetic :to="pathFor('portfolio')" class="btn btn-back">
      <span aria-hidden="true">←</span> {{ names[language].back }}
    </NuxtLink>
    <template v-else>
      <span class="logo" aria-hidden="true"><img :src="'/images/Logo.svg'" alt="" class="logo-img"></span>
      <div class="nav-menu-pill">
        <NuxtLink :to="pathFor()" class="nav-pill-item" :class="{ active: !slug }" :aria-current="!slug ? 'page' : undefined">
          {{ names[language].about }}
        </NuxtLink>
        <NuxtLink :to="pathFor('portfolio')" class="nav-pill-item" :class="{ active: slug === 'portfolio' }" :aria-current="slug === 'portfolio' ? 'page' : undefined">
          {{ names[language].portfolio }}
        </NuxtLink>
      </div>
      <div class="social-icons">
        <a v-for="contact in profileContacts" :key="contact.name" class="social-link" :href="contact.href" :aria-label="contact.label">
          <img :src="contact.icon" alt="" class="nav-icon">
        </a>
      </div>
    </template>
    <div class="lang-switcher-pill">
      <NuxtLink v-for="lang in ['ru', 'en'] as const" :key="lang" :to="pathFor(slug, lang)" :lang="lang" :hreflang="lang"
        class="lang-flag-wrapper" :class="{ active: lang === language }" :aria-current="lang === language ? 'true' : undefined"
        :aria-label="lang === 'ru' ? 'По-русски' : 'In English'">
        <img :src="`/images/flag-${lang}.svg`" alt="" class="flag-img">
      </NuxtLink>
    </div>
  </nav>
  <div class="navbar-bg" aria-hidden="true" />
</template>
