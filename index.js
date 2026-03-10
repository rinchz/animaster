addListeners();

/**
 * Функция animaster, возвращающая объект с методами анимаций
 */
function animaster() {
    return {
        /**
         * Блок плавно появляется из прозрачного.
         * @param {HTMLElement} element — HTMLElement, который надо анимировать
         * @param {number} duration — Продолжительность анимации в миллисекундах
         */
        fadeIn(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },

        /**
         * Функция, передвигающая элемент
         * @param {HTMLElement} element — HTMLElement, который надо анимировать
         * @param {number} duration — Продолжительность анимации в миллисекундах
         * @param {Object} translation — объект с полями x и y, обозначающими смещение блока
         */
        move(element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
        },

        /**
         * Функция, увеличивающая/уменьшающая элемент
         * @param {HTMLElement} element — HTMLElement, который надо анимировать
         * @param {number} duration — Продолжительность анимации в миллисекундах
         * @param {number} ratio — во сколько раз увеличить/уменьшить
         */
        scale(element, duration, ratio) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },
    };
}

/**
 * Вспомогательная функция для формирования строки transform
 */
function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}

/**
 * Функция для навешивания обработчиков событий
 */
function addListeners() {
    // Создаем экземпляр анимастера
    const master = animaster();

    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            master.fadeIn(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            master.move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            master.scale(block, 1000, 1.25);
        });
}