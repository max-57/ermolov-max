<script setup lang="ts">
import { projects } from '~/content/projects'

const { language } = usePortfolioRouting()
const title = computed(() => language.value === 'en' ? 'Portfolio' : 'Портфолио')
useSeoMeta({ title: () => `${title.value} · Max Ermolov` })
</script>

<template>
  <section class="portfolio-list">
    <h1 class="portfolio-title">{{ title }}</h1>
    <div class="projects-container">
      <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
    </div>
  </section>
</template>
