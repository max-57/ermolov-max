<script setup lang="ts">
import { profile, resumeUrl } from '~/content/profile'
import { projects, type Language } from '~/content/projects'

const { language, pathFor } = usePortfolioRouting()
const copy = computed(() => profile[language.value])
const openJob = ref<number>()
const experienceAmount = ref(copy.value.experienceAmount)
const experienceCounter = ref(experienceAmount.value)
const experienceElement = useTemplateRef<HTMLElement>('experienceElement')
const skillsDashboard = useTemplateRef<HTMLElement>('skillsDashboard')
const specialties = ['Figma', 'Variables', 'Tokens', 'Design Systems', 'Prototyping', 'Components', 'HTML', 'CSS', 'JavaScript', 'Git', 'PhotoShop', 'Illustrator', 'Blender', 'DaVinci Resolve']

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

let stopCounters: (() => void) | undefined

onMounted(() => {
  const today = new Date()
  const months = Math.max(0, (today.getFullYear() - 2022) * 12 + today.getMonth() - 5 - Number(today.getDate() < 17))
  function formatExperience(value: number) {
    return `${Math.floor(value / 12)}.${String(value % 12).padStart(2, '0')}`
  }
  experienceAmount.value = experienceCounter.value = formatExperience(months)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') return

  const counters = new Map<Element, { setVisible: (visible: boolean) => void; stop: () => void }>()
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) counters.get(entry.target)?.setVisible(entry.intersectionRatio >= 0.1)
  }, { threshold: 0.1 })

  function observeCounter(target: HTMLElement, duration: number, update: (progress: number) => void, showBar?: (visible: boolean) => void) {
    let frame = 0
    const stop = () => cancelAnimationFrame(frame)
    counters.set(target, {
      stop,
      setVisible(visible) {
        stop()
        showBar?.(visible)
        update(0)
        if (!visible) return

        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          update(progress)
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
    })
    update(0)
    observer.observe(target)
  }

  if (experienceElement.value) {
    observeCounter(experienceElement.value, 2500, (progress) => {
      const elapsedMonths = Math.floor(months * (1 - (1 - progress) ** 3))
      experienceCounter.value = formatExperience(elapsedMonths)
    })
  }

  for (const metric of skillsDashboard.value?.querySelectorAll<HTMLElement>('[data-score]') ?? []) {
    const bar = metric.querySelector<HTMLElement>('.progress-wrapper')
    const value = metric.querySelector<HTMLElement>('.metric-value')
    if (!bar || !value) continue

    const score = Number(metric.dataset.score)
    metric.classList.add('metric-animated')
    observeCounter(bar, 1500, (progress) => {
      value.textContent = `${Math.round(score * progress)}%`
    }, visible => metric.classList.toggle('metric-revealed', visible))
  }

  stopCounters = () => {
    observer.disconnect()
    for (const { stop } of counters.values()) stop()
  }
})

onBeforeUnmount(() => stopCounters?.())

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
            <p>{{ copy.intro }}</p>
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
        <p id="experience-counter" ref="experienceElement" class="experience-counter" aria-hidden="true">{{ experienceCounter }}</p>
        <span class="visually-hidden">{{ experienceAmount }}</span>
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

    <section ref="skillsDashboard" class="skills-dashboard" aria-labelledby="skills-heading">
      <h2 id="skills-heading" class="visually-hidden">{{ language === 'en' ? 'Skills' : 'Навыки' }}</h2>
      <div class="skills-container">
        <div v-for="card in skillCards" :key="card.kind" class="skill-card" :class="card.kind">
          <span class="card-label">{{ card.label }}</span>
          <div v-for="(group, index) in card.items" :key="index" class="metric-item" :data-score="'score' in group ? group.score : undefined">
            <div class="metric-info">
              <h3>{{ group.name }}</h3>
              <span v-if="'level' in group" class="metric-value">{{ group.level }}</span>
              <template v-else>
                <span class="metric-value" aria-hidden="true">{{ group.score }}%</span>
                <span class="visually-hidden">{{ group.score }}%</span>
              </template>
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

<style scoped>
.metric-animated .progress-bar {
  transform: scaleX(0);
  transform-origin: left;
  transition: none;
}

.metric-revealed .progress-bar {
  transform: scaleX(1);
  transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1);
}
</style>
