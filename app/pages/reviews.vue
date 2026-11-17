<script setup lang="ts">
const { language } = usePortfolioRouting()
const title = computed(() => language.value === 'en' ? 'Reviews' : 'Отзывы')
useSeoMeta({ title, robots: 'noindex' })
</script>

<template>
  <section class="project-page">
    <div class="project-header-info"><h1>{{ title }}</h1></div>
  </section>
</template>
