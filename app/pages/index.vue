<script setup lang="ts">
import { profile, resumeUrl } from '~/content/profile'
import { projects, type Language } from '~/content/projects'

const { language, pathFor } = usePortfolioRouting()
const copy = computed(() => profile[language.value])
const openJob = ref<number>()
const experienceCounter = ref(copy.value.experienceAmount)
const specialties = ['Figma', 'Variables', 'Tokens', 'Design Systems', 'Prototyping', 'Components', 'HTML', 'CSS', 'JavaScript', 'Git', 'PhotoShop', 'Illustrator', 'Blender', 'DaVinci Resolve']

const aboutText = computed(() => language.value === 'ru'
  ? copy.value.intro
  : 'Product designer with 4+ years in UX/UI. I design B2B interfaces, design systems and online learning experiences. I build interfaces with Vue and Nuxt and use Codex to work on UI code. Open to relocation.')

const skillCards = computed(() => [
  {
    kind: 'tools-card',
    label: '// HARD SKILLS',
    items: [
      { name: 'Figma', score: 99, tags: ['Variables', 'Tokens', 'Design Systems', 'Prototyping'] },
      { name: 'FrontEnd', score: 40, tags: [language.value === 'ru' ? 'Этот сайт, как пример' : 'This website, as an example', 'HTML', 'CSS', 'Vanilla JS', 'GIT'] },
      { name: language.value === 'ru' ? 'Дизайн' : 'Design', score: 80, tags: ['Blender', 'DaVinci Resolve', 'After Effects', 'Photoshop', 'Illustrator'] },
    ],
  },
  {
    kind: 'metrics-card',
    label: '// SOFT SKILLS',
    items: [
      { name: 'English', level: 'B1', tags: [] },
      { name: 'Product Thinking', score: 85, tags: ['CJM', 'User Research', 'A/B Testing', 'Competitor Analysis'] },
      { name: 'Problem Solving', score: 80, tags: ['Critical Thinking', 'Analytical Skills', 'Adaptability', 'Solution-Focused'] },
    ],
  },
])

const featured: Record<Language, { slug: string; cover?: string; label: string; title: string; description: string }[]> = {
  ru: [
    { slug: 'lesson-space', label: 'EDTECH · СОБСТВЕННЫЙ MVP', title: 'Lesson Space', description: 'Сам спроектировал и собрал комнату онлайн-занятия со звонком, совместной доской и интерактивными заданиями.' },
    { slug: 'fintech', cover: '/images/fintech-case-cover.png', label: '// FINTECH • ENTERPRISE', title: 'Строительный Fintech', description: 'Разработка ядра системы управления сметами с автоматизацией каскадных обновлений и сложной аналитикой.' },
    { slug: 'logistic', cover: '/images/logistic-case-cover.png', label: '// B2B ЛОГИСТИЧЕСКАЯ ПЛАТФОРМА', title: 'Цифровизация процессов грузоперевозок', description: 'Оптимизация взаимодействия между администраторами, логистами и водителями через автоматизацию документооборота и прозрачный мониторинг маршрутов.' },
    { slug: 'quests', cover: '/images/quests-case-cover.png', label: '// B2B • SAAS • ENTERTAINMENT', title: 'B2B SaaS для квестов', description: 'Единый центр управления партнерской сетью игровых локаций, бронированиями и автоматизацией работы персонала.' },
  ],
  en: [
    { slug: 'lesson-space', label: 'EDTECH · INDEPENDENT MVP', title: 'Lesson Space', description: 'I designed and built an online lesson room with video calls, a collaborative whiteboard and interactive exercises.' },
    { slug: 'fintech', cover: '/images/fintech-case-cover.png', label: '// FINTECH • ENTERPRISE', title: 'Construction Fintech', description: 'Developing the core cost management engine with automated cascade updates and heavy analytics.' },
    { slug: 'ai-logistic', cover: '/images/logistics-case-cover.png', label: '// AI • LOGISTICS • MOBILE', title: 'AI Logistics Optimizer', description: 'Fleet management system with an AI assistant for predictive expense analysis and procurement optimization.' },
    { slug: 'quests', cover: '/images/quests-case-cover.png', label: '// B2B • SAAS • ENTERTAINMENT', title: 'B2B SaaS for Quests', description: 'All-in-one control center for escape room networks, bookings management, and staff automation.' },
  ],
}
const selected = computed(() => featured[language.value].flatMap(({ slug, cover, ...card }) => {
  const project = projects.find(item => item.slug === slug)
  return project ? [{ ...project, cover, [language.value]: { ...project[language.value], ...card } }] : []
}))

onMounted(() => {
  const today = new Date()
  const months = Math.max(0, (today.getFullYear() - 2022) * 12 + today.getMonth() - 5 - Number(today.getDate() < 17))
  experienceCounter.value = `${Math.floor(months / 12)}.${String(months % 12).padStart(2, '0')}`
})

useSeoMeta({
  title: () => language.value === 'en' ? 'Maxim Ermolov · Product Designer' : 'Максим Ермолов · Продуктовый дизайнер',
  description: () => copy.value.intro,
})
</script>

