<script setup lang="ts">
import { profileContacts } from '~/content/profile'

const { language, slug, pathFor } = usePortfolioRouting()
const isProject = computed(() => Boolean(slug.value && slug.value !== 'portfolio'))
const names = {
  ru: { about: 'Обо мне', portfolio: 'Портфолио', nav: 'Основная навигация', back: 'Все работы' },
  en: { about: 'About me', portfolio: 'Portfolio', nav: 'Main navigation', back: 'All work' },
}
</script>

<template>
  <nav class="navbar-frame site-navbar" :aria-label="names[language].nav">
    <NuxtLink v-if="isProject" :to="pathFor('portfolio')" class="btn btn-back">
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
    <div class="lang-switcher-pill locale-switcher">
      <NuxtLink v-if="language === 'en'" :to="pathFor(slug, 'ru')" lang="ru" hreflang="ru" aria-label="По-русски">RU</NuxtLink>
      <span v-else aria-current="true">RU</span>
      <NuxtLink v-if="language === 'ru'" :to="pathFor(slug, 'en')" lang="en" hreflang="en" aria-label="In English">EN</NuxtLink>
      <span v-else aria-current="true">EN</span>
    </div>
  </nav>
</template>
