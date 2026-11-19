export type Language = 'ru' | 'en'

export interface ProjectMedia {
  src: string
  alt: string
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
  sections: CaseSection[]
}

export interface Project {
  slug: string
  cover?: string
  ru: ProjectCopy
  en: ProjectCopy
}

const image = (name: string, alt: string): ProjectMedia => ({ src: '/images/' + name + '.png', alt })
const screen = (name: string, alt: string, width = 428, height = 926): ProjectMedia => ({
  ...image(name, alt), width, height,
})

export const projects: Project[] = [
  {
    slug: 'golf',
    cover: '/images/golf-players.png',
    ru: {
      label: 'Мобильное приложение · UX/UI',
      title: 'Гольф',
      description: 'От поиска партнёров до карточки счёта. Мобильное приложение для игроков и тренеров объединяет подготовку, игру и разбор результата.',
      gallery: [
        screen('golf-players', 'Поиск игроков', 428, 928),
        screen('golf-home', 'Главная тренера с расписанием занятий'),
        screen('golf-score', 'Карточка счёта по лункам'),
      ],
      sections: [
        { title: 'Найти компанию для игры', text: 'Игрок может искать партнёров по уровню и клубу, а приглашение отправить прямо из профиля. При создании игры он выбирает площадку, формат и условия участия.' },
        { title: 'Два режима работы', text: 'У игрока в центре внимания предстоящий раунд. У тренера — занятия, ученики и доступные слоты. Для каждой роли предусмотрен свой главный экран.' },
        { title: 'Вести счёт на поле', text: 'В карточке раунда каждая лунка вынесена в отдельную строку. Рядом со счётом видны пар и сложность. Игрок может подтвердить карточку, которую внёс другой участник.' },
      ],
    },
    en: {
      label: 'Mobile app · UX/UI',
      title: 'Golf',
      description: 'From finding playing partners to keeping score. A mobile app for golfers and coaches brings preparation, play and round results into one place.',
      gallery: [
        screen('golf-players', 'Player search', 428, 928),
        screen('golf-home', 'Coach home with the lesson schedule'),
        screen('golf-score', 'Hole-by-hole scorecard'),
      ],
      sections: [
        { title: 'Find playing partners', text: 'Players can filter by skill level and club, then send an invitation directly from a profile. When setting up a round, they choose the venue, format and participation requirements.' },
        { title: 'Two ways to use the app', text: 'Golfers see their upcoming rounds. Coaches see lessons, students and available slots. Each role has its own home screen.' },
        { title: 'Keep score on the course', text: 'The scorecard gives each hole its own row with par and difficulty alongside the score. Players can confirm scorecards entered by another participant.' },
      ],
    },
  },
  {
    slug: 'lesson-space',
    ru: {
      label: 'Собственный продукт · Дизайн и разработка',
      title: 'Lesson Space',
      description: 'Комната для онлайн-занятий, где преподаватель и ученик созваниваются, работают на общей доске и выполняют задания.',
      sections: [
        { title: 'Мой вклад', text: 'Сам спроектировал сценарии и интерфейс и собрал MVP на Vue и Nuxt.' },
        { title: 'Вход по ссылке', text: 'Преподаватель отправляет приглашение. Ученик открывает комнату по ссылке и подключается к звонку.' },
        { title: 'Объяснение и практика в одном месте', text: 'На совместной доске преподаватель объясняет материал, а ученик выполняет интерактивные задания. Оба работают в одной комнате.' },
      ],
    },
    en: {
      label: 'Independent product · Design and development',
      title: 'Lesson Space',
      description: 'An online lesson room where teachers and students can call, work on a shared whiteboard and complete interactive exercises.',
      sections: [
        { title: 'My contribution', text: 'I designed the flows and interface and built the MVP independently with Vue and Nuxt.' },
        { title: 'Join from a link', text: 'The teacher shares an invitation. The student opens the room from the link and joins the call.' },
        { title: 'Teach and practise in one place', text: 'The teacher can explain the material on the shared whiteboard and the student can complete interactive exercises in the same room.' },
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
