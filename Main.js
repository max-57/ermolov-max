//=======================================================
//  Меню и переходы
//=========================================================

//=======================================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
//=========================================================

window.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализируем навигационную панель
    initNavbar();

    // 2. Определяем, куда хотел попасть пользователь
    const hash = window.location.hash.replace('#', '');
    const path = window.location.pathname.replace('/', ''); // например, "about-me"

    // Приоритет: 1. Хэш, 2. Путь (если был введен напрямую), 3. Главная
    let targetPage = hash || path || 'about-me';

    // 3. Загружаем нужную страницу без перезагрузки
    navigate(targetPage);
});

// Глобальный перехват всех кликов по ссылкам
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');

    // Если ссылка начинается на http или mailto — это внешний переход
    if (href.startsWith('http') || href.startsWith('mailto')) return;

    // Если это внутренняя ссылка
    e.preventDefault();
    
    // Очищаем href от #
    const pageId = href.replace('#', '');
    
    // Меняем URL в браузере БЕЗ перезагрузки
    window.history.pushState({ pageId }, '', `#${pageId}`);
    
    // Грузим контент
    navigate(pageId);
});

// Получить текущий язык (по умолчанию 'ru')
function getCurrentLang() {
    return localStorage.getItem('preferred_lang') || 'ru';
}

// Переключить язык и обновить интерфейс
function toggleLanguage() {
    const newLang = getCurrentLang() === 'ru' ? 'en' : 'ru';
    localStorage.setItem('preferred_lang', newLang);
    
    // Перерисовываем шапку на новом языке
    initNavbar();
    
    // Перезагружаем текущую страницу из соответствующей папки языка
    const currentPage = window.location.hash.replace('#', '') || 'about-me';
    navigate(currentPage);
}


// --- ФУНКЦИЯ SPA НАВИГАЦИИ ---

const projectPages = ['about-me', 'portfolio'];

