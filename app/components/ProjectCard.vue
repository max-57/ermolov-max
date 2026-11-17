<script setup lang="ts">
import type { Project } from '~/content/projects'

defineProps<{ project: Project }>()
const { language, pathFor } = usePortfolioRouting()
</script>

<template>
  <NuxtLink :to="pathFor(project.slug)" class="project-card">
    <div v-if="project.cover" class="card-preview">
      <img :src="project.cover" alt="" loading="lazy" decoding="async">
    </div>
    <div class="card-content">
      <span class="card-label">{{ project[language].label }}</span>
      <h2 class="card-title">{{ project[language].title }}</h2>
      <p class="card-excerpt">{{ project[language].description }}</p>
    </div>
  </NuxtLink>
</template>
