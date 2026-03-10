addListeners();

function animaster() {
    function resetFadeIn(element) {
        element.style.transitionDuration = null;
        element.classList.add('hide');
        element.classList.remove('show');
    }

    function resetFadeOut(element) {
        element.style.transitionDuration = null;
        element.classList.add('show');
        element.classList.remove('hide');
    }

    function resetMoveAndScale(element) {
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    return {
        fadeIn(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
            return {
                stop() {
                    resetFadeIn(element);
                }
            };
        },

        fadeOut(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');
            return {
                stop() {
                    resetFadeOut(element);
                }
            };
        },

        move(element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
            return {
                stop() {
                    resetMoveAndScale(element);
                }
            };
        },

        scale(element, duration, ratio) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
            return {
                stop() {
                    resetMoveAndScale(element);
                }
            };
        },

        moveAndHide(element, duration, translation) {
            const movePart = (duration * 2) / 5;
            this.move(element, movePart, translation);
            const timeout = setTimeout(() => {
                this.fadeOut(element, (duration * 3) / 5);
            }, movePart);

            return {
                stop() {
                    clearTimeout(timeout);
                    resetMoveAndScale(element);
                    resetFadeOut(element);
                }
            };
        },

        showAndHide(element, duration) {
            const part = duration / 3;
            this.fadeIn(element, part);
            const timeout = setTimeout(() => {
                this.fadeOut(element, part);
            }, part * 2);

            return {
                stop() {
                    clearTimeout(timeout);
                    resetFadeIn(element);
                }
            };
        },

        heartBeating(element) {
            const beat = () => {
                this.scale(element, 500, 1.4);
                setTimeout(() => {
                    this.scale(element, 500, 1);
                }, 500);
            };
            beat();
            const intervalId = setInterval(beat, 1000);

            return {
                stop() {
                    clearInterval(intervalId);
                }
            };
        }
    };
}

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

function addListeners() {
    const master = animaster();
    const activeAnimations = new Map();

    function setupAnimation(name, blockId, playId, stopId, action) {
        document.getElementById(playId).addEventListener('click', () => {
            const block = document.getElementById(blockId);
            const control = action(block);
            activeAnimations.set(name, control);
        });

        document.getElementById(stopId).addEventListener('click', () => {
            const control = activeAnimations.get(name);
            if (control) {
                control.stop();
            }
        });
    }

    setupAnimation('fadeIn', 'fadeInBlock', 'fadeInPlay', 'fadeInStop', (block) => 
        master.fadeIn(block, 5000));

    setupAnimation('fadeOut', 'fadeOutBlock', 'fadeOutPlay', 'fadeOutStop', (block) => 
        master.fadeOut(block, 5000));

    setupAnimation('move', 'moveBlock', 'movePlay', 'moveStop', (block) => 
        master.move(block, 1000, {x: 100, y: 10}));

    setupAnimation('scale', 'scaleBlock', 'scalePlay', 'scaleStop', (block) => 
        master.scale(block, 1000, 1.25));

    setupAnimation('moveAndHide', 'moveAndHideBlock', 'moveAndHidePlay', 'moveAndHideStop', (block) => 
        master.moveAndHide(block, 5000, {x: 100, y: 10}));

    setupAnimation('showAndHide', 'showAndHideBlock', 'showAndHidePlay', 'showAndHideStop', (block) => 
        master.showAndHide(block, 5000));

    setupAnimation('heartBeating', 'heartBeatingBlock', 'heartBeatingPlay', 'heartBeatingStop', (block) => 
        master.heartBeating(block));
}