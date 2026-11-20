<script setup lang="ts">
import { profile, profileContacts, resumeUrl } from '~/content/profile'
import { projects } from '~/content/projects'

const { language, pathFor } = usePortfolioRouting()
const copy = computed(() => profile[language.value])
const featured = projects.slice(0, 2)
const email = profileContacts.find(contact => contact.name === 'mail')!.href
const english = computed(() => language.value === 'en')
const profileFacts = useTemplateRef<HTMLElement>('profileFacts')
const factsVisible = ref(false)
let factsObserver: IntersectionObserver | undefined

onMounted(() => {
  if (!profileFacts.value || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  factsObserver = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    factsVisible.value = true
    factsObserver?.disconnect()
  }, { threshold: 0.3 })
  factsObserver.observe(profileFacts.value)
})
onBeforeUnmount(() => factsObserver?.disconnect())

useSeoMeta({
  title: () => english.value ? 'Maxim Ermolov · Product Designer & Design Engineer' : 'Максим Ермолов · Продуктовый дизайнер и Design Engineer',
  description: () => copy.value.intro,
  ogTitle: () => english.value ? 'Maxim Ermolov · Design portfolio' : 'Максим Ермолов · Портфолио дизайнера',
  ogDescription: () => copy.value.intro,
})
</script>

<template>
  <div class="profile-page">
    <section class="profile-hero" aria-labelledby="profile-title">
      <div class="hero-identity">
        <p class="profile-role">{{ copy.role }}</p>
        <h1 id="profile-title">{{ english ? 'Maxim' : 'Максим' }}<br>{{ english ? 'Ermolov' : 'Ермолов' }}</h1>
      </div>
      <div class="hero-aside">
        <img v-magnetic="0.35" src="/images/Logo.svg" alt="" class="hero-mark" width="72" height="72">
        <p>{{ english
          ? 'I design complex products and build interfaces in Vue and Nuxt. I took Lesson Space from idea to working MVP on my own.'
          : 'Проектирую сложные продукты и собираю интерфейсы на Vue и Nuxt. Lesson Space сделал сам, от идеи до работающего MVP.' }}</p>
        <div class="profile-actions">
          <a v-magnetic :href="email" class="btn profile-contact">{{ english ? 'Get in touch' : 'Написать мне' }}</a>
          <a :href="resumeUrl" class="text-link">{{ copy.resumeLabel }}</a>
        </div>
      </div>
    </section>

    <section class="featured-work" aria-labelledby="selected-work-title">
      <div class="section-heading">
        <h2 id="selected-work-title">{{ english ? 'Selected work' : 'Избранные проекты' }}</h2>
        <NuxtLink :to="pathFor('portfolio')" class="text-link">{{ english ? 'All projects' : 'Все проекты' }}</NuxtLink>
      </div>
      <div class="work-grid">
        <ProjectCard v-for="project in featured" :key="project.slug" :project="project" featured :heading-level="3" />
      </div>
    </section>

    <section class="profile-about" aria-labelledby="about-title">
      <div class="about-copy">
        <h2 id="about-title">{{ copy.aboutTitle }}</h2>
        <p>{{ copy.intro }}</p>
        <dl ref="profileFacts" class="profile-facts" :class="{ 'facts-visible': factsVisible }">
          <div>
            <dt>{{ english ? 'Experience' : 'Опыт' }}</dt>
            <dd>{{ english ? '4+ years in UX/UI' : '4+ года в UX/UI' }}</dd>
          </div>
          <div>
            <dt>{{ english ? 'Code' : 'Код' }}</dt>
            <dd>Vue · Nuxt</dd>
          </div>
          <div>
            <dt>{{ english ? 'Languages' : 'Языки' }}</dt>
            <dd>{{ english ? 'Russian · English B1' : 'Русский · Английский B1' }}</dd>
          </div>
        </dl>
      </div>
      <div class="about-portrait">
        <img src="/images/Me.png" :alt="english ? 'Maxim Ermolov' : 'Максим Ермолов'" loading="lazy" decoding="async">
      </div>
    </section>

    <section class="profile-experience" aria-labelledby="experience-title">
      <h2 id="experience-title">{{ copy.experienceTitle }}</h2>
      <div class="experience-list">
        <details v-for="job in copy.jobs" :key="job.company" class="experience-item">
          <summary>
            <span><strong>{{ job.role }}</strong><br>{{ job.company }}</span>
            <span class="experience-dates">{{ job.dates }}</span>
            <span class="disclosure-mark" aria-hidden="true"></span>
          </summary>
          <ul>
            <li v-for="highlight in job.highlights" :key="highlight.title">{{ highlight.description }}</li>
          </ul>
        </details>
      </div>
    </section>

    <section class="profile-education" aria-labelledby="education-title">
      <h2 id="education-title">{{ copy.educationTitle }}</h2>
      <div v-for="item in copy.education" :key="item.institution">
        <p>{{ item.institution }}</p>
        <p>{{ item.degree }} · {{ item.dates }}</p>
      </div>
    </section>
  </div>
</template>
