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
    role: 'Продуктовый дизайнер и Design Engineer',
    focus: 'Design Engineer · B2B SaaS · EdTech',
    intro: 'Мне интересны задачи, где в интерфейсе сходятся разные роли и сложные правила. В B2B это дизайн-системы и рабочие процессы, в Lesson Space — доска, звонок и подготовка к уроку.',
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
        role: 'Product Designer',
        company: 'Bozon (Россия)',
        dates: '10.2025 — Настоящее время',
        highlights: [
          { title: 'ИИ-логистика', description: 'Спроектировал архитектуру и UX интерфейса управления автопарком с ИИ, перевёл сложные операционные данные в понятные рабочие сценарии.' },
          { title: 'White-label дизайн-система', description: 'Создал дизайн-систему на токенах и переменных для смены брендинга платформы.' },
          { title: 'Работа с разработкой', description: 'Передавал макеты и проверял, как они реализованы.' },
        ],
      },
      {
        role: 'UX/UI Designer',
        company: 'NomadicSoft (США/удалённо)',
        dates: '07.2025 — Настоящее время',
        highlights: [
          { title: 'Клиентская часть', description: 'Делаю редизайн и обновляю вёрстку публичных страниц.' },
        ],
      },
      {
        role: 'UX/UI Designer',
        company: 'ProMarketing (Россия)',
        dates: '11.2024 — Настоящее время',
        highlights: [
          { title: 'Мобильные продукты', description: 'Проектировал мобильные приложения и админ-панели для CRM, логистики и отслеживания KPI.' },
          { title: 'Работа с требованиями', description: 'Вёл задачи от сбора требований до подготовки материалов для разработки.' },
        ],
      },
      {
        role: 'UI Designer',
        company: 'AppCake (Гонконг/удалённо)',
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
    role: 'Product Designer & Design Engineer',
    focus: 'Design Engineer · B2B SaaS · EdTech',
    intro: 'I’m drawn to products where different roles and complex rules meet in one interface. In B2B, that means design systems and workflows. In Lesson Space, it means the board, calls and lesson preparation.',
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
        dates: '10.2025 — Present',
        highlights: [
          { title: 'AI for logistics', description: 'Designed the architecture and UX of an AI-assisted fleet management interface, turning complex operations data into clear workflows.' },
          { title: 'White-label design system', description: 'Built a design system that uses tokens and variables to change the platform’s branding.' },
          { title: 'Engineering collaboration', description: 'Handed off designs and reviewed their implementation.' },
        ],
      },
      {
        role: 'UX/UI Designer',
        company: 'NomadicSoft (USA/Remote)',
        dates: '07.2025 — Present',
        highlights: [
          { title: 'Customer-facing website', description: 'I’m redesigning the public pages and updating their frontend implementation.' },
        ],
      },
      {
        role: 'UX/UI Designer',
        company: 'ProMarketing (Russia)',
        dates: '11.2024 — Present',
        highlights: [
          { title: 'Mobile products', description: 'Designed mobile apps and admin interfaces for CRM, logistics and KPI tracking.' },
          { title: 'Requirements', description: 'Took assignments from requirements gathering to preparing materials for development.' },
        ],
      },
      {
        role: 'UI Designer',
        company: 'AppCake (Hong Kong/Remote)',
        dates: '06.2021 — 10.2023',
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
        details: ['Systems Analysis', 'Discrete Mathematics', 'Algorithms', 'Software Engineering'],
      },
    ],
  },
}
