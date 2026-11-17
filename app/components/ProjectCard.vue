<script setup lang="ts">
import type { Project } from '~/content/projects'

defineProps<{ project: Project }>()
const { language, pathFor } = usePortfolioRouting()
</script>

<template>
  <NuxtLink v-magnetic="0.05" :to="pathFor(project.slug)" class="project-card" :class="{ 'project-card--text': !project.cover }">
    <div v-if="project.cover" class="card-preview">
      <img :src="project.cover" alt="" loading="lazy" decoding="async">
    </div>
    <div class="card-content">
      <div class="card-heading">
        <span class="card-label">{{ project[language].label }}</span>
        <span class="card-arrow" aria-hidden="true">→</span>
      </div>
      <h2 class="card-title">{{ project[language].title }}</h2>
      <p class="card-excerpt">{{ project[language].description }}</p>
    </div>
  </NuxtLink>
</template>
