//=======================================================
//  Меню и переходы
//=========================================================
// --- ФУНКЦИЯ SPA НАВИГАЦИИ ---
async function navigate(pageId) {
    const contentArea = document.querySelector('.content'); // Твой блок контента
    if (!contentArea) return;

    // 1. Исчезновение (Opacity 0)
    contentArea.style.opacity = '0';

    // Ждем завершения анимации (0.3s)
    setTimeout(async () => {
        try {
            // 2. Загрузка файла (файлы должны лежать в папке pages/pageId.html)
            const response = await fetch(`./pages/${pageId}.html`);
            if (!response.ok) throw new Error('Ошибка загрузки');
            const html = await response.text();

            // 3. Замена контента
            contentArea.innerHTML = html;

            // 4. Появление (Opacity 1)
            contentArea.style.opacity = '1';

            // 5. Обновляем активный класс в меню и двигаем линию
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
            <a href="${navbarConfig.logo.link}" class="logo" data-link>
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
        const target = e.target.closest('.nav-links a, .logo');
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