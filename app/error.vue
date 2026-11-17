<script setup lang="ts">
import type { NuxtError } from '#app'
import '~/assets/nuxt.css'

defineProps<{ error: NuxtError }>()
const { language, pathFor } = usePortfolioRouting()
useHead(() => ({ htmlAttrs: { lang: language.value } }))
</script>

<template>
  <main class="content">
    <section class="project-page error-page">
      <div class="project-header-info">
        <span class="card-label">{{ error.statusCode }}</span>
        <h1>{{ language === 'en' ? 'Page unavailable' : 'Страница недоступна' }}</h1>
        <button class="btn" type="button" @click="clearError({ redirect: pathFor('portfolio') })">
          {{ language === 'en' ? 'Back to portfolio' : 'Вернуться в портфолио' }}
        </button>
      </div>
    </section>
  </main>
</template>
