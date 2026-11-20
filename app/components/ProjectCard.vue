<script setup lang="ts">
import type { Project } from '~/content/projects'

const props = withDefaults(defineProps<{ project: Project; featured?: boolean; headingLevel?: 2 | 3 }>(), {
  headingLevel: 2,
})
const { language, pathFor } = usePortfolioRouting()
const copy = computed(() => props.project[language.value])
</script>

<template>
  <NuxtLink :to="pathFor(project.slug)" class="work-card"
    :class="[`work-card--${project.slug}`, { 'work-card--featured': featured, 'work-card--text': !project.cover }]">
    <div v-if="project.cover" class="work-card-media">
      <img :src="project.cover" alt="" :loading="featured ? 'eager' : 'lazy'" decoding="async">
      <img v-if="project.coverCompanion" :src="project.coverCompanion" alt="" loading="lazy" decoding="async">
    </div>
    <div class="work-card-copy">
      <div class="work-card-body">
        <p class="work-card-type">{{ copy.label }}</p>
        <component :is="`h${headingLevel}`">{{ copy.title }}</component>
        <p class="work-card-description">{{ copy.description }}</p>
      </div>
    </div>
  </NuxtLink>
</template>
