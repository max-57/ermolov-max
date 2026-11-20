<script setup lang="ts">
import { projects, type Language, type Project } from '~/content/projects'

const props = defineProps<{ project: Project; language: Language }>()
const { pathFor } = usePortfolioRouting()
const copy = computed(() => props.project[props.language])
const english = computed(() => props.language === 'en')
const next = computed(() => {
  const index = projects.findIndex(project => project.slug === props.project.slug)
  return projects[(index + 1) % projects.length]
})
const title = computed(() => copy.value.title + (english.value ? ' · Maxim Ermolov' : ' · Максим Ермолов'))

useSeoMeta({
  title,
  description: () => copy.value.description,
  ogTitle: title,
  ogDescription: () => copy.value.description,
  ogImage: () => props.project.cover && 'https://max-ermolov.work' + props.project.cover,
})
</script>

<template>
  <article class="project-page case-study" :class="`case-study--${project.slug}`">
    <header class="case-heading">
      <div class="case-title">
        <p class="case-type">{{ copy.label }}</p>
        <h1>{{ copy.title }}</h1>
      </div>
      <div class="case-summary">
        <p class="case-lead">{{ copy.description }}</p>
        <a v-if="project.website" v-magnetic :href="project.website" class="text-link">
          {{ english ? 'Open Lesson Space (sign-in required)' : 'Открыть Lesson Space (нужен вход)' }}
        </a>
      </div>
    </header>

    <div v-if="copy.gallery" class="case-gallery" :class="{ 'case-gallery--wide': copy.galleryLayout === 'wide' }"
      :tabindex="copy.galleryLayout === 'wide' ? undefined : 0" role="region"
      :aria-label="english ? 'Project screens' : 'Экраны проекта'">
      <figure v-for="(item, index) in copy.gallery" :key="item.src" class="case-figure">
        <img :src="item.src" :alt="item.caption ? item.alt : ''" :width="item.width" :height="item.height"
          :loading="index === 0 ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : undefined" decoding="async">
        <figcaption>
          <span>{{ item.caption ?? item.alt }}</span>
          <a v-if="item.caption" :href="item.src" target="_blank" rel="noopener" class="text-link">
            {{ english ? 'View full-size screenshot' : 'Открыть в полном размере' }}
          </a>
        </figcaption>
      </figure>
    </div>

    <div class="case-sections">
      <section v-for="section in copy.sections" :key="section.title" class="case-section">
        <div class="case-section-copy">
          <h2>{{ section.title }}</h2>
          <p>{{ section.text }}</p>
        </div>
        <figure v-for="item in section.media" :key="item.src" class="case-figure case-image">
          <img :src="item.src" :alt="item.caption ? item.alt : ''" :width="item.width" :height="item.height" loading="lazy" decoding="async">
          <figcaption>
            <span>{{ item.caption ?? item.alt }}</span>
            <a v-if="item.caption" :href="item.src" target="_blank" rel="noopener" class="text-link">
              {{ english ? 'View full-size screenshot' : 'Открыть в полном размере' }}
            </a>
          </figcaption>
        </figure>
      </section>
    </div>

    <nav class="case-navigation" :aria-label="english ? 'Project navigation' : 'Навигация по проектам'">
      <NuxtLink :to="pathFor('portfolio')" class="text-link">{{ english ? 'All projects' : 'Все проекты' }}</NuxtLink>
      <NuxtLink v-if="next" :to="pathFor(next.slug)" class="text-link">
        {{ english ? 'Next' : 'Далее' }} · {{ next[language].title }}
      </NuxtLink>
    </nav>
  </article>
</template>
