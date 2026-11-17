<script setup lang="ts">
import { projects } from '~/content/projects'
import { canonicalSlug } from '~/utils/portfolioRoutes'

definePageMeta({
  validate: route => projects.some(project => project.slug === canonicalSlug(String(route.params.slug))),
})
const { language, slug } = usePortfolioRouting()
const project = computed(() => projects.find(project => project.slug === slug.value))
</script>

<template>
  <ProjectPage v-if="project" :project="project" :language="language" />
</template>
