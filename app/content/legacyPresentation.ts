type CardCopy = { label: string; title: string; description: string }
type CatalogCard = { ru: CardCopy; en: CardCopy; thumb?: string }

export const catalogOrder = ['lesson-space', 'fintech', 'quests', 'kpd', 'logistic', 'restaurant', 'barber'] as const

export const catalogCards: Record<string, CatalogCard> = {
  'lesson-space': {
    ru: {
      label: 'EDTECH · СОБСТВЕННЫЙ MVP',
      title: 'Lesson Space',
      description: 'Сам спроектировал и собрал комнату онлайн-занятия со звонком, совместной доской и интерактивными заданиями.',
    },
    en: {
      label: 'EDTECH · INDEPENDENT MVP',
      title: 'Lesson Space',
      description: 'I designed and built an online lesson room with calls, a shared whiteboard, and interactive exercises.',
    },
  },
  fintech: {
    thumb: '/images/fintech-case-cover.png',
    ru: {
      label: '// ENTERPRISE B2B SAAS',
      title: 'B2B-платформа для управления снабжением',
      description: 'Автоматизированная B2B-платформа для управления строительным снабжением, превращающая хаотичный процесс закупок в прозрачную цифровую систему, которая исключает рутинный перенос данных и минимизирует потери информации.',
    },
    en: {
      label: '// ENTERPRISE B2B SAAS',
      title: 'B2B procurement management platform',
      description: 'An automated B2B platform for construction procurement that turns a chaotic purchasing process into a transparent digital system, eliminates repetitive data entry, and minimizes information loss.',
    },
  },
  quests: {
    thumb: '/images/quests-case-cover.png',
    ru: {
      label: '// B2B DASHBOARD • SAAS',
      title: '«Паника» — управление площадками',
      description: 'Централизованная экосистема для автоматизации бронирований, финансового учета и управления правами доступа контрагентов.',
    },
    en: {
      label: '// B2B DASHBOARD • SAAS',
      title: 'Panika — venue management',
      description: 'A centralized system for automating bookings and financial records and managing partners’ access permissions.',
    },
  },
  kpd: {
    thumb: '/images/kpd-case-cover.png',
    ru: {
      label: '// MOBILE APP • GAMIFICATION',
      title: 'Экосистема семейного менеджмента',
      description: 'Кросс-платформенный сервис для организации домашних дел, который превращает рутину в игру с системой мотивации и наград.',
    },
    en: {
      label: '// MOBILE APP • GAMIFICATION',
      title: 'Family management ecosystem',
      description: 'A cross-platform service for organizing household chores that turns routines into a game with incentives and rewards.',
    },
  },
  logistic: {
    thumb: '/images/logistic-case-cover.png',
    ru: {
      label: '// B2B ЛОГИСТИЧЕСКАЯ ПЛАТФОРМА',
      title: 'Цифровизация процессов грузоперевозок',
      description: 'Оптимизация взаимодействия между администраторами, логистами и водителями через автоматизацию документооборота и прозрачный мониторинг маршрутов.',
    },
    en: {
      label: '// B2B LOGISTICS PLATFORM',
      title: 'Digitizing freight operations',
      description: 'Streamlining coordination between administrators, logistics teams, and drivers through automated document workflows and transparent route monitoring.',
    },
  },
  restaurant: {
    thumb: '/images/cafe-case-cover.png',
    ru: {
      label: '// MOBILE APP • ТЕГ',
      title: 'B2B-экосистема для управления бронированием',
      description: 'Масштабируемое SaaS-решение, оптимизирующее взаимодействие между пользователями и заведениями через интерактивное управление загрузкой.',
    },
    en: {
      label: '// MOBILE APP • TAG',
      title: 'B2B reservation management ecosystem',
      description: 'A scalable SaaS product that helps guests and venues coordinate through interactive capacity management.',
    },
  },
  barber: {
    thumb: '/images/barber-case-cover.png',
    ru: {
      label: '// MOBILE APP • BEAUTY',
      title: 'Маркетплейс услуг бьюти-индустрии',
      description: 'Создание экосистемы для прямой коммуникации между мастерами сферы услуг и клиентами с целью автоматизации бронирования и управления портфолио.',
    },
    en: {
      label: '// MOBILE APP • BEAUTY',
      title: 'Beauty services marketplace',
      description: 'A system for direct communication between beauty professionals and clients, with tools to automate bookings and manage portfolios.',
    },
  },
}

export const caseHeroes: Record<string, string | undefined> = {
  quests: '/images/quests-cover.png',
  kpd: '/images/kpd-cover.png',
  logistic: '/images/logistic-cover.png',
  restaurant: '/images/cafe-cover.png',
  barber: '/images/barber-cover.png',
}

