//=======================================================
//  Меню и переходы
//=========================================================

// --- ФУНКЦИЯ SPA НАВИГАЦИИ ---
async function navigate(pageId) {
    const contentArea = document.querySelector('.content');
    if (!contentArea) return;

    contentArea.style.opacity = '0';

    setTimeout(async () => {
        try {
            const response = await fetch(`./pages/${pageId}.html`);
            if (!response.ok) throw new Error('Ошибка загрузки');
            const html = await response.text();

            contentArea.innerHTML = html;

            // Находим все части навигации
            const menuBox = document.getElementById('menu-container');
            const logoBox = document.getElementById('logo-container');
            const actionsBox = document.getElementById('actions-container');

            // Проверяем, является ли страница стандартной (из MenuData.js)
            const isStandardPage = navbarConfig.menu.some(item => item.link === pageId) || pageId === 'about-me';
            
            if (menuBox) {
                if (!isStandardPage) {
                    // РЕЖИМ ПРОЕКТА
                    if (logoBox) logoBox.style.display = 'none';
                    if (actionsBox) actionsBox.style.display = 'none';
                    
                    // Перезаписываем всё меню, так как структура меняется полностью
                    menuBox.innerHTML = `
                        <li class="nav-item">
                            <a href="portfolio" class="nav-back">
                                <img src="./images/arrow.svg" style="transform: rotate(90deg); width: 1.5rem;" alt="Back">
                                <span>Назад</span>
                            </a>
                        </li>
                    `;
                } else {
                    // СТАНДАРТНЫЙ РЕЖИМ
                    if (logoBox) logoBox.style.display = 'block';
                    if (actionsBox) actionsBox.style.display = 'flex';

                    // КРИТИЧЕСКИЙ МОМЕНТ:
                    // Проверяем, есть ли уже ссылки. Если есть, обновляем только класс active.
                    // Если нет (вернулись из проекта), рисуем структуру заново.
                    const hasLinks = menuBox.querySelector('a:not(.nav-back)');
                    
                    if (hasLinks) {
                        // Линия уже существует в DOM, просто обновляем классы у ссылок
                        const links = menuBox.querySelectorAll('a');
                        links.forEach(link => {
                            if (link.getAttribute('href') === pageId) link.classList.add('active');
                            else link.classList.remove('active');
                        });
                    } else {
                        // Мы вернулись со страницы проекта, нужно восстановить структуру
                        menuBox.innerHTML = `
                            ${navbarConfig.menu.map(item => `
                                <li><a href="${item.link}" class="${item.link === pageId ? 'active' : ''}">${item.title}</a></li>
                            `).join('')}
                            <div class="nav-underline" id="underline"></div>
                        `;
                    }
                    
                    // Запускаем расчет позиции линии
                    setTimeout(setupUnderline, 10);
                }
            }

            initAccordion();
            initExperienceCounter();
            initMarquee();
            initSkillsAnimation();
            initMagneticButtons();


            document.body.dataset.page = pageId; // Можно использовать для специфических стилей
            updateBackground(pageId);


            contentArea.style.opacity = '1';
            updateActiveState(pageId);
            
        } catch (err) {
            console.error(err);
            contentArea.innerHTML = '<h2>Страница не найдена</h2>';
            contentArea.style.opacity = '1';
        }
    }, 500);
}


function updateActiveState(pageId) {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === pageId) {
            link.classList.add('active');
            // Принудительно вызываем движение линии под новый активный элемент
            if (typeof setupUnderline === 'function') {
                const underline = document.getElementById('underline');
                const menu = document.getElementById('menu-container');
                if (underline && menu) {
                    const rect = link.getBoundingClientRect();
                    const menuRect = menu.getBoundingClientRect();
                    underline.style.width = `${rect.width}px`;
                    underline.style.left = `${rect.left}px`;
                    underline.style.opacity = "1";
                }
            }
        } else {
            link.classList.remove('active');
        }
    });
}

