<script setup lang="ts">
import { projects } from '~/content/projects'

const { language } = usePortfolioRouting()
const title = computed(() => language.value === 'en' ? 'Portfolio' : 'Портфолио')
const catalog = ['lesson-space', 'fintech', 'quests', 'kpd', 'logistic', 'restaurant', 'barber', 'ai-logistic']
  .flatMap(slug => projects.filter(project => project.slug === slug))
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
