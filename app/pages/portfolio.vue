<script setup lang="ts">
import { projects } from '~/content/projects'

const { language } = usePortfolioRouting()
const english = computed(() => language.value === 'en')
const title = computed(() => english.value ? 'Projects' : 'Проекты')
const featured = projects.slice(0, 2)
const more = projects.slice(2)
useSeoMeta({
  title: () => `${title.value} · ${english.value ? 'Maxim Ermolov' : 'Максим Ермолов'}`,
  description: () => english.value
    ? 'Product design and development by Maxim Ermolov. Explore work spanning independent products, mobile apps and B2B design systems.'
    : 'Дизайн и разработка Максима Ермолова. Самостоятельные продукты, мобильные приложения и B2B дизайн-системы.',
})
</script>

<template>
  <section class="work-index">
    <div class="work-index-heading">
      <h1>{{ title }}</h1>
    </div>
    <section class="catalog-group" aria-labelledby="catalog-featured">
      <div class="section-heading">
        <h2 id="catalog-featured">{{ english ? 'Selected work' : 'Избранные проекты' }}</h2>
      </div>
      <div class="work-grid">
        <ProjectCard v-for="project in featured" :key="project.slug" :project="project" featured :heading-level="3" />
      </div>
    </section>
    <section class="catalog-group" aria-labelledby="catalog-more">
      <div class="section-heading">
        <h2 id="catalog-more">{{ english ? 'More projects' : 'Другие проекты' }}</h2>
      </div>
      <div class="catalog-grid">
        <ProjectCard v-for="project in more" :key="project.slug" :project="project" :heading-level="3" />
      </div>
    </section>
  </section>
</template>