<template>
  <div class="content-wrapper profile-page">
    <section class="First-section" aria-labelledby="profile-title">
      <img v-magnetic="0.5" :src="'/images/Logo.svg'" alt="" class="logo-main" fetchpriority="high">
      <div class="header">
        <h1 id="profile-title" lang="en">PRODUCT DESIGNER</h1>
        <p class="profile-focus">{{ copy.focus }}</p>
        <a v-magnetic :href="resumeUrl" class="btn"><span>{{ language === 'en' ? 'Download CV' : copy.resumeLabel }}</span></a>
      </div>
    </section>

    <div class="marquee-wrapper">
      <div class="marquee-track">
        <div v-for="repeat in 3" :key="repeat" class="marquee-list" :aria-hidden="repeat > 1 ? 'true' : undefined">
          <div v-for="skill in specialties" :key="skill" class="skill">{{ skill }}</div>
        </div>
      </div>
    </div>

    <section class="about-me-wrapper" aria-labelledby="about-title">
      <div class="about-me-line">
        <div class="about-me">
          <div class="about-me-text">
            <h2 id="about-title">{{ copy.aboutTitle.toLocaleUpperCase(language) }}</h2>
            <p>{{ aboutText }}</p>
          </div>
          <div class="about-me-image">
            <img :src="'/images/Me.png'" alt="" loading="lazy" decoding="async">
          </div>
        </div>
      </div>
    </section>

    <section class="experience" aria-labelledby="experience-title">
      <div class="experience-title">
        <h2 id="experience-title">{{ copy.experienceTitle.toLocaleUpperCase(language) }}</h2>
        <p id="experience-counter" class="experience-counter">{{ experienceCounter }}</p>
      </div>
      <div class="experience-text">
        <div class="accordion">
          <div v-for="(job, index) in copy.jobs" :key="job.company" class="accordion-item" :class="{ 'is-open': openJob === index }">
            <button
              class="accordion-header"
              type="button"
              :aria-expanded="openJob === index"
              :aria-controls="`profile-job-${index}`"
              @click="openJob = openJob === index ? undefined : index"
            >
              <span class="accordion-title">
                <span class="accordion-role">{{ job.role }}</span>
                <span class="accordion-company">{{ job.company }} {{ job.dates }}</span>
              </span>
              <img :src="'/images/arrow.svg'" alt="" class="accordion-icon">
            </button>
            <div :id="`profile-job-${index}`" class="accordion-content" :inert="openJob !== index">
              <div class="accordion-inner">
                <ul>
                  <li v-for="highlight in job.highlights" :key="highlight.title"><span>{{ highlight.title }}:</span> {{ highlight.description }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="skills-dashboard" aria-labelledby="skills-heading">
      <h2 id="skills-heading" class="visually-hidden">{{ language === 'en' ? 'Skills' : 'Навыки' }}</h2>
      <div class="skills-container">
        <div v-for="card in skillCards" :key="card.kind" class="skill-card" :class="card.kind">
          <span class="card-label">{{ card.label }}</span>
          <div v-for="group in card.items" :key="group.name" class="metric-item">
            <div class="metric-info">
              <h3>{{ group.name }}</h3>
              <span class="metric-value">{{ 'level' in group ? group.level : `${group.score}%` }}</span>
            </div>
            <div v-if="'score' in group" class="progress-wrapper" aria-hidden="true">
              <div class="progress-bar" :style="{ width: `${group.score}%` }" />
            </div>
            <div v-if="group.tags.length" class="tag-group">
              <span v-for="tag in group.tags" :key="tag" v-magnetic="0.25" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="portfolio-preview" aria-labelledby="selected-work-title">
      <div class="portfolio-preview-header">
        <h2 id="selected-work-title">{{ language === 'en' ? 'Selected Works' : copy.selectedWorkTitle }}</h2>
        <NuxtLink v-magnetic :to="pathFor('portfolio')" class="btn to-portfolio" :class="{ 'hide-on-mobile': language === 'ru' }">
          <span>{{ language === 'en' ? 'All Works' : copy.seeAllWorkLabel }}</span>
        </NuxtLink>
      </div>
      <div class="projects-container-preview">
        <ProjectCard v-for="project in selected" :key="project.slug" :project="project" />
        <NuxtLink v-if="language === 'ru'" v-magnetic :to="pathFor('portfolio')" class="btn to-portfolio show-on-mobile rotate-90">
          <span>{{ copy.seeAllWorkLabel }}</span>
        </NuxtLink>
      </div>
    </section>

    <section class="education-wrapper" aria-labelledby="education-title">
      <div v-for="item in copy.education" :key="item.institution" class="education">
        <span class="card-label">// {{ copy.educationTitle.toLocaleUpperCase(language) }}</span>
        <h2 id="education-title" class="education-title">DSTU {{ item.dates.replace('–', '\u00a0•\u00a0') }}</h2>
        <p class="education-summary">{{ item.institution }}</p>
        <div class="tag-group">
          <span v-magnetic="0.25" class="tag">{{ item.degree }}</span>
          <span v-for="detail in item.details" :key="detail" v-magnetic="0.25" class="tag">{{ detail }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
