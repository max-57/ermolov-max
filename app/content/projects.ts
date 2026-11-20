export type Language = 'ru' | 'en'

export interface ProjectMedia {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

interface CaseSection {
  title: string
  text: string
  media?: ProjectMedia[]
}

interface ProjectCopy {
  label: string
  title: string
  description: string
  gallery?: ProjectMedia[]
  galleryLayout?: 'wide'
  sections: CaseSection[]
}

export interface Project {
  slug: string
  cover?: string
  coverCompanion?: string
  website?: string
  ru: ProjectCopy
  en: ProjectCopy
}

const image = (name: string, alt: string): ProjectMedia => ({ src: '/images/' + name + '.png', alt })
const screen = (name: string, alt: string, width = 428, height = 926): ProjectMedia => ({
  ...image(name, alt), width, height,
})
const golfPlay = '/images/golf-onboarding-play.webp'
const golfCoach = '/images/golf-onboarding-coach.webp'

export const projects: Project[] = [
  {
    slug: 'lesson-space',
    cover: '/images/lesson-space-room.webp',
    website: 'https://lesson-space.duckdns.org/',
    ru: {
      label: 'Свой продукт · Дизайн и разработка',
      title: 'Lesson Space',
      description: 'Комната для онлайн-занятий с виртуальной доской и звонком. От идеи до работающего MVP сделал всё сам.',
      galleryLayout: 'wide',
      gallery: [{
        src: '/images/lesson-space-room.webp', width: 1440, height: 784,
        alt: 'Открытая доска урока английского с карточками задания, инструментами, звонком и приглашением',
        caption: 'Рабочая доска MVP с демонстрационными данными',
      }],
      sections: [
        { title: 'Звонок рядом с доской', text: 'На занятии преподаватель объясняет материал, ученик сразу пробует. Я поместил звонок, объяснение и задания в одну комнату, чтобы не возвращаться между отдельными сервисами.' },
        { title: 'Своя комната для каждого занятия', text: 'Преподаватель создаёт комнату, готовит доску и приглашает ученика по ссылке. Список комнат помогает вернуться к нужному уроку.', media: [{
          src: '/images/lesson-space-rooms.webp', width: 1440, height: 468,
          alt: 'Список комнат с миниатюрами трёх подготовленных досок',
          caption: 'Список комнат MVP с демонстрационными данными',
        }] },
        { title: 'От идеи до работающей версии', text: 'Сформулировал задачу, спроектировал доску и сценарий занятия, написал интерфейс на Vue и Nuxt и собрал работающий продукт. Продолжаю развивать MVP.' },
      ],
    },
    en: {
      label: 'Independent product · Design and development',
      title: 'Lesson Space',
      description: 'An online lesson room with a virtual whiteboard and calls. I took it from idea to working MVP on my own.',
      galleryLayout: 'wide',
      gallery: [{
        src: '/images/lesson-space-room.webp', width: 1440, height: 784,
        alt: 'An English lesson board with activity cards, whiteboard tools, call and invite controls',
        caption: 'MVP lesson board with demo data',
      }],
      sections: [
        { title: 'The call stays beside the board', text: 'During a lesson, the teacher explains a concept and the student tries it. I put the call, explanation and practice in one room so both can keep working without switching services.' },
        { title: 'A room for each lesson', text: 'The teacher creates a room, prepares the board and invites the student with a link. The room list makes it easy to return to the right lesson.', media: [{
          src: '/images/lesson-space-rooms.webp', width: 1440, height: 468,
          alt: 'Room list with thumbnails of three prepared lesson boards',
          caption: 'MVP room list with demo data',
        }] },
        { title: 'From idea to a working product', text: 'I defined the problem, designed the board and lesson flow, implemented the interface in Vue and Nuxt, and built the working product. I’m continuing to develop the MVP.' },
      ],
    },
  },
  {
    slug: 'golf',
    cover: golfPlay,
    coverCompanion: golfCoach,
    ru: {
      label: 'Проект мобильного приложения · UX/UI',
      title: 'Гольф',
      description: 'Мобильный сервис для гольфа. Игрок может найти компанию, выбрать площадку и вести счёт по лункам.',
      gallery: [
        { src: golfPlay, width: 856, height: 1852, alt: 'Вступительный экран о поиске партнёров и игр', caption: 'Первый запуск · Поиск компании' },
        { src: golfCoach, width: 856, height: 1852, alt: 'Вступительный экран о занятиях с тренером и экипировке', caption: 'Первый запуск · Тренировки' },
        screen('golf-score', 'Карточка счёта по лункам'),
      ],
      sections: [
        { title: 'Объяснить пользу при первом запуске', text: 'Вступительные экраны знакомят игрока с двумя сценариями: сыграть с партнёрами и записаться к тренеру. Оба можно пропустить и сразу перейти в приложение.' },
        { title: 'Найти компанию для игры', text: 'Игрок может искать партнёров по уровню и клубу, а приглашение отправить прямо из профиля. При создании игры он выбирает площадку, формат и условия участия.' },
        { title: 'Вести счёт на поле', text: 'В карточке раунда каждая лунка вынесена в отдельную строку. Рядом со счётом видны пар и сложность. Игрок может подтвердить карточку, которую внёс другой участник.' },
      ],
    },
    en: {
      label: 'Mobile app design · UX/UI',
      title: 'Golf',
      description: 'A mobile golf app for finding playing partners, choosing a venue and keeping score hole by hole.',
      gallery: [
        { src: golfPlay, width: 856, height: 1852, alt: 'Onboarding screen about finding playing partners and games', caption: 'Onboarding · Find a game' },
        { src: golfCoach, width: 856, height: 1852, alt: 'Onboarding screen about coaching and equipment', caption: 'Onboarding · Train with a coach' },
        screen('golf-score', 'Hole-by-hole scorecard'),
      ],
      sections: [
        { title: 'Show what the app offers on first launch', text: 'The onboarding introduces two things golfers can do: find partners for a round and book a session with a coach. They can skip it and open the app directly.' },
        { title: 'Find playing partners', text: 'Players can filter by skill level and club, then send an invitation directly from a profile. When setting up a round, they choose the venue, format and participation requirements.' },
        { title: 'Keep score on the course', text: 'The scorecard gives each hole its own row with par and difficulty alongside the score. Players can confirm scorecards entered by another participant.' },
      ],
    },
  },
  {
    slug: 'kpd',
    cover: '/images/kpd-case-cover.png',
    ru: {
      label: 'Мобильное приложение · UX/UI',
      title: 'Семейные задачи и награды',
      description: 'Родители ставят задачи, дети копят баллы к цели, а родственники могут подключиться и поддержать их.',
      gallery: [
        screen('kpd-tasks', 'Подсказка родителю при проверке задания'),
        screen('kpd-goals', 'Цель ребёнка и прогресс по баллам'),
      ],
      sections: [
        { title: 'У каждой роли своя главная', text: 'Родитель видит задачи, которые ждут проверки. Ребёнок видит свои задания и сколько баллов осталось до цели.' },
        { title: 'Каждое выполненное задание приближает к цели', text: 'Баллы начисляются, когда родитель подтверждает выполнение. На экране цели видны накопленные баллы и сколько ещё нужно набрать.' },
        { title: 'Приглашения и подсказки', text: 'Родитель приглашает ребёнка и подтверждает приглашения родственникам. Подсказки помогают разобраться с задачами и целями при первом использовании.' },
      ],
    },
    en: {
      label: 'Mobile app · UX/UI',
      title: 'Family tasks and rewards',
      description: 'Parents assign tasks, children earn points toward a goal, and relatives can join in to support them.',
      gallery: [
        screen('kpd-tasks', 'Guidance for parents reviewing tasks'),
        screen('kpd-goals', 'A child’s goal and progress in points'),
      ],
      sections: [
        { title: 'A home screen for each role', text: 'Parents see which tasks need review. Children see their tasks and how many points they still need to reach their goal.' },
        { title: 'Each completed task brings the goal closer', text: 'Points are added when a parent approves a task. The goal screen shows how many points have been earned and how many are still needed.' },
        { title: 'Invitations and first-use guidance', text: 'Parents invite children and approve invitations to relatives. Contextual tips explain tasks and goals when users first encounter them.' },
      ],
    },
  },
  {
    slug: 'logistic',
    cover: '/images/logistic-case-cover.png',
    ru: {
      label: 'B2B-платформа · Веб и мобильное приложение',
      title: 'Грузоперевозки',
      description: 'Рабочее место логиста и приложение водителя связывают готовность склада, ход рейса и выплаты по сменам.',
      gallery: [
        screen('freight-trip', 'Маршрут водителя, готовность груза и точки доставки', 426),
        screen('freight-earnings', 'Доходы водителя и путевые листы'),
      ],
      sections: [
        { title: 'Когда отправлять машину', text: 'Логист видит готовность склада. При заданном пороге водитель получает уведомление, а логист видит, подтвердил ли водитель выезд.' },
        { title: 'Рейс на одном экране', text: 'Водитель видит склад, маршрут и порядок точек. По ходу рейса он отмечает выезд, погрузку и доставку.' },
        { title: 'Из чего складывается выплата', text: 'Сводка за период показывает итоговую сумму, возвраты и штрафы. Для деталей можно открыть путевой лист.' },
      ],
    },
    en: {
      label: 'B2B platform · Web and mobile',
      title: 'Freight operations',
      description: 'A dispatch workspace and driver app connect warehouse readiness, route progress and shift payments.',
      gallery: [
        screen('freight-trip', 'Driver route, load readiness and delivery stops', 426),
        screen('freight-earnings', 'Driver earnings and trip sheets'),
      ],
      sections: [
        { title: 'When to dispatch', text: 'Dispatchers see how close a warehouse is to its target. At a configured threshold, the driver receives a notification and the dispatcher can see whether departure has been confirmed.' },
        { title: 'A trip on one screen', text: 'Drivers see their warehouse, route and stop order. They update their status as they depart, load and deliver.' },
        { title: 'How each payment adds up', text: 'The summary shows the total, returns and penalties for the selected period. Drivers can open a trip sheet for details.' },
      ],
    },
  },
  {
    slug: 'restaurant',
    cover: '/images/cafe-case-cover.png',
    ru: {
      label: 'Сервис бронирования · UX/UI',
      title: 'Столик на схеме зала',
      description: 'Гость выбирает конкретный стол на схеме, а ресторан управляет рассадкой и заявками.',
      sections: [
        { title: 'Поиск ресторана', text: 'Гость ищет заведение на карте или в списке и фильтрует результаты по кухне и времени бронирования.', media: [image('cafe-main', 'Поиск ресторанов')] },
        { title: 'Выбор конкретного столика', text: 'Схема показывает свободные, занятые и забронированные столы на выбранное время. По нажатию видны вместимость и условия депозита.', media: [image('cafe-booking', 'Выбор столика на схеме зала')] },
        { title: 'Управление залом', text: 'Ресторан может завести несколько схем для разных залов или этажей, задать условия для отдельных столов и обработать заявки.', media: [image('cafe-cafe', 'Настройка схемы зала'), image('cafe-admin-booking', 'Список заявок на бронирование')] },
      ],
    },
    en: {
      label: 'Booking service · UX/UI',
      title: 'Pick a table from the floor plan',
      description: 'Guests choose a specific table from the floor plan while restaurant staff manage seating and reservation requests.',
      sections: [
        { title: 'Find a restaurant', text: 'Guests can browse a map or list and filter by cuisine and reservation time.', media: [image('cafe-main', 'Restaurant search')] },
        { title: 'Choose a specific table', text: 'The floor plan shows which tables are free, occupied or reserved at the chosen time. Selecting a table reveals its capacity and deposit requirements.', media: [image('cafe-booking', 'Choosing a table from the floor plan')] },
        { title: 'Manage the venue', text: 'Restaurants can set up plans for different rooms or floors, configure individual table requirements and process requests.', media: [image('cafe-cafe', 'Floor-plan editor'), image('cafe-admin-booking', 'Reservation requests')] },
      ],
    },
  },
  {
    slug: 'quests',
    ru: {
      label: 'Веб-платформа · Дизайн и фронтенд',
      title: 'Паника',
      description: 'Спроектировал дизайн-систему для админки с нуля и реализовал её в коде. Сейчас обновляю дизайн и вёрстку клиентской части.',
      sections: [
        { title: 'С нуля в Figma', text: 'Начал с интерфейса админки и собрал дизайн-систему для этой части продукта.' },
        { title: 'Из дизайна в код', text: 'Сам перенёс систему админки в код. Сейчас работаю над следующим этапом, редизайном и новой вёрсткой клиентской части.' },
      ],
    },
    en: {
      label: 'Web platform · Design and frontend',
      title: 'Panika',
      description: 'I built the admin design system from scratch in design and code. I’m now redesigning and implementing the customer-facing interface.',
      sections: [
        { title: 'Built from scratch in Figma', text: 'I started with the admin interface and created the design system for that part of the product.' },
        { title: 'From design to code', text: 'I implemented the admin system myself. I’m now redesigning and rebuilding the customer-facing part of the platform.' },
      ],
    },
  },
  {
    slug: 'fintech',
    ru: {
      label: 'B2B-платформа · Дизайн-система и white-label',
      title: 'Quest Request',
      description: 'С нуля спроектировал дизайн-систему для крупной B2B-платформы и реализовал несколько white-label разделов.',
      sections: [
        { title: 'Одна система для разных брендов', text: 'Спроектировал общую основу дизайна, которую можно использовать для разных брендов.' },
        { title: 'Применил её в продукте', text: 'Реализовал на базе этой системы несколько разделов платформы. Дизайн-система и white-label разделы были моей зоной ответственности.' },
      ],
    },
    en: {
      label: 'B2B platform · Design system and white-label',
      title: 'Quest Request',
      description: 'I designed the system for a large B2B platform from scratch and implemented several white-label sections.',
      sections: [
        { title: 'One system across brands', text: 'I designed a shared foundation that the product could use across different brands.' },
        { title: 'Applied it to the product', text: 'I used the system to implement several platform sections. The design system and white-label sections were my responsibility.' },
      ],
    },
  },
  {
    slug: 'ai-logistic',
    ru: {
      label: 'B2B · UX-проектирование',
      title: 'ИИ для управления автопарком',
      description: 'Концепция рабочего пространства для обслуживания транспорта, подбора комплектующих и согласования заявок.',
      sections: [
        { title: 'Сначала контекст транспорта', text: 'Карточка автомобиля собирает его характеристики и потребности. Дополнительные поля помогают учитывать различия между типами техники.' },
        { title: 'От рекомендации к заявке', text: 'Ассистент помогает подобрать комплектующие и оценить расходы. Список потребностей и статусы согласования показывают, что уже взяли в работу.' },
      ],
    },
    en: {
      label: 'B2B · UX design',
      title: 'AI for fleet operations',
      description: 'A workspace concept for vehicle maintenance, parts selection and request approvals.',
      sections: [
        { title: 'Start with vehicle context', text: 'The vehicle record brings its specifications and needs together. Custom fields accommodate differences between equipment types.' },
        { title: 'From suggestion to request', text: 'The assistant helps select parts and estimate costs. A needs list and approval statuses show which requests are already being handled.' },
      ],
    },
  },
]
