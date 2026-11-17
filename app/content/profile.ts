type Skill = {
  name: string
  kind: 'hard' | 'soft'
  tags: string[]
  level?: string
}

type Job = {
  role: string
  company: string
  dates: string
  highlights: { title: string; description: string }[]
}

type Education = {
  institution: string
  degree: string
  dates: string
  details: string[]
}

type Profile = {
  role: string
  focus: string
  intro: string
  resumeLabel: string
  aboutTitle: string
  experienceTitle: string
  experienceAmount: string
  hardSkillsTitle: string
  softSkillsTitle: string
  selectedWorkTitle: string
  seeAllWorkLabel: string
  educationTitle: string
  jobs: Job[]
  skills: Skill[]
  education: Education[]
}

export const resumeUrl = 'https://drive.google.com/uc?export=download&id=1-7PdmVxefQcBsWh4BqowsINNbixuxFgK'

export const profileContacts = [
  { name: 'linkedin', href: 'https://www.linkedin.com/in/maxim-ermolov-365820227/', icon: '/images/Linkedin.svg', label: 'LinkedIn' },
  { name: 'mail', href: 'mailto:max.ermolovv@gmail.com', icon: '/images/mail.svg', label: 'max.ermolovv@gmail.com' },
  { name: 'telegram', href: 'https://t.me/max_ermolov', icon: '/images/Telegram.svg', label: 'Telegram' },
  { name: 'phone', href: 'tel:+37499192501', icon: '/images/Phone.svg', label: '+374 99 192 501' },
]

const frontendTools = ['HTML', 'CSS', 'JavaScript', 'Vue', 'Nuxt', 'Git', 'Codex']
const visualTools = ['Blender', 'DaVinci Resolve', 'After Effects', 'Photoshop', 'Illustrator']

