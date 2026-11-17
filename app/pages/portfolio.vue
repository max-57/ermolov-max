<script setup lang="ts">
import { projects } from '~/content/projects'
import { catalogCards, catalogOrder } from '~/content/legacyPresentation'

const { language } = usePortfolioRouting()
const title = computed(() => language.value === 'en' ? 'Portfolio' : 'Портфолио')
const catalog = catalogOrder.flatMap((slug) => {
  const project = projects.find(item => item.slug === slug)
  const card = catalogCards[slug]
  if (!project || !card) return []
  return [{ ...project, cover: card.thumb, ru: { ...project.ru, ...card.ru }, en: { ...project.en, ...card.en } }]
})
useSeoMeta({ title: () => `${title.value} · Max Ermolov` })
</script>

<template>
  <section class="portfolio-list">
    <h1 class="visually-hidden">{{ title }}</h1>
    <div class="projects-container">
      <ProjectCard v-for="project in catalog" :key="project.slug" :project="project" />
    </div>
  </section>
</template>
