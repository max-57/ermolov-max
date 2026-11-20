<script setup lang="ts">
const { language, pathFor } = usePortfolioRouting()
const english = computed(() => language.value === 'en')
const title = computed(() => english.value ? 'Reviews' : 'Отзывы')
useSeoMeta({ title, robots: 'noindex' })
</script>

<template>
  <section class="work-index reviews-page">
    <div class="work-index-heading"><h1>{{ title }}</h1></div>
    <p>{{ english ? 'There are no published testimonials yet.' : 'Здесь пока нет опубликованных отзывов.' }}</p>
    <NuxtLink :to="pathFor('portfolio')" class="text-link">
      {{ english ? 'See the projects' : 'Посмотреть проекты' }}
    </NuxtLink>
  </section>
</template>