// --- ТВОЯ ОТРИСОВКА NAVBAR ---
function initNavbar() {
    const logoBox = document.getElementById('logo-container');
    const menuBox = document.getElementById('menu-container');
    const actionsBox = document.getElementById('actions-container');

    if (logoBox) {
        logoBox.innerHTML = `
            <a class="logo" data-link>
                <img src="${navbarConfig.logo.src}" alt="${navbarConfig.logo.alt}" class="logo-img">
            </a>`;
    }

    if (menuBox) {
        // Определяем начальную страницу из URL (хэша) или ставим main
        const initialPage = window.location.hash.replace('#', '') || 'about-me';
        
        menuBox.innerHTML = `
            ${navbarConfig.menu.map(item => `
                <li><a href="${item.link}" class="${item.link === initialPage ? 'active' : ''}">${item.title}</a></li>
            `).join('')}
            <div class="nav-underline" id="underline"></div>
        `;
    }

    if (actionsBox) {
        actionsBox.innerHTML = `
            <div class="social-icons">
                ${navbarConfig.socials.map(s => `
                    <a href="${s.link}" class="social-link" target="_blank">
                        <img src="${s.img}" alt="${s.name}">
                    </a>`).join('')}
            </div>
            <button class="switcher-btn"><span class="switcher-icon"></span></button>
        `;
    }

    setTimeout(setupUnderline, 100);
    initSPA(); // Запускаем перехват кликов
}

function setupUnderline() {
    const menu = document.getElementById('menu-container');
    const underline = document.getElementById('underline');
    const links = document.querySelectorAll('.nav-links a');
    
    if (!menu || !underline) return;

    const moveLine = (element) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        
        // Вычисляем позицию относительно контейнера меню
        underline.style.width = `${rect.width}px`;
        underline.style.left = `${rect.left}px`;
        underline.style.opacity = "1";
    };

    // Линия встает под активный пункт только при загрузке или смене страницы
    const activeLink = document.querySelector('.nav-links a.active');
    if (activeLink) {
        moveLine(activeLink);
    } else {
        underline.style.opacity = "0";
    }

    // Слушатели для наведения больше не двигают линию!
    // Мы только гарантируем, что она вернется к активному пункту, если что-то пошло не так
    menu.addEventListener('mouseleave', () => {
        const currentActive = document.querySelector('.nav-links a.active');
        if (currentActive) moveLine(currentActive);
    });
}

function initSPA() {
    // Перехват кликов по меню и логотипу
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.nav-links a, .logo, .project-card')
        if (target) {
            e.preventDefault();
            const pageId = target.getAttribute('href');
            window.history.pushState({ pageId }, '', `#${pageId}`);
            navigate(pageId);
        }
    });

    // Кнопки "Назад/Вперед" в браузере
    window.addEventListener('popstate', (e) => {
        const pageId = window.location.hash.replace('#', '') || 'about-me';
        navigate(pageId);
    });

    // Первая загрузка при открытии сайта
    const initialPage = window.location.hash.replace('#', '') || 'about-me';
    navigate(initialPage);
}

// Логика скролла
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop && st > 100) nav.classList.add('navbar--hidden');
    else nav.classList.remove('navbar--hidden');
    lastScrollTop = st <= 0 ? 0 : st;
});

document.addEventListener('DOMContentLoaded', initNavbar);


//=======================================================
// Аккордион
//=========================================================


function initAccordion() {
    const items = document.querySelectorAll('.accordion-item');
    
    items.forEach(item => {
        item.addEventListener('click', () => {  
            items.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('is-open');
            });
            item.classList.toggle('is-open');
        });
    });
}


//=======================================================
// Счётчик опыта
//=========================================================


