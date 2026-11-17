<script setup lang="ts">
import type { Language, Project } from '~/content/projects'

const props = defineProps<{ project: Project; language: Language }>()
const copy = computed(() => props.project[props.language])
const { pathFor } = usePortfolioRouting()
const title = computed(() => `${copy.value.title} · ${props.language === 'en' ? 'Maxim Ermolov' : 'Максим Ермолов'}`)
useSeoMeta({
  title,
  description: () => copy.value.description,
  ogTitle: title,
  ogDescription: () => copy.value.description,
  ogImage: () => props.project.cover && `https://max-ermolov.work${props.project.cover}`,
})
</script>

<template>
  <article class="project-page case-page">
    <header class="project-hero">
      <div class="project-header-info">
        <img v-if="project.cover" :src="project.cover" alt="" class="project-cover" decoding="async">
        <span class="card-label">{{ copy.label }}</span>
        <h1>{{ copy.title }}</h1>
        <p class="project-subtitle">{{ copy.description }}</p>
      </div>
    </header>

    <div class="case-body" :class="{ 'project-grid-content': copy.details?.length || project.tags?.length }">
      <aside v-if="copy.details?.length || project.tags?.length" class="project-column case-aside">
        <div class="project-details-container">
          <div v-for="detail in copy.details" :key="detail.title" class="project-details-card">
            <h2 class="card-label">{{ detail.title }}</h2>
            <p>{{ detail.text }}</p>
          </div>
          <ul v-if="project.tags?.length" class="tag-group tag-list">
            <li v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</li>
          </ul>
        </div>
      </aside>
      <div class="project-column">
        <section v-for="section in copy.sections" :key="section.title" class="project-section">
          <h2>{{ section.title }}</h2>
          <p v-if="section.text" class="case-text">{{ section.text }}</p>
          <template v-for="media in section.media" :key="media.src">
            <video v-if="media.video" :src="media.src" :aria-label="media.alt" controls playsinline preload="none" />
            <img v-else :src="media.src" :alt="media.alt" loading="lazy" decoding="async">
          </template>
        </section>
      </div>
    </div>
    <NuxtLink :to="pathFor('portfolio')" class="btn case-back">{{ language === 'en' ? 'All work' : 'Все работы' }}</NuxtLink>
  </article>
</template>
