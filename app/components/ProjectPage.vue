<script setup lang="ts">
import { legacyCases, type LegacyCaseBlock } from '~/content/legacyCaseCopy'
import { caseHeroes, caseMediaCaptions } from '~/content/legacyPresentation'
import type { Language, Project, ProjectCopy } from '~/content/projects'

const props = defineProps<{ project: Project; language: Language }>()
const { pathFor } = usePortfolioRouting()
const copy = computed(() => props.project[props.language])
const layout = computed(() => legacyCases[props.project.slug]!)
const cover = computed(() => caseHeroes[props.project.slug])
const caseTitle = computed(() => props.language === 'ru' ? layout.value.title : copy.value.title)
const label = computed(() => props.language === 'ru' ? layout.value.label : copy.value.label)
const description = computed(() => props.language === 'ru' ? layout.value.description : copy.value.description)
const englishOutcomes: Record<string, string> = {
  fintech: 'A transparent procurement process, faster request processing and less routine work.',
  'ai-logistic': 'Request processing time fell by 40%, vehicle records became more accurate, and teams gained a shared knowledge base for running logistics operations.',
  quests: 'Automated partner onboarding, made requests quicker to process and gave the team clearer financial oversight.',
  kpd: 'Clear communication, automated rewards and faster onboarding for new users.',
  logistic: 'Operating costs fell 15% in the first quarter and automated reporting halved request processing time.',
  restaurant: 'Clear booking status for guests and less manual work for venue managers through automated statuses.',
  barber: 'An intuitive product designed to help clients book and give professionals a useful CRM workspace.',
}
const tagTranslations: Record<string, string> = {
  'B2B-автоматизация': 'B2B Automation',
  'UX-проектирование': 'UX Design',
  'Системное мышление': 'Systems Thinking',
  'Оптимизация процессов': 'Process Optimization',
}
const missingMediaCaptions = ['// REGISTRATION SCENARIOS', '// USER MANAGEMENT', '// APPROVAL ALGORITHM', '// RESOURCE DASHBOARD']
const expertise = computed(() => {
  if (props.language === 'ru') return layout.value.expertise
  if (props.project.slug === 'fintech') return 'Focus and Expertise'
  if (props.project.slug === 'logistic') return 'Key Modules'
  return 'Expertise'
})
const tags = computed(() => props.language === 'ru' ? layout.value.tags : layout.value.tags.map(tag => tagTranslations[tag] || tag))
const details = computed(() => layout.value.details.map((detail, index) => {
  if (props.language === 'ru') return detail
  const translated = copy.value.details?.[index]
  return translated ? { label: '// ' + translated.title.toUpperCase(), text: translated.text } : {
    label: '// OUTCOME',
    text: englishOutcomes[props.project.slug] || '',
  }
}))

function localizeSection(blocks: LegacyCaseBlock[], translation: ProjectCopy['sections'][number], sectionIndex: number): LegacyCaseBlock[] {
  return blocks.map((block, index) => {
    if (block.kind === 'h2' || block.kind === 'h3') return { ...block, text: translation.title }
    if (block.kind === 'p') return { ...block, text: translation.text || '' }
    if (block.kind === 'label') {
      const next = blocks[index + 1]
      const mediaName = (next?.kind === 'img' || next?.kind === 'video') ? next.src.split('/').pop() : undefined
      const caption = mediaName ? caseMediaCaptions[mediaName]?.en : missingMediaCaptions[sectionIndex]
      return { ...block, text: caption || block.text }
    }
    if (block.kind === 'img' || block.kind === 'video') {
      return { ...block, alt: translation.media?.find(media => media.src === block.src)?.alt || translation.title }
    }
    return block
  })
}

const sections = computed(() => layout.value.sections.map((section, index) => {
  const translated = copy.value.sections[index]
  return props.language === 'en' && translated ? localizeSection(section, translated, index) : section
}))
const title = computed(() => caseTitle.value + (props.language === 'en' ? ' · Maxim Ermolov' : ' · Максим Ермолов'))
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: () => (cover.value || props.project.cover) && 'https://max-ermolov.work' + (cover.value || props.project.cover),
})
</script>

<template>
  <article class="project-page case-page">
    <header class="project-hero">
      <div class="project-header-info">
        <img v-if="cover" v-magnetic="0.025" :src="cover" :alt="language === 'en' ? 'Case study cover' : 'Обложка кейса'" class="case-cover" decoding="async" fetchpriority="high">
        <span class="card-label">{{ label }}</span>
        <h1>{{ caseTitle }}</h1>
        <p class="project-subtitle">{{ description }}</p>
      </div>
    </header>

    <div class="case-body" :class="{ 'project-grid-content': details.length }">
      <aside v-if="details.length" class="project-column sticky-top case-aside">
        <div class="project-details-container">
          <div v-for="(detail, index) in details" :key="index" class="project-details-card">
            <span class="card-label">{{ detail.label }}</span>
            <div v-if="layout.detailsAccordion" class="accordion-content"><p>{{ detail.text }}</p></div>
            <p v-else>{{ detail.text }}</p>
          </div>
          <h3>{{ expertise }}</h3>
          <div class="tag-group">
            <span v-for="tag in tags" :key="tag" class="tag ignore-magnetic">{{ tag }}</span>
          </div>
        </div>
      </aside>
      <div class="project-column">
        <section v-for="(section, index) in sections" :key="index" class="project-section">
          <template v-for="(block, blockIndex) in section" :key="blockIndex">
            <video v-if="block.kind === 'video'" :src="block.src" :aria-label="block.alt" controls playsinline preload="none" />
            <img v-else-if="block.kind === 'img'" v-magnetic="block.magnetic ? 0.025 : 0" :src="block.src" :alt="block.alt" loading="lazy" decoding="async">
            <span v-else-if="block.kind === 'label'" class="card-label" :class="{ 'case-caption-spaced': block.spaceAbove }">{{ block.text }}</span>
            <p v-else-if="block.kind === 'p'" class="case-text">{{ block.text }}</p>
            <component :is="block.kind" v-else-if="'text' in block">{{ block.text }}</component>
          </template>
        </section>
        <p v-if="!details.length">
          <NuxtLink v-magnetic :to="pathFor(language === 'en' ? '' : 'portfolio')" class="btn">
            {{ language === 'en' ? 'Selected work' : 'Мои работы' }}
          </NuxtLink>
        </p>
      </div>
    </div>
  </article>
</template>