function initExperienceCounter() {
    const counterElement = document.getElementById('experience-counter');
    if (!counterElement) return;

    const startDate = new Date('2021-06-17');
    const today = new Date();
    const subtractDays = 365;

    // Вычитаем 380 дней из стажа (переводим дни в миллисекунды)
    // 380 дней * 24 часа * 60 минут * 60 секунд * 1000 мс
    const adjustedStartDate = new Date(startDate.getTime() + (subtractDays * 24 * 60 * 60 * 1000));

    function updateCounter() {
        const now = new Date();
        let years = now.getFullYear() - adjustedStartDate.getFullYear();
        let months = now.getMonth() - adjustedStartDate.getMonth();

        // Корректировка, если текущий месяц меньше месяца начала
        if (months < 0 || (months === 0 && now.getDate() < adjustedStartDate.getDate())) {
            years--;
            months += 12;
        }

        // Склонение слов
        const yearText = getNoun(years, '.', '.', '.');
        const monthText = getNoun(months, '', '', '');

        let result = '';
        if (years > 0) result += `${years}${yearText}`;
        if (months > 0) result += `${months}${monthText}`;

        counterElement.textContent = result || 'Менее месяца';
    }

    // Вспомогательная функция для склонения
    function getNoun(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) return five;
        n %= 10;
        if (n === 1) return one;
        if (n >= 2 && n <= 4) return two;
        return five;
    }

    updateCounter();
}


//=======================================================
// Бегущая строка
//=========================================================


function initMarquee() {
    const track = document.querySelector('.marquee-track');
    const initialList = document.querySelector('.marquee-list');
    
    // Проверка: если элемента нет или клоны уже созданы — ничего не делаем
    if (!track || !initialList || track.children.length > 1) return;

    // Создаем два клона для идеально бесконечного цикла
    const cloneA = initialList.cloneNode(true);
    const cloneB = initialList.cloneNode(true);
    
    track.appendChild(cloneA);
    track.appendChild(cloneB);
}


//=======================================================
// Прогресс лайн
//=========================================================


function initSkillsAnimation() {
    const bars = document.querySelectorAll('.progress-bar');
    
    bars.forEach(bar => {
        const target = bar.getAttribute('data-target');
        const valueDisplay = bar.closest('.metric-item').querySelector('.metric-value');
        
        // Анимируем ширину
        setTimeout(() => {
            bar.style.width = target + '%';
        }, 300);

        // Анимируем цифры
        let start = 0;
        const duration = 2000; // 2 секунды
        const increment = target / (duration / 16);
        
        const count = () => {
            start += increment;
            if (start < target) {
                valueDisplay.textContent = Math.round(start) + '%';
                requestAnimationFrame(count);
            } else {
                valueDisplay.textContent = target + '%';
            }
        };
        count();
    });
}


//=======================================================
// Динамичный фон
//=========================================================


const pagePalettes = {
    'about-me': {
        '--bg-blob-1': '#321459',
        '--bg-blob-2': '#042552',
        '--bg-blob-3': '#580952'
    },
    'portfolio': {
        '--bg-blob-1': '#46bd2c', // Темно-фиолетовый
        '--bg-blob-2': '#1a9a1e',
        '--bg-blob-3': '#aa6812'
    },
    'fintech': {
        '--bg-blob-1': '#10bda3', // Глубокий изумрудный для финтеха
        '--bg-blob-2': '#0adaba',
        '--bg-blob-3': '#63d6c5'
    }
};

function updateBackground(pageId) {
    const palette = pagePalettes[pageId] || pagePalettes['about-me'];
    for (const [property, value] of Object.entries(palette)) {
        document.documentElement.style.setProperty(property, value);
    }
}


//=======================================================
// Кнопка
//=========================================================


function initMagneticButtons() {
    // Ищем все кнопки с включенным магнетизмом
    const buttons = document.querySelectorAll('.btn');
    const tags = document.querySelectorAll('.tag');
    const projects = document.querySelectorAll('.project-card');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Двигаем кнопку на 30% от отклонения курсора
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Возвращаем в центр
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    tags.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Двигаем кнопку на 30% от отклонения курсора
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.4}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Возвращаем в центр
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    projects.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Двигаем кнопку на 30% от отклонения курсора
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.05}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Возвращаем в центр
            btn.style.transform = `translate(0px, 0px)`;
        });
    });
}



//=======================================================
// Анимация загрузки
//=========================================================


document.addEventListener('DOMContentLoaded', () => {
    // 1. Просто запускаем анимацию
    lottie.loadAnimation({
        container: document.getElementById('lottie-logo'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: './Logo_animation.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    });

    // 2. Ровно через 3.63 секунды полностью удаляем прелоадер из кода
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.remove(); // Намертво удаляет блок, сайт сразу кликабелен
        }
    }, 3630); 
});