async function navigate(pageId) {
    // 1. Очистка pageId от лишних символов (например, если пришло #portfolio)
    const cleanPageId = pageId.replace('#', '');
    const contentArea = document.querySelector('.content');
    if (!contentArea) return;

    contentArea.style.opacity = '0';

    setTimeout(async () => {
        try {
            const lang = getCurrentLang();
            const menuBox = document.querySelector('.navbar-frame');

            // Пробуем загрузить страницу
            let response = await fetch(`/pages/${lang}/${cleanPageId}.html`);
            
            // Если не нашли — пробуем 404
            if (!response.ok) {
                console.warn(`Страница ${cleanPageId} не найдена, перенаправляю на 404`);                
                response = await fetch(`/pages/ru/404.html`);
            }

            // Если даже 404 не грузится — тогда уже выкидываем ошибку
            if (!response.ok) throw new Error('404 страница не найдена');

            const html = await response.text();
            contentArea.innerHTML = html;

            // Теперь остальная логика
            requestAnimationFrame(() => {
                window.scrollTo(0, 0); // Используем window.scrollTo вместо document.body
                const nav = document.querySelector('.navbar-frame') || document.querySelector('.navbar');
                if (nav) nav.classList.remove('hidden');
            });

            // Перезапуск компонентов
            initAccordion();
            initExperienceCounter();
            initMarquee();
            initSkillsAnimation();
            initMagneticButtons();
            updateBackground(cleanPageId);

            // Логика меню
            
            const backAndLang = document.querySelector('.back-and-lang');
            const isStandartPage = projectPages.includes(cleanPageId);
            
            if (!isStandartPage) {
                if (menuBox) menuBox.classList.add('permanent-hidden');
                if (backAndLang) backAndLang.classList.remove('permanent-hidden');
            } else {
                if (menuBox) menuBox.classList.remove('permanent-hidden');
                if (backAndLang) backAndLang.classList.add('permanent-hidden');
                if (!menuBox) initNavbar();
            }

            contentArea.style.opacity = '1';
            
        } catch (err) {
            // Теперь здесь переменная err, которую ты передал в catch
            console.error("Критическая ошибка навигации:", err);
            contentArea.innerHTML = '<h1>Ошибка загрузки</h1>';
            contentArea.style.opacity = '1';
        }
    }, 150);
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

document.getElementById('menu-pill').addEventListener('click', (e) => {
    const link = e.target.closest('.nav-pill-item');
    if (!link) return;

    // Снимаем со всех
    document.querySelectorAll('.nav-pill-item').forEach(el => el.classList.remove('active'));
    // Вешаем на того, по кому кликнули
    link.classList.add('active');
});

// --- ОТРИСОВКА NAVBAR ---
function initNavbar() {
    const lang = getCurrentLang();
    const currentHash = window.location.hash.replace('#', '') || 'about-me';

    // 1. Логотип
    const logoContainer = document.getElementById('logo-link');
    if (logoContainer) {
        logoContainer.innerHTML = `<img src="${navbarConfig.logo.src}" alt="${navbarConfig.logo.alt}" class="logo-img">`;
    }

    // 2. Пункты меню
    const menuPill = document.getElementById('menu-pill');
    if (menuPill) {
        menuPill.innerHTML = navbarConfig.menu.map(item => {
            const isActive = item.link === currentHash;
            return `<a href="#${item.link}" class="nav-pill-item ${isActive ? 'active' : ''}">${item.title[lang]}</a>`;
        }).join('');
    }

    // 3. Соцсети
    const socialIcons = document.getElementById('social-icons');
    if (socialIcons) {
        socialIcons.innerHTML = navbarConfig.socials.map(s => `
            <a href="${s.link}" class="social-link" target="_blank">
                <img src="${s.img}" alt="${s.name}" class="nav-icon">
            </a>
        `).join('');
    }

    // 4. Отрисовка ВСЕХ свитчеров языка (по классу)
    const switchers = document.querySelectorAll('.lang-switcher-pill');
    const switcherHTML = navbarConfig.langswitcher.map(item => {
        const isActive = item.flag === lang;
        return `
            <div class="lang-flag-wrapper ${isActive ? 'active' : ''}" data-lang="${item.flag}">
                <img src="${item.img}" alt="${item.flag}" class="flag-img">
            </div>
        `;
    }).join('');

    switchers.forEach(el => el.innerHTML = switcherHTML);

    if (!window.spaInitialized) {
        initSPA();
        window.spaInitialized = true;
    }
}

// Глобальный слушатель для свитчеров языка
document.addEventListener('click', (e) => {
    const clickedFlag = e.target.closest('.lang-flag-wrapper');
    
    // Если кликнули не по флагу или флаг уже активен — выходим
    if (!clickedFlag || clickedFlag.classList.contains('active')) return;

    // Вызываем твою функцию смены языка
    toggleLanguage();
});

function initSPA() {
    // Перехват кликов по меню и логотипу
    document.addEventListener('click', (e) => {
        // 1. Сначала ищем специфичные кнопки (Назад)
        const backBtn = e.target.closest('.btn-back');
        if (backBtn) {
            e.preventDefault();
            window.history.back(); 
            return; // ВАЖНО: выходим, чтобы не сработал код ниже
        }


        e.preventDefault();
        const pageId = target.getAttribute('href');
        if (pageId) {
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

// Добавляем TRUE в самый конец (включаем режим перехвата), 
// чтобы window слышал скролл даже внутри твоего .content
window.addEventListener('scroll', (e) => {
    const nav = document.querySelector('.navbar-frame');
    const bg = document.querySelector('.navbar-bg'); 
    const back = document.querySelector('.back-and-lang');
    if (!nav) return;

    // Магическая строчка: берём скролл именно с того элемента, который СЕЙЧАС крутится
    let target = e.target === document ? (document.documentElement || document.body) : e.target;
    let st = target.scrollTop;

    // Твоя родная рабочая логика
    if (st > lastScrollTop && st > 100) {
        nav.classList.add('hidden');
        bg.classList.add('hidden');
        back.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
        bg.classList.remove('hidden');
        back.classList.remove('hidden');
    }

    lastScrollTop = st <= 0 ? 0 : st;
}, true); // <- СУПЕР-ВАЖНО: эта true заставляет window ловить внутренний скролл!

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

    // 1. Твоя исходная логика расчёта даты стажа
    const startDate = new Date('2021-06-17');
    const subtractDays = 365;
    const adjustedStartDate = new Date(startDate.getTime() + (subtractDays * 24 * 60 * 60 * 1000));
    
    const now = new Date();
    let targetYears = now.getFullYear() - adjustedStartDate.getFullYear();
    let targetMonths = now.getMonth() - adjustedStartDate.getMonth();

    if (targetMonths < 0 || (targetMonths === 0 && now.getDate() < adjustedStartDate.getDate())) {
        targetYears--;
        targetMonths += 12;
    }

    // Переводим всё в единый массив месяцев для правильного таймлайна анимации
    const totalTargetMonths = (targetYears * 12) + targetMonths;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Защита от наложения кадров при быстром скролле
            if (counterElement.dataset.rafId) {
                cancelAnimationFrame(parseInt(counterElement.dataset.rafId));
            }

            if (entry.isIntersecting) {
                const duration = 2500; // Длительность анимации в мс (под стать полоскам прогресса)
                const startTime = performance.now();

                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Эффект плавного замедления (Ease-Out Cubic)
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    
                    // Вычисляем текущую точку на таймлайне месяцев
                    const currentTotalMonths = easeProgress * totalTargetMonths;
                    const displayYears = Math.floor(currentTotalMonths / 12);
                    const displayMonths = Math.floor(currentTotalMonths % 12);

                    // Форматируем вывод по маске [Число].[00-12]
                    const formattedMonths = String(displayMonths).padStart(2, '0');
                    counterElement.textContent = `${displayYears}.${formattedMonths}`;

                    if (progress < 1) {
                        counterElement.dataset.rafId = requestAnimationFrame(animate);
                    } else {
                        // Жестко фиксируем финальное значение на последнем кадре
                        const finalMonths = String(targetMonths).padStart(2, '0');
                        counterElement.textContent = `${targetYears}.${finalMonths}`;
                    }
                };

                counterElement.dataset.rafId = requestAnimationFrame(animate);
            } else {
                // Сбрасываем состояние в дефолт, когда элемент уходит из вьюпорта
                counterElement.textContent = '0.00';
            }
        });
    }, {
        threshold: 0.1 // Запуск анимации, когда край элемента показался на экране
    });

    observer.observe(counterElement);
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
    const progressBars = document.querySelectorAll('.progress-bar');
    if (!progressBars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const bar = entry.target;
            const target = parseInt(bar.getAttribute('data-target')) || 0;
            const metricItem = bar.closest('.metric-item');
            const valueDisplay = metricItem ? metricItem.querySelector('.metric-value') : null;
            
            // Очищаем предыдущую анимацию цифр, если она еще крутится (защита от багов при быстром скролле)
            if (bar.dataset.rafId) {
                cancelAnimationFrame(parseInt(bar.dataset.rafId));
            }

            if (entry.isIntersecting) {
                // 1. Анимируем ширину полосы
                bar.style.width = `${target}%`;

                // 2. Твоя анимация цифр через requestAnimationFrame
                if (valueDisplay) {
                    let start = 0;
                    const duration = 1500; // Сделаем чуть динамичнее — 1.5 сек, под стать кубику безье
                    const increment = target / (duration / 16);
                    
                    const count = () => {
                        start += increment;
                        if (start < target) {
                            valueDisplay.textContent = Math.round(start) + '%';
                            bar.dataset.rafId = requestAnimationFrame(count);
                        } else {
                            valueDisplay.textContent = target + '%';
                        }
                    };
                    bar.dataset.rafId = requestAnimationFrame(count);
                }
            } else {
                // Полный сброс состояния, когда элемент уходит из вьюпорта
                bar.style.width = '0%';
                if (valueDisplay) {
                    valueDisplay.textContent = '0%';
                }
            }
        });
    }, {
        threshold: 0.1 // Срабатывает, когда 10% карточки показалось на экране
    });

    progressBars.forEach(bar => {
        // Задаем физику плавности для самой полоски прямо из JS
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
        observer.observe(bar);
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
        '--bg-blob-1': '#6d7372', // Глубокий изумрудный для финтеха
        '--bg-blob-2': '#788381',
        '--bg-blob-3': '#565757'
    },
        'quests': {
        '--bg-blob-1': '#856100', // Глубокий изумрудный для финтеха
        '--bg-blob-2': '#aa800d',
        '--bg-blob-3': '#bb720c'
    },
        'kpd': {
        '--bg-blob-1': '#4FAC50', // Глубокий изумрудный для финтеха
        '--bg-blob-2': '#DB7A03',
        '--bg-blob-3': '#bbbb0c'
    }
    ,
        '404': {
        '--bg-blob-1': '#ff5e00', // Глубокий изумрудный для финтеха
        '--bg-blob-2': '#ff0000',
        '--bg-blob-3': '#ff003c'
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
    const targets = document.querySelectorAll('.btn, .tag, .project-card, .logo-main, .magnetic, .ignore-magnetic');
    
    // Определяем, поддерживает ли устройство только тач
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    targets.forEach(el => {
        let strength = 0.3;
        if (el.classList.contains('tag')) strength = 0.25;
        if (el.classList.contains('project-card')) strength = 0.05;
        if (el.classList.contains('logo-main')) strength = 0.5;
        if (el.classList.contains('magnetic')) strength = 0.025;
        if (el.classList.contains('ignore-magnetic')) strength = 0;

        const handleMove = (clientX, clientY) => {
            const rect = el.getBoundingClientRect();
            let x = (clientX - rect.left - rect.width / 2) * strength;
            let y = (clientY - rect.top - rect.height / 2) * strength;

            // Ограничение сдвига
            x = Math.max(-14, Math.min(14, x));
            y = Math.max(-14, Math.min(14, y));

            
            const rotateX = -y * 1;
            const rotateY = x * 1;
            el.style.transform = `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            console.log(`Translate: ${x}, ${y}; Rotate: ${rotateX}, ${rotateY}`);
        };

        const handleLeave = () => {
            el.style.transform = `translate(0px, 0px) rotateX(0deg) rotateY(0deg)`;
        };

        // Мышь
        el.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
        el.addEventListener('mouseleave', handleLeave);

        // Тач
        el.addEventListener('touchmove', (e) => {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
        
        el.addEventListener('touchend', handleLeave);
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