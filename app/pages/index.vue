<script setup lang="ts">
import { profile, resumeUrl } from '~/content/profile'
import { projects } from '~/content/projects'

const { language, pathFor } = usePortfolioRouting()
const copy = computed(() => profile[language.value])
const selected = ['lesson-space', 'fintech', 'quests'].flatMap(slug => projects.filter(project => project.slug === slug))
const specialties = ['Figma', 'Variables', 'Design Systems', 'Prototyping', 'HTML', 'CSS', 'JavaScript', 'Vue/Nuxt', 'Git', 'Codex']
useSeoMeta({
  title: () => language.value === 'en' ? 'Maxim Ermolov · Product Designer' : 'Максим Ермолов · Продуктовый дизайнер',
  description: () => copy.value.intro,
})
</script>

<template>
  <div class="content-wrapper profile-page">
    <section class="First-section" aria-labelledby="profile-title">
      <img :src="'/images/Logo.svg'" alt="" class="logo-main" fetchpriority="high">
      <div class="header">
        <p class="hero-name">{{ language === 'en' ? 'Maxim Ermolov' : 'Максим Ермолов' }}</p>
        <h1 id="profile-title">{{ copy.role }}</h1>
        <p class="profile-focus">{{ copy.focus }}</p>
        <div class="hero-actions">
          <NuxtLink :to="pathFor('portfolio')" class="btn hero-primary">
            {{ language === 'en' ? 'View work' : 'Смотреть работы' }} <span aria-hidden="true">→</span>
          </NuxtLink>
          <a :href="resumeUrl" class="btn">{{ copy.resumeLabel }}</a>
        </div>
      </div>
    </section>

    <div class="marquee-wrapper">
      <div class="marquee-track">
        <div v-for="repeat in 3" :key="repeat" class="marquee-list" :aria-hidden="repeat > 1 ? 'true' : undefined">
          <span v-for="skill in specialties" :key="skill" class="skill">{{ skill }}</span>
        </div>
      </div>
    </div>

    <section class="about-me-wrapper">
      <div class="about-me-line">
        <div class="about-me">
          <div class="about-me-text">
            <h2>{{ copy.aboutTitle }}</h2>
            <p>{{ copy.intro }}</p>
          </div>
          <div class="about-me-image">
            <img :src="'/images/Me.png'" alt="" loading="lazy" decoding="async">
          </div>
        </div>
      </div>
    </section>

    <section class="portfolio-preview">
      <div class="portfolio-preview-header">
        <h2>{{ copy.selectedWorkTitle }}</h2>
        <NuxtLink :to="pathFor('portfolio')" class="btn">{{ copy.seeAllWorkLabel }}</NuxtLink>
      </div>
      <div class="projects-container-preview">
        <ProjectCard v-for="project in selected" :key="project.slug" :project="project" />
      </div>
    </section>

    <section class="experience">
      <div class="experience-title">
        <h2>{{ copy.experienceTitle }}</h2>
        <p class="experience-amount">{{ copy.experienceAmount }}</p>
      </div>
      <div class="experience-text">
        <details v-for="(job, index) in copy.jobs" :key="job.company" class="profile-job" :open="index === 0">
          <summary><strong>{{ job.role }}</strong><span>{{ job.company }} · {{ job.dates }}</span></summary>
          <ul class="job-highlights">
            <li v-for="highlight in job.highlights" :key="highlight.title"><strong>{{ highlight.title }}</strong> {{ highlight.description }}</li>
          </ul>
        </details>
      </div>
    </section>

    <section class="skills-dashboard" aria-labelledby="skills-heading">
      <h2 id="skills-heading" class="visually-hidden">{{ language === 'en' ? 'Skills' : 'Навыки' }}</h2>
      <div class="skills-container">
        <div v-for="kind in ['hard', 'soft'] as const" :key="kind" class="skill-card portfolio-skill-card">
          <h3 class="card-label">{{ kind === 'hard' ? copy.hardSkillsTitle : copy.softSkillsTitle }}</h3>
          <div v-for="group in copy.skills.filter(skill => skill.kind === kind)" :key="group.name" class="metric-item">
            <div class="metric-info">
              <h4>{{ group.name }}</h4>
              <span v-if="'level' in group" class="metric-value">{{ group.level }}</span>
            </div>
            <ul v-if="group.tags.length" class="tag-group tag-list">
              <li v-for="tag in group.tags" :key="tag" class="tag">{{ tag }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="education-wrapper" :style="{ '--education-image': 'url(/images/dstu.png)' }">
      <div class="education">
        <h2>{{ copy.educationTitle }}</h2>
        <div v-for="item in copy.education" :key="item.institution" class="edu-content">
          <h3>{{ item.institution }}</h3>
          <p>{{ item.degree }} · {{ item.dates }}</p>
          <ul class="tag-group tag-list">
            <li v-for="detail in item.details" :key="detail" class="tag">{{ detail }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
