export type Language = 'ru' | 'en'

export interface ProjectMedia {
  src: string
  alt: string
  video?: boolean
}

export interface ProjectCopy {
  label: string
  title: string
  description: string
  details?: { title: string; text: string }[]
  sections: { title: string; text?: string; media?: ProjectMedia[] }[]
}

export interface Project {
  slug: string
  cover?: string
  tags?: string[]
  ru: ProjectCopy
  en: ProjectCopy
}

const image = (filename: string, alt: string): ProjectMedia => ({
  src: `/images/${filename}`,
  alt,
})

export const projects: Project[] = [
  {
    slug: 'lesson-space',
    tags: ['Product Design', 'EdTech', 'Vue', 'Nuxt'],
    ru: {
      label: 'Собственный EdTech-продукт · MVP',
      title: 'Lesson Space',
      description: 'Учебная комната со звонком, совместной доской и интерактивными заданиями.',
      sections: [
        {
          title: 'Сценарий занятия',
          text: 'Преподаватель отправляет приглашение. Ученик открывает комнату по ссылке и присоединяется к звонку. На совместной доске можно объяснять материал и выполнять задания.',
        },
        {
          title: 'Мой вклад',
          text: 'Самостоятельно спроектировал сценарии и интерфейс и реализовал MVP. Веб-интерфейс собран на Vue и Nuxt. На встрече могу показать комнату и работу с заданиями.',
        },
      ],
    },
    en: {
      label: 'Independent EdTech product · MVP',
      title: 'Lesson Space',
      description: 'An online lesson room with video calls, a collaborative whiteboard, and interactive exercises.',
      sections: [
        {
          title: 'How a lesson works',
          text: 'The teacher sends an invitation. The student opens the room from the link and joins the call. They can explain the material and complete exercises together on the whiteboard.',
        },
        {
          title: 'My contribution',
          text: 'I designed the flows and interface and built the MVP independently. The web interface uses Vue and Nuxt. I can demonstrate the room and its interactive exercises on a call.',
        },
      ],
    },
  },
  {
    slug: 'fintech',
    cover: '/images/fintech-case-cover.png',
    tags: ['B2B Automation', 'Supply Chain Management', 'Complex Data', 'White Label'],
    ru: {
      label: 'Продуктовый дизайн · B2B SaaS',
      title: 'Оптимизация строительного процесса',
      description: 'B2B-платформа для строительного снабжения. Она собирает заявки, сметы и заказы в одном интерфейсе, чтобы снабженцам не приходилось вручную переносить данные между инструментами.',
      details: [
        { title: 'Задача', text: 'Процесс закупок зависел от ручного переноса данных из Excel и переписки по почте. Статусы было трудно отслеживать.' },
        { title: 'Решение', text: 'Спроектировал цикл от заявки до заказа со связью с почтой и отслеживанием статусов.' },
      ],
      sections: [
        {
          title: 'Закупки до и после',
          text: 'Снабженцы переключались между множеством окон. Я собрал статусы, отправку запросов и комментарии в рабочей таблице: инструмент виден сразу или открывается по клику на строку.',
          media: [
            image('b2b-smeta-before.png', 'Рабочий процесс снабжения до редизайна'),
            image('b2b-smeta-after.png', 'Рабочий процесс снабжения после редизайна'),
            image('b2b-smeta-path.png', 'Схема цикла от заявки до заказа'),
          ],
        },
        {
          title: 'Таблица смет и витрина поставщика',
          text: 'Добавил выбор нескольких позиций для массовой смены статусов. Спроектировал интерактивные заголовки и группировки для работы со сложными сметами и отдельную витрину, где поставщик может ответить на заявку без регистрации.',
          media: [image('b2b-smeta-element.png', 'Карточка позиции в смете')],
        },
      ],
    },
    en: {
      label: 'Product Design · B2B SaaS',
      title: 'Streamlining Construction Procurement',
      description: 'A B2B platform for construction procurement. Requests, estimates, and orders live in the same interface, reducing the need to move data manually between tools.',
      details: [
        { title: 'Challenge', text: 'Procurement relied on manually copying data from Excel and on email threads. Statuses were difficult to track.' },
        { title: 'Solution', text: 'I designed the workflow from request to order, with email integration and status tracking.' },
      ],
      sections: [
        {
          title: 'Procurement before and after',
          text: 'Procurement staff had to switch between many windows. I brought status controls, requests, and comments into the working table, where actions are visible or accessible by selecting a row.',
          media: [
            image('b2b-smeta-before.png', 'Procurement workflow before the redesign'),
            image('b2b-smeta-after.png', 'Procurement workflow after the redesign'),
            image('b2b-smeta-path.png', 'Workflow from a request to an order'),
          ],
        },
        {
          title: 'Estimate table and supplier interface',
          text: 'I added multi-select for bulk status updates. I designed interactive headers and groups for complex estimates, along with a separate interface where suppliers can respond to requests without registering.',
          media: [image('b2b-smeta-element.png', 'Estimate line item details')],
        },
      ],
    },
  },
  {
    slug: 'ai-logistic',
    cover: '/images/logistics-case-cover.png',
    tags: ['UX Strategy', 'SaaS Design', 'Process Modeling', 'B2B Dashboards'],
    ru: {
      label: 'Продуктовый дизайн · B2B',
      title: 'Цифровая экосистема логистического управления',
      description: 'B2B-платформа для взаимодействия заказчиков, транспортных компаний и исполнителей.',
      details: [
        { title: 'Цель', text: 'Собрать логистические процессы в одной системе, сократить ручной ввод и сделать статусы грузов доступными всем участникам.' },
        { title: 'Решение', text: 'Ролевая модель доступа, алгоритмы согласования заявок и управление ресурсами на базе данных исполнителей.' },
      ],
      sections: [
        {
          title: 'Концепция и онбординг',
          text: 'Спроектировали регистрацию для трёх ролей: заказчика, логиста и водителя. Проверка данных на вводе помогает сохранять записи в едином формате.',
        },
        {
          title: 'Ролевая модель и управление пользователями',
          text: 'Спроектировали панель управления пользователями. Администратор назначает права доступа к данным в зависимости от роли.',
        },
        {
          title: 'Алгоритмы согласования',
          text: 'Заменили линейный процесс согласования на ветвящийся. Система направляет заявки ответственным в зависимости от их статуса.',
        },
        {
          title: 'Интеграция ресурсов и отчётность',
          text: 'Панель мониторинга и фильтры помогают логисту видеть занятость транспорта и статус конкретного заказа.',
        },
      ],
    },
    en: {
      label: 'Product Design · B2B',
      title: 'Logistics Management Platform',
      description: 'A B2B platform that connects customers, transport companies, and service providers.',
      details: [
        { title: 'Goal', text: 'Bring logistics workflows into one system, reduce manual data entry, and make shipment statuses visible to everyone involved.' },
        { title: 'Solution', text: 'Role-based access, approval workflows, and resource management connected to a database of service providers.' },
      ],
      sections: [
        {
          title: 'Concept and onboarding',
          text: 'We designed registration for three roles: customer, logistics coordinator, and driver. Input validation helps keep records in a consistent format.',
        },
        {
          title: 'Roles and user management',
          text: 'We designed a user management panel that lets administrators grant access to data based on each user’s role.',
        },
        {
          title: 'Approval workflows',
          text: 'We replaced a linear approval process with a branching workflow. The system routes requests to the responsible person based on their status.',
        },
        {
          title: 'Resource integration and reporting',
          text: 'The monitoring dashboard and filters let logistics coordinators check vehicle utilization and the status of an individual order.',
        },
      ],
    },
  },
  {
    slug: 'quests',
    cover: '/images/quests-cover.png',
    tags: ['Dashboard Design', 'RBAC', 'Operational UX', 'B2B SaaS'],
    ru: {
      label: 'Админ-панель · B2B SaaS',
      title: '«Паника» — управление площадками',
      description: 'Панель управления сетью квестов, бронированиями, финансовым учётом и правами доступа.',
      details: [
        { title: 'Задача', text: 'Перевести управление сетью площадок из разрозненных таблиц в единую систему.' },
        { title: 'Мой вклад', text: 'С нуля спроектировал и реализовал дизайн-систему админки. Сейчас обновляю дизайн и вёрстку клиентской части.' },
      ],
      sections: [
        {
          title: 'Управление операциями',
          text: 'Спроектировал дашборд так, чтобы видеть состояние сети площадок и ключевые показатели без переходов в дополнительные разделы.',
          media: [image('dashboard.png', 'Операционный дашборд Паники')],
        },
        {
          title: 'Бронирования',
          text: 'Реализовал интерактивный список бронирований с быстрыми фильтрами и сменой статуса заявки.',
          media: [
            image('bookings-list.png', 'Список бронирований'),
            image('booking.png', 'Карточка бронирования'),
          ],
        },
        {
          title: 'Финансовый учёт',
          text: 'Спроектировал блок расчётов с отчётами и учётом транзакций контрагентов.',
          media: [image('finance.png', 'Финансовый раздел админки')],
        },
        {
          title: 'Каталог площадок',
          text: 'Разбил создание объекта на шаги с настройками графика и ценовых правил.',
          media: [image('build-spot.png', 'Создание и настройка площадки')],
        },
        {
          title: 'Ролевой доступ (RBAC)',
          text: 'В админке права доступа назначаются по ролям. Администратор управляет площадками, а сотрудник видит доступный ему участок работы.',
          media: [
            image('workers-list.png', 'Список сотрудников'),
            image('worker.png', 'Карточка сотрудника'),
          ],
        },
      ],
    },
    en: {
      label: 'Admin Dashboard · B2B SaaS',
      title: 'Panika — Venue Management',
      description: 'An admin panel for an escape room network, covering venues, bookings, finances, and access rights.',
      details: [
        { title: 'Challenge', text: 'Move venue operations out of scattered spreadsheets and into a single system.' },
        { title: 'My contribution', text: 'I designed and implemented the admin design system from scratch. I am currently redesigning and rebuilding the frontend for customers.' },
      ],
      sections: [
        {
          title: 'Operations dashboard',
          text: 'I designed the dashboard to show the state of the venue network and its key metrics without opening separate sections.',
          media: [image('dashboard.png', 'Panika operations dashboard')],
        },
        {
          title: 'Bookings',
          text: 'I implemented an interactive bookings list with quick filters and status controls.',
          media: [
            image('bookings-list.png', 'Bookings list'),
            image('booking.png', 'Booking details'),
          ],
        },
        {
          title: 'Financial operations',
          text: 'I designed the settlements section, including reporting and tracking transactions with partners.',
          media: [image('finance.png', 'Finance section of the admin panel')],
        },
        {
          title: 'Venue catalog',
          text: 'I broke venue setup into steps for configuring schedules and pricing rules.',
          media: [image('build-spot.png', 'Creating and configuring a venue')],
        },
        {
          title: 'Role-based access (RBAC)',
          text: 'The admin panel grants access by role. Administrators manage venues, while staff see the parts of the system assigned to them.',
          media: [
            image('workers-list.png', 'Staff list'),
            image('worker.png', 'Staff member details'),
          ],
        },
      ],
    },
  },
  {
    slug: 'kpd',
    cover: '/images/kpd-cover.png',
    tags: ['Product Design', 'Gamification', 'UX Strategy', 'Onboarding'],
    ru: {
      label: 'Мобильное приложение · Семейные задачи',
      title: 'Экосистема семейного взаимодействия',
      description: 'Мобильный сервис, в котором семьи распределяют задачи, следят за прогрессом и поощряют достижения детей.',
      details: [
        { title: 'Задача', text: 'Систематизировать семейные задачи и вовлекать детей через геймификацию.' },
        { title: 'Решение', text: 'Единая платформа с тремя ролями: родитель, ребёнок и родственник. Для каждой роли предусмотрен свой сценарий.' },
      ],
      sections: [
        {
          title: 'Главная: центр управления',
          text: 'На главном экране родители видят статусы задач и достижения детей. Ребёнок видит свой прогресс и доступные награды.',
          media: [image('kpd-main.png', 'Главные экраны родителя, ребёнка и родственника')],
        },
        {
          title: 'Цели и геймификация',
          text: 'Вместо списка дел спроектировал цикл «цель — достижение — награда», в котором ребёнок видит связь между выполненной задачей и поощрением.',
          media: [image('kpd-target.png', 'Цели и задачи в приложении')],
        },
        {
          title: 'Семейная экосистема',
          text: 'Родитель управляет задачами, ребёнок выполняет их, родственник поддерживает. Содержимое интерфейса и доступ к данным меняются в зависимости от роли.',
          media: [image('kpd-net.png', 'Роли в семейном приложении')],
        },
        {
          title: 'Обучение и онбординг',
          text: 'Спроектировал контекстный онбординг, в котором интерфейс объясняет функцию в момент первого действия пользователя.',
          media: [image('kpd-teach.png', 'Экраны обучения')],
        },
      ],
    },
    en: {
      label: 'Mobile App · Family Tasks',
      title: 'Family Task Management',
      description: 'A mobile app where families assign tasks, track progress, and reward children’s achievements.',
      details: [
        { title: 'Challenge', text: 'Help families organize tasks and engage children through gamification.' },
        { title: 'Solution', text: 'A shared platform with three roles: parent, child, and relative. Each role has its own workflow.' },
      ],
      sections: [
        {
          title: 'Home screen: at a glance',
          text: 'Parents see task statuses and their children’s achievements. Children see their own progress and available rewards.',
          media: [image('kpd-main.png', 'Home screens for parents, children, and relatives')],
        },
        {
          title: 'Goals and gamification',
          text: 'I designed a goal, achievement, and reward loop that lets children see how a completed task leads to a reward.',
          media: [image('kpd-target.png', 'Goals and tasks in the app')],
        },
        {
          title: 'Family roles',
          text: 'Parents manage tasks, children complete them, and relatives provide support. The interface and data access adapt to each role.',
          media: [image('kpd-net.png', 'Roles in the family app')],
        },
        {
          title: 'Onboarding',
          text: 'I designed contextual onboarding that explains features as users take their first action.',
          media: [image('kpd-teach.png', 'Onboarding screens')],
        },
      ],
    },
  },
  {
    slug: 'logistic',
    cover: '/images/logistic-cover.png',
    tags: ['Data Visualization', 'Performance Tracking', 'Financial Operations'],
    ru: {
      label: 'Логистика · B2B SaaS',
      title: 'Система управления логистической компанией',
      description: 'Рабочее пространство для контроля выполнения заказов, маршрутов, загрузки складов и выплат сотрудникам.',
      details: [
        { title: 'Задача', text: 'Снизить логистические издержки с помощью мониторинга KPI и автоматизации расчёта выплат.' },
        { title: 'Решение', text: 'Визуальные дашборды для контроля ключевых порогов эффективности, планирование маршрутов и учёт выплат в одной системе.' },
      ],
      sections: [
        {
          title: 'Контроль KPI: «красная линия»',
          text: 'Дашборд визуализирует порог эффективности и подсвечивает показатели, которые приближаются к нему. Логист видит, где требуется вмешательство.',
          media: [image('logistic-statistic.png', 'Дашборд показателей с порогом эффективности')],
        },
        {
          title: 'Финансовый учёт и мотивация',
          text: 'Расчёт зарплаты перенесли из Excel в отдельный модуль. Сотрудник может видеть, как объём выполненной работы влияет на выплату.',
          media: [image('logistic-finance.png', 'Финансовый модуль и выплаты')],
        },
        {
          title: 'Планирование маршрутов',
          text: 'Интерфейс позволяет строить и отслеживать маршрут и быстро корректировать точки назначения.',
          media: [image('logistic-track.png', 'Построение и отслеживание маршрутов')],
        },
        {
          title: 'Управление складскими хабами',
          text: 'Данные о загрузке складов собраны на одном экране, чтобы логист мог перераспределять ресурсы между точками.',
          media: [image('logistic-warehouses.png', 'Экран складской логистики')],
        },
        {
          title: 'Единое рабочее пространство',
          text: 'Планирование, отчётность и финансы собраны в одной системе, чтобы сотрудникам реже приходилось переключаться между инструментами.',
          media: [image('logistic-app.png', 'Обзор логистической платформы')],
        },
      ],
    },
    en: {
      label: 'Logistics · B2B SaaS',
      title: 'Logistics Operations Management',
      description: 'A workspace for tracking orders, routes, warehouse capacity, and staff payments.',
      details: [
        { title: 'Challenge', text: 'Reduce logistics overhead through KPI monitoring and automated payroll calculations.' },
        { title: 'Solution', text: 'Dashboards for tracking performance thresholds, route planning, and payroll in one system.' },
      ],
      sections: [
        {
          title: 'KPI monitoring: the red line',
          text: 'The dashboard visualizes a performance threshold and flags metrics approaching it. Logistics coordinators can see where they need to intervene.',
          media: [image('logistic-statistic.png', 'Performance dashboard with a critical threshold')],
        },
        {
          title: 'Financial tracking and incentives',
          text: 'Payroll calculations moved from Excel to a dedicated module. Employees can see how the amount of work completed affects their pay.',
          media: [image('logistic-finance.png', 'Finance and payroll module')],
        },
        {
          title: 'Route planning',
          text: 'The interface supports planning and tracking routes and quickly updating their destinations.',
          media: [image('logistic-track.png', 'Route planning and tracking')],
        },
        {
          title: 'Warehouse hub management',
          text: 'Warehouse capacity is visible on one screen so logistics coordinators can redistribute resources across locations.',
          media: [image('logistic-warehouses.png', 'Warehouse logistics interface')],
        },
        {
          title: 'One workspace',
          text: 'Planning, reporting, and finances sit in one system, so staff can switch tools less often.',
          media: [image('logistic-app.png', 'Logistics platform overview')],
        },
      ],
    },
  },
  {
    slug: 'restaurant',
    cover: '/images/cafe-cover.png',
    tags: ['UX/UI Design', 'Service Design', 'Admin Dashboard', 'Prototyping'],
    ru: {
      label: 'Сервис бронирования · B2B и B2C',
      title: 'Система интерактивного управления бронированием',
      description: 'Сервис, в котором гости выбирают стол на интерактивной схеме, а рестораны управляют залом и заявками.',
      details: [
        { title: 'Задача', text: 'Упростить бронирование для гостей и дать администраторам инструмент управления загрузкой зала.' },
        { title: 'Решение', text: 'Два интерфейса: поиск и выбор столика для гостя, настройка пространства и обработка заявок для ресторана.' },
      ],
      sections: [
        {
          title: 'Поиск и навигация',
          text: 'Главный экран выводит карточки заведений с тегами, по которым гости могут быстро сравнить варианты.',
          media: [image('cafe-main.png', 'Главный экран поиска заведений')],
        },
        {
          title: 'Карточка заведения',
          text: 'На детальном экране собраны характеристики заведения и условия бронирования. Визуальная иерархия помогает быстро их найти.',
          media: [image('cafe-admin-page.png', 'Информация о заведении')],
        },
        {
          title: 'Интерактивная карта столов',
          text: 'Гость выбирает столик на схеме зала, где свободные и занятые места помечены по-разному.',
          media: [image('cafe-booking.png', 'Выбор столика на интерактивной схеме')],
        },
        {
          title: 'Конструктор зала',
          text: 'Администратор редактирует зоны и меняет конфигурацию зала под мероприятия.',
          media: [image('cafe-cafe.png', 'Настройка схемы зала')],
        },
        {
          title: 'Управление заявками',
          text: 'Администратор видит заявки в одном окне и работает с состояниями «Новая», «Подтверждена» и «Отменена».',
          media: [image('cafe-admin-booking.png', 'Список бронирований в админке')],
        },
      ],
    },
    en: {
      label: 'Reservation Platform · B2B and B2C',
      title: 'Interactive Restaurant Reservations',
      description: 'Guests choose a table on an interactive floor plan. Restaurants manage their layouts and reservation requests.',
      details: [
        { title: 'Challenge', text: 'Make booking easier for guests and give venue managers tools to manage occupancy.' },
        { title: 'Solution', text: 'Two interfaces: search and table selection for guests, and floor-plan and request management for restaurants.' },
      ],
      sections: [
        {
          title: 'Search and navigation',
          text: 'The home screen shows venue cards with tags guests can use to compare options quickly.',
          media: [image('cafe-main.png', 'Restaurant search home screen')],
        },
        {
          title: 'Venue details',
          text: 'The detail page brings venue information and booking terms together. Its visual hierarchy makes both easy to find.',
          media: [image('cafe-admin-page.png', 'Venue details')],
        },
        {
          title: 'Interactive table map',
          text: 'Guests select their table on a floor plan that distinguishes available and occupied seats.',
          media: [image('cafe-booking.png', 'Selecting a table on the interactive floor plan')],
        },
        {
          title: 'Floor-plan editor',
          text: 'Venue managers can edit zones and change the room layout for different events.',
          media: [image('cafe-cafe.png', 'Configuring the restaurant floor plan')],
        },
        {
          title: 'Request management',
          text: 'Managers see all requests in one place and work with New, Confirmed, and Cancelled states.',
          media: [image('cafe-admin-booking.png', 'Reservations list in the admin panel')],
        },
      ],
    },
  },
  {
    slug: 'barber',
    cover: '/images/barber-cover.png',
    tags: ['UX Research', 'Flow Optimization', 'CRM Design'],
    ru: {
      label: 'Мобильное приложение · B2C-маркетплейс',
      title: 'Маркетплейс услуг бьюти-индустрии',
      description: 'Мобильный сервис для поиска, записи и прямого взаимодействия между мастерами и клиентами.',
      details: [
        { title: 'Задача', text: 'Снизить барьер первого контакта и дать клиенту удобный поиск, а мастеру — инструмент управления временем.' },
        { title: 'Решение', text: 'Поиск с учётом геолокации, быстрый выбор времени и отдельные интерфейсы для клиентов и мастеров.' },
      ],
      sections: [
        {
          title: 'Онбординг: сначала ценность',
          text: 'Пользователь видит каталог, цены и локации до регистрации. Войти в аккаунт нужно при записи.',
          media: [image('barber-onbording.png', 'Экраны онбординга')],
        },
        {
          title: 'Каталог и геопоиск',
          text: 'Карточки показывают локацию и ценовой сегмент. Результаты можно отфильтровать по услуге и расстоянию.',
          media: [image('barber-main-client.png', 'Каталог мастеров для клиента')],
        },
        {
          title: 'Выбор времени и запись',
          text: 'Вместо перегруженного календаря клиенты видят доступные слоты и выбирают подходящий.',
          media: [image('barber-booking.png', 'Выбор времени записи')],
        },
        {
          title: 'Кабинет мастера',
          text: 'Лёгкая CRM с лентой активности и состояниями записей. Мастер может управлять графиком с телефона.',
          media: [image('barber-master.png', 'Личный кабинет мастера')],
        },
        {
          title: 'Контекстный статус записи',
          text: 'Система сообщает клиенту, когда запись на рассмотрении или подтверждена, и отправляет напоминание.',
          media: [image('barber-bookings-client.png', 'Активные записи клиента')],
        },
      ],
    },
    en: {
      label: 'Mobile App · B2C Marketplace',
      title: 'Beauty Services Marketplace',
      description: 'A mobile app where clients can find, book, and work directly with beauty professionals.',
      details: [
        { title: 'Challenge', text: 'Make it easier for clients to get started and find a service, while giving professionals a way to manage their time.' },
        { title: 'Solution', text: 'Location-based discovery, quick appointment selection, and distinct interfaces for clients and professionals.' },
      ],
      sections: [
        {
          title: 'Value-first onboarding',
          text: 'Users can view the catalog, pricing, and locations before registering. They sign in when booking an appointment.',
          media: [image('barber-onbording.png', 'Onboarding screens')],
        },
        {
          title: 'Catalog and location search',
          text: 'Cards show location and price range. Users can filter results by service and distance.',
          media: [image('barber-main-client.png', 'Beauty professional catalog for clients')],
        },
        {
          title: 'Booking and time selection',
          text: 'Clients see the available slots and choose a suitable time, without having to read a crowded calendar.',
          media: [image('barber-booking.png', 'Selecting an appointment time')],
        },
        {
          title: 'Professional dashboard',
          text: 'A lightweight CRM with an activity feed and appointment statuses. Professionals can manage their schedules on their phones.',
          media: [image('barber-master.png', 'Beauty professional dashboard')],
        },
        {
          title: 'Appointment status',
          text: 'Clients can see when a request is pending or confirmed, and receive a reminder about the appointment.',
          media: [image('barber-bookings-client.png', 'Active client appointments')],
        },
      ],
    },
  },
]