export const profile: Record<'ru' | 'en', Profile> = {
  ru: {
    role: 'Продуктовый дизайнер',
    focus: 'Design Engineer · B2B SaaS · EdTech',
    intro: 'Продуктовый дизайнер с 4+ годами опыта в UX/UI. Проектирую B2B-интерфейсы, дизайн-системы и сценарии онлайн-обучения. Реализую интерфейсы на Vue/Nuxt и использую Codex для работы с UI-кодом. Готов к переезду.',
    resumeLabel: 'Скачать резюме',
    aboutTitle: 'Обо мне',
    experienceTitle: 'Опыт работы',
    experienceAmount: '4+',
    hardSkillsTitle: 'Инструменты и методы',
    softSkillsTitle: 'Язык и подход к работе',
    selectedWorkTitle: 'Мои работы',
    seeAllWorkLabel: 'Все работы',
    educationTitle: 'Образование',
    jobs: [
      {
        role: 'Продуктовый дизайнер',
        company: 'Bozon (Россия)',
        dates: '10.2025 — настоящее время',
        highlights: [
          { title: 'ИИ-логистика', description: 'Спроектировал архитектуру и UX интерфейса управления автопарком с ИИ, перевёл сложные операционные данные в понятные рабочие сценарии.' },
          { title: 'Строительный финтех', description: 'Спроектировал работу со сметами и финансовыми данными, включая многоуровневое редактирование и каскадное обновление моделей.' },
          { title: 'White-label дизайн-система', description: 'Создал дизайн-систему на токенах и переменных для смены брендинга платформы.' },
          { title: 'Работа с разработкой', description: 'Передавал макеты и проверял, как они реализованы.' },
        ],
      },
      {
        role: 'UX/UI-дизайнер',
        company: 'NomadicSoft (США, удалённо)',
        dates: '07.2025 — настоящее время',
        highlights: [
          { title: '«Паника»', description: 'Спроектировал админку для управления партнёрской сетью квест-площадок. С нуля создал дизайн-систему админки и реализовал её в коде.' },
          { title: 'Операционные сценарии', description: 'Работал над интерфейсами бронирований, ролевого доступа, биллинга, автоплатежей и документооборота.' },
          { title: 'Клиентская часть', description: 'Делаю редизайн и обновляю вёрстку публичных страниц.' },
        ],
      },
      {
        role: 'UX/UI-дизайнер',
        company: 'ProMarketing (Россия)',
        dates: '11.2024 — настоящее время',
        highlights: [
          { title: 'Мобильные продукты', description: 'Проектировал мобильные приложения и админ-панели для CRM, логистики и отслеживания KPI.' },
          { title: 'Работа с требованиями', description: 'Вёл задачи от сбора требований до подготовки материалов для разработки.' },
        ],
      },
      {
        role: 'UI-дизайнер',
        company: 'AppCake (Гонконг, удалённо)',
        dates: '06.2021 — 10.2023',
        highlights: [
          { title: 'Игровые маркетплейсы', description: 'Проектировал интерфейсы маркетплейсов игрового контента, в том числе модов, скинов и текстур.' },
          { title: 'Серийное производство', description: 'Наладил процесс быстрого выпуска интерфейсов с едиными требованиями к графике.' },
        ],
      },
    ],
    skills: [
      { name: 'Figma', kind: 'hard', tags: ['Переменные', 'Токены', 'Дизайн-системы', 'Прототипирование', 'Компоненты'] },
      { name: 'Фронтенд', kind: 'hard', tags: frontendTools },
      { name: 'Визуальный дизайн', kind: 'hard', tags: visualTools },
      { name: 'Английский', kind: 'soft', level: 'B1', tags: [] },
      { name: 'Продуктовое мышление', kind: 'soft', tags: ['Карты пути пользователя', 'Исследования пользователей', 'A/B-тестирование', 'Анализ конкурентов'] },
      { name: 'Решение задач', kind: 'soft', tags: ['Критическое мышление', 'Аналитические навыки', 'Адаптивность'] },
    ],
    education: [
      {
        institution: 'Донской государственный технический университет',
        degree: 'Бакалавриат, прикладная информатика',
        dates: '2023–2027',
        details: ['Системный анализ', 'Дискретная математика', 'Алгоритмы', 'Программная инженерия'],
      },
    ],
  },
  en: {
    role: 'Product Designer',
    focus: 'Design Engineer · B2B SaaS · EdTech',
    intro: 'I’m a product designer with 4+ years in UX/UI. I design B2B interfaces, design systems and online learning experiences. I build interfaces with Vue and Nuxt and use Codex to work on UI code. Open to relocation.',
    resumeLabel: 'Download résumé',
    aboutTitle: 'About me',
    experienceTitle: 'Work experience',
    experienceAmount: '4+',
    hardSkillsTitle: 'Tools and methods',
    softSkillsTitle: 'Language and ways of working',
    selectedWorkTitle: 'Selected work',
    seeAllWorkLabel: 'All projects',
    educationTitle: 'Education',
    jobs: [
      {
        role: 'Product Designer',
        company: 'Bozon (Russia)',
        dates: 'Oct 2025 — present',
        highlights: [
          { title: 'AI for logistics', description: 'Designed the architecture and UX of an AI-assisted fleet management interface, turning complex operations data into clear workflows.' },
          { title: 'Construction fintech', description: 'Designed tools for working with cost estimates and financial data, including multi-level editing and cascading model updates.' },
          { title: 'White-label design system', description: 'Built a design system that uses tokens and variables to change the platform’s branding.' },
          { title: 'Engineering collaboration', description: 'Handed off designs and reviewed their implementation.' },
        ],
      },
      {
        role: 'UX/UI Designer',
        company: 'NomadicSoft (US, remote)',
        dates: 'Jul 2025 — present',
        highlights: [
          { title: 'Panika', description: 'Designed an admin interface for the company’s network of escape room partners. Created its design system from scratch and implemented it in code.' },
          { title: 'Operations workflows', description: 'Worked on interfaces for bookings, role-based access, billing, automatic payments and document management.' },
          { title: 'Customer-facing website', description: 'I’m redesigning the public pages and updating their frontend implementation.' },
        ],
      },
      {
        role: 'UX/UI Designer',
        company: 'ProMarketing (Russia)',
        dates: 'Nov 2024 — present',
        highlights: [
          { title: 'Mobile products', description: 'Designed mobile apps and admin interfaces for CRM, logistics and KPI tracking.' },
          { title: 'Requirements', description: 'Took assignments from requirements gathering to preparing materials for development.' },
        ],
      },
      {
        role: 'UI Designer',
        company: 'AppCake (Hong Kong, remote)',
        dates: 'Jun 2021 — Oct 2023',
        highlights: [
          { title: 'Gaming marketplaces', description: 'Designed marketplace interfaces for gaming content such as mods, skins and textures.' },
          { title: 'UI production', description: 'Set up a process for delivering interfaces quickly while maintaining consistent visual standards.' },
        ],
      },
    ],
    skills: [
      { name: 'Figma', kind: 'hard', tags: ['Variables', 'Tokens', 'Design systems', 'Prototyping', 'Components'] },
      { name: 'Frontend', kind: 'hard', tags: frontendTools },
      { name: 'Visual design', kind: 'hard', tags: visualTools },
      { name: 'English', kind: 'soft', level: 'B1', tags: [] },
      { name: 'Product thinking', kind: 'soft', tags: ['Customer journey mapping', 'User research', 'A/B testing', 'Competitor analysis'] },
      { name: 'Problem solving', kind: 'soft', tags: ['Critical thinking', 'Analytical skills', 'Adaptability'] },
    ],
    education: [
      {
        institution: 'Don State Technical University',
        degree: 'Bachelor’s program in Applied Informatics',
        dates: '2023–2027',
        details: ['Systems analysis', 'Discrete mathematics', 'Algorithms', 'Software engineering'],
      },
    ],
  },
}