export const caseMediaCaptions: Record<string, { ru: string; en: string }> = {
  'b2b-smeta-before.png': { ru: '// ДО', en: '// BEFORE' },
  'b2b-smeta-after.png': { ru: '// ПОСЛЕ', en: '// AFTER' },
  'b2b-smeta-path.png': { ru: '// ЦИКЛ СУЩНОСТИ', en: '// ENTITY LIFECYCLE' },
  'b2b-smeta-element.png': { ru: '// КАРТОЧКА СУЩНОСТИ', en: '// ENTITY CARD' },
  'dashboard.png': { ru: '// МОНИТОРИНГ И КОНТРОЛЬ', en: '// MONITORING AND CONTROL' },
  'finance.png': { ru: '// ФИНАНСЫ', en: '// FINANCE' },
  'build-spot.png': { ru: '// СОЗДАНИЕ СПОТА', en: '// VENUE SETUP' },
  'workers-list.png': { ru: '// СПИСОК СОТРУДНИКОВ', en: '// STAFF LIST' },
  'worker.png': { ru: '// КАРТОЧКА СОТРУДНИКА', en: '// STAFF PROFILE' },
  'kpd-main.png': { ru: '// ГЛАВНЫЙ ЭКРАН: РОДИТЕЛЬ • РЕБЕНОК • РОДСТВЕННИК', en: '// HOME SCREEN: PARENT • CHILD • RELATIVE' },
  'kpd-target.png': { ru: '// УПРАВЛЕНИЕ ЦЕЛЯМИ: РОДИТЕЛЬ • РЕБЕНОК • РОДСТВЕННИК', en: '// MANAGING GOALS: PARENT • CHILD • RELATIVE' },
  'kpd-net.png': { ru: '// РОЛЕВАЯ МОДЕЛЬ: РОДИТЕЛЬ • РЕБЕНОК • РОДСТВЕННИК', en: '// USER ROLES: PARENT • CHILD • RELATIVE' },
  'kpd-teach.png': { ru: '// ОБУЧАЮЩИЕ ЭКРАНЫ: ПРОЦЕСС АДАПТАЦИИ', en: '// TUTORIAL SCREENS: ONBOARDING' },
  'logistic-statistic.png': { ru: '// ДАШБОРД ЭФФЕКТИВНОСТИ', en: '// PERFORMANCE DASHBOARD' },
  'logistic-finance.png': { ru: '// ФИНАНСОВЫЙ МОДУЛЬ И ВЫПЛАТЫ', en: '// FINANCE MODULE AND PAYOUTS' },
  'logistic-track.png': { ru: '// ИНТЕРФЕЙС ТРЕКИНГА МАРШРУТОВ', en: '// ROUTE TRACKING INTERFACE' },
  'logistic-warehouses.png': { ru: '// УПРАВЛЕНИЕ СКЛАДАМИ', en: '// WAREHOUSE MANAGEMENT' },
  'logistic-app.png': { ru: '// ОБЩИЙ ОБЗОР ПЛАТФОРМЫ', en: '// PLATFORM OVERVIEW' },
  'cafe-main.png': { ru: '// // ГЛАВНЫЙ ЭКРАН ПОИСКА', en: '// // MAIN SEARCH SCREEN' },
  'cafe-admin-page.png': { ru: '// // КАРТОЧКА РЕСТОРАНА', en: '// // RESTAURANT PROFILE' },
  'cafe-booking.png': { ru: '// // ВЫБОР СТОЛА И БРОНИРОВАНИЕ', en: '// // TABLE SELECTION AND BOOKING' },
  'cafe-cafe.png': { ru: '// // АДМИНКА: НАСТРОЙКА ЗАЛА', en: '// // ADMIN: FLOOR PLAN SETUP' },
  'cafe-admin-booking.png': { ru: '// // АДМИНКА: МЕНЕДЖЕР БРОНИРОВАНИЙ', en: '// // ADMIN: RESERVATION MANAGER' },
  'barber-onbording.png': { ru: '// ONBOARDING FLOW', en: '// ONBOARDING FLOW' },
  'barber-main-client.png': { ru: '// SEARCH & DISCOVERY', en: '// SEARCH & DISCOVERY' },
  'barber-booking.png': { ru: '// BOOKING FLOW', en: '// BOOKING FLOW' },
  'barber-master.png': { ru: '// MASTER DASHBOARD', en: '// MASTER DASHBOARD' },
  'barber-bookings-client.png': { ru: '// BOOKING MANAGEMENT', en: '// BOOKING MANAGEMENT' },
}
