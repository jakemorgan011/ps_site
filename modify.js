// heres the deal:
// we can either make a bunch of different scripts the lazy way and have this avaible for every div
// OR you can do it right and make it dynamic.
const window_height = window.screen.height;
const window_width = window.screen.width;

class SizeAnimator {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        this.intervalId = null;
        this.currentSize = { width: 0, height: 0 };
        this.settings = {
            minWidth: 100,
            maxWidth: 500,
            minHeight: 50,
            maxHeight: 300,
            step: 10,
            interval: 100, // ms
            pxRate: 0.3,
            ...options
        };
        //okay starting to understand that this is how you do a 'struct'
        this.newSize = {width: this.getRandomSize('width'), height: this.getRandomSize('height')};
        this.mantissa = this.settings.pxRate;

        if (!this.container) {
            throw new Error(`Container with selector "${containerSelector}" not found`); // error handling
        }
    }

    start() {
        this.currentSize = {
            width: this.getRandomSize('width'),
            height: this.getRandomSize('height')
        };
        this.updateContainer();

        this.intervalId = setInterval(() => {
            this.animateTowardsSize();
            this.updateContainer();
        }, this.settings.interval);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    getRandomSize(dimension) {
        const { minWidth, maxWidth, minHeight, maxHeight, step } = this.settings;
        // cool selector logic...
        const min = dimension === 'width' ? minWidth : minHeight;
        const max = dimension === 'width' ? maxWidth : maxHeight;

        // Round to nearest step for cleaner transitions
        return Math.round((Math.random() * (max - min) + min) / step * step);
    }
    // use ${to convert to string} css reads strings?
    updateContainer() {
        this.container.style.width = `${this.currentSize.width}px`;
        this.container.style.height = `${this.currentSize.height}px`;
    }
    animateTowardsSize() {
        if(this.settings.pxRate >= 1){
            this.settings.pxRate  -= 1;
            let randSize = {width: this.getRandomSize('width'),height: this.getRandomSize('height')}; 
            this.newSize = randSize;
        }
        // rn it fucks up when rate hits zero lol
        // pixel rate is return NaN;
        this.currentSize.width = this.currentSize.width + (this.newSize.width - this.currentSize.width)*this.settings.pxRate;   
        this.currentSize.height = this.currentSize.height + (this.newSize.height - this.currentSize.height)*this.settings.pxRate;   
        console.log(this.settings.pxRate,' rate');
        // at the end.
        this.settings.pxRate += this.mantissa;
    }
}

//
const MAX_HEIGHT = window_height / 4;
const MAX_WIDTH = window_width / 5;

// independent objects inside the flexbox
document.addEventListener('DOMContentLoaded', () => {
    // Create animator instance
    const animator = new SizeAnimator('.links', {
        minWidth: 65,
        maxWidth: MAX_WIDTH,
        minHeight: 60,
        maxHeight: MAX_HEIGHT,
        step: 10,
        interval: 75, // Update every 500ms
        pxRate:0.03
    });
    animator.start();
});

document.addEventListener('DOMContentLoaded', () => {
  // grab the element id via #
    const animator2 = new SizeAnimator('#project_directory',{
        minWidth: 145, // default 145 for "project_directory"
        maxWidth: MAX_WIDTH, //default 200
        minHeight: 60, // default 60
        maxHeight: MAX_HEIGHT, // default 200
        step: 10,
        interval: 75,
        pxRate: 0.02
    });
  animator2.start();
});
