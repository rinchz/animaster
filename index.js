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

        fadeOut(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');
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

        moveAndHide(element, duration, translation) {
            this.move(element, (duration * 2) / 5, translation);
            setTimeout(() => {
                this.fadeOut(element, (duration * 3) / 5);
            }, (duration * 2) / 5);
        },

        showAndHide(element, duration) {
            const part = duration / 3;
            this.fadeIn(element, part);
            setTimeout(() => {
                this.fadeOut(element, part);
            }, part * 2);
        },

        heartBeating(element) {
            const beat = () => {
                this.scale(element, 500, 1.4);
                setTimeout(() => {
                    this.scale(element, 500, 1);
                }, 500);
            };
            beat();
            return setInterval(beat, 1000);
        }
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

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            master.fadeOut(block, 5000);
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

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            master.moveAndHide(block, 5000, {x: 100, y: 10});
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            master.showAndHide(block, 5000, {x: 100, y: 10});
        });
    
    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            master.heartBeating(block, 5000, {x: 100, y: 10});
        });
}