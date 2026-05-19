//=======================================================
//  Меню и переходы
//=========================================================

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
async function navigate(pageId) {
    const contentArea = document.querySelector('.content');
    if (!contentArea) return;

    contentArea.style.opacity = '0';

    setTimeout(async () => {
        try {
            const lang = getCurrentLang();
            const response = await fetch(`./pages/${lang}/${pageId}.html`);
            if (!response.ok) throw new Error('Ошибка загрузки');
            const html = await response.text();

            // 1. Вставляем новый контент в DOM
            contentArea.innerHTML = html;
            // Даем браузеру микропаузу, чтобы он успел вдуплить новый HTML и посчитать высоту страницы
            requestAnimationFrame(() => {
                document.body.scrollTop = 0;                  // Обнуляем тег <body>
                
                // И только теперь сбрасываем переменную для нашего обработчика скролла шапки
                lastScrollTop = 0;
                
                // Если у тебя на шапке висел класс скрытия, принудительно убираем его при переходе
                const nav = document.querySelector('.navbar-frame') || document.querySelector('.navbar');
                if (nav) nav.classList.remove('hidden');
            });

            initAccordion();         // Перезапуск аккордеона
            initExperienceCounter(); // Перезапуск счетчика стажа
            initMarquee();           // Перезапуск бесконечной бегущей строки
            initSkillsAnimation();   // Перезапуск анимации прогресс-баров
            initMagneticButtons();   // Навешиваем магнитный эффект на новые кнопки/карточки
            updateBackground(pageId);// Переключаем цветовую палитру фона под текущую страницу
            // ==========================================================================

            const menuBox = document.getElementById('menu-container');
            const logoBox = document.getElementById('logo-container');
            const actionsBox = document.getElementById('actions-container');

            const isStandardPage = navbarConfig.menu.some(item => item.link === pageId) || pageId === 'about-me';
            
            if (menuBox) {
                if (!isStandardPage) {
                    // РЕЖИМ ПРОЕКТА
                    if (logoBox) logoBox.style.display = 'none';
                    if (actionsBox) actionsBox.style.display = 'none';
                    // ... твой код кастомного меню для проектов
                } else {
                    // СТАНДАРТНАЯ СТРАНИЦА (Обычное меню)
                    if (logoBox) logoBox.style.display = 'flex';
                    if (actionsBox) actionsBox.style.display = 'flex';
                    
                    // Если мы вернулись из проекта и меню было стёрто — пересобираем его
                    if (!menuBox.querySelector('.nav-menu-pill')) {
                        initNavbar();
                    } else {
                        // ЖИВОЙ ПЕРЕКЛЮЧАТЕЛЬ КЛАССА ACTIVE:
                        const links = menuBox.querySelectorAll('.nav-pill-item');
                        links.forEach(link => {
                            const linkPage = link.getAttribute('href').replace('#', '');
                            
                            if (linkPage === pageId) {
                                link.classList.add('active');
                            } else {
                                link.classList.remove('active');
                            }
                        });
                    }
                }
            }

            contentArea.style.opacity = '1';
            
        } catch (error) {
            console.error(error);
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

    // 1. Наполняем логотип (вставляем <img> внутрь твоего <div>)
    const logoContainer = document.getElementById('logo-link');
    if (logoContainer) {
        logoContainer.innerHTML = `<img src="${navbarConfig.logo.src}" alt="${navbarConfig.logo.alt}" class="logo-img">`;
    }

    // 2. Рендерим пункты меню в #menu-pill
    const menuPill = document.getElementById('menu-pill');
    if (menuPill) {
        menuPill.innerHTML = navbarConfig.menu.map(item => {
            const isActive = item.link === currentHash;
            return `<a href="#${item.link}" class="nav-pill-item ${isActive ? 'active' : ''}">${item.title[lang]}</a>`;
        }).join('');
    }

    // 3. Рендерим соцсети в #social-icons
    const socialIcons = document.getElementById('social-icons');
    if (socialIcons) {
        socialIcons.innerHTML = navbarConfig.socials.map(s => `
            <a href="${s.link}" class="social-link" target="_blank">
                <img src="${s.img}" alt="${s.name}" class="nav-icon">
            </a>
        `).join('');
    }

    // 4. Рендерим флаги в #lang-switcher
    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) {
        langSwitcher.innerHTML = navbarConfig.langswitcher.map(item => {
            const isActive = item.flag === lang;
            return `
                <div class="lang-flag-wrapper ${isActive ? 'active' : ''}" data-lang="${item.flag}">
                    <img src="${item.img}" alt="${item.flag}" class="flag-img">
                </div>
            `;
        }).join('');
    }

    // 5. Обработчик свитчера языков
    const switcherBtn = document.getElementById('lang-switcher');
    if (switcherBtn && !switcherBtn.dataset.listenerReady) {
        switcherBtn.addEventListener('click', (e) => {
            const clickedFlag = e.target.closest('.lang-flag-wrapper');
            if (!clickedFlag || clickedFlag.classList.contains('active')) {
                e.preventDefault();
                return;
            }
            toggleLanguage(e); 
        });
        switcherBtn.dataset.listenerReady = "true";
    }

    if (!window.spaInitialized) {
        initSPA();
        window.spaInitialized = true;
    }
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

// Добавляем TRUE в самый конец (включаем режим перехвата), 
// чтобы window слышал скролл даже внутри твоего .content
window.addEventListener('scroll', (e) => {
    const nav = document.querySelector('.navbar-frame');
    const bg = document.querySelector('.navbar-bg');
    if (!nav) return;

    // Магическая строчка: берём скролл именно с того элемента, который СЕЙЧАС крутится
    let target = e.target === document ? (document.documentElement || document.body) : e.target;
    let st = target.scrollTop;

    // Твоя родная рабочая логика
    if (st > lastScrollTop && st > 100) {
        nav.classList.add('hidden');
        bg.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
        bg.classList.remove('hidden');
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
    // Собираем все элементы в один массив для обработки
    const targets = document.querySelectorAll('.btn, .tag, .project-card, .logo-main');

    targets.forEach(el => {
        // Определяем коэффициент силы для каждого типа элемента
        let strength = 0.3; // дефолт для .btn
        if (el.classList.contains('tag')) strength = 0.25;
        if (el.classList.contains('project-card')) strength = 0.05;
        if (el.classList.contains('logo-main')) strength = 0.5;

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            // Считаем центр
            let x = (e.clientX - rect.left - rect.width / 2) * strength;
            let y = (e.clientY - rect.top - rect.height / 2) * strength;

            // Ограничиваем сдвиг в 16px (Math.min(val, 16) и Math.max(val, -16))
            x = Math.max(-14, Math.min(14, x));
            y = Math.max(-14, Math.min(14, y));

            // Добавляем наклон (tilt): 
            // чем дальше от центра, тем сильнее наклон (в градусах)
            const rotateX = -y * 1; 
            const rotateY = x * 1;

            el.style.transform = `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px) rotateX(0deg) rotateY(0deg)`;
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