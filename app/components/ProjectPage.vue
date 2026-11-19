<script setup lang="ts">
import type { Language, Project } from '~/content/projects'

const props = defineProps<{ project: Project; language: Language }>()
const { pathFor } = usePortfolioRouting()
const copy = computed(() => props.project[props.language])
const title = computed(() => copy.value.title + (props.language === 'en' ? ' · Maxim Ermolov' : ' · Максим Ермолов'))

useSeoMeta({
  title,
  description: () => copy.value.description,
  ogTitle: title,
  ogDescription: () => copy.value.description,
  ogImage: () => props.project.cover && 'https://max-ermolov.work' + props.project.cover,
})
</script>

<template>
  <article class="project-page case-study" :class="{ 'case-study--golf': project.slug === 'golf' }">
    <header class="case-heading">
      <p class="case-type">{{ copy.label }}</p>
      <h1>{{ copy.title }}</h1>
      <p class="case-lead">{{ copy.description }}</p>
    </header>

    <div v-if="copy.gallery" class="case-gallery" tabindex="0" role="region"
      :aria-label="language === 'en' ? 'Project screens' : 'Экраны проекта'">
      <figure v-for="(item, index) in copy.gallery" :key="item.src">
        <img :src="item.src" :alt="item.alt" :width="item.width" :height="item.height"
          :loading="index === 0 ? 'eager' : 'lazy'" decoding="async">
        <figcaption>{{ item.alt }}</figcaption>
      </figure>
    </div>

    <div class="case-sections">
      <section v-for="section in copy.sections" :key="section.title" class="case-section">
        <div class="case-section-copy">
          <h2>{{ section.title }}</h2>
          <p>{{ section.text }}</p>
        </div>
        <figure v-for="item in section.media" :key="item.src" class="case-image">
          <img :src="item.src" :alt="item.alt" :width="item.width" :height="item.height" loading="lazy" decoding="async">
          <figcaption>{{ item.alt }}</figcaption>
        </figure>
      </section>
    </div>

    <NuxtLink v-magnetic :to="pathFor('portfolio')" class="btn case-more">
      {{ language === 'en' ? 'All projects' : 'Все проекты' }}
      <span aria-hidden="true">→</span>
    </NuxtLink>
  </article>
</template>
