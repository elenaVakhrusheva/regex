class FzSlider extends HTMLElement {
    constructor() {
        super();
        this.setAttribute('enhanced', true)
        this.counter = 1;

        this.scrollContainer = this.querySelector('.fz-scroll');
        this.items = this.scrollContainer.querySelectorAll('.fz-item');
        this.dimensions = this.getBoundingClientRect();
    }
  
     connectedCallback() {
       this.normalizeItensWidth();
       this.eventListeners();
    }

    eventListeners() {
        this.addEventListener('click', this.clickHandler);
        this.addEventListener('touchstart', this.touchStartHandler, { passive: true });
        this.addEventListener('touchend', this.touchEndHandler, { passive: true });
    }

    normalizeItensWidth() {
        this.items.forEach(item => {
            item.style.width = this.dimensions.width + 'px';
        })
    }

    clickHandler(e) {
       /*  e.stopPropagation(); */
        if (e.target.matches('.prev-slider')) this.showPrevSlider();
        if (e.target.matches('.next-slider')) this.showNextSlider();
    }

    touchStartHandler(e) {
        if (e.target.matches('.prev-slider') || e.target.matches('.next-slider')) return
        this.touchStartX = e.changedTouches[0].pageX;
    }

    touchEndHandler(e) {
        if (e.target.matches('.prev-slider') || e.target.matches('.next-slider')) return
        this.touchEndX = e.changedTouches[0].pageX;
        if (this.touchStartX > this.touchEndX) this.showNextSlider();
        if (this.touchStartX < this.touchEndX) this.showPrevSlider();
    }

    showNextSlider() {
        if (this.counter < this.items.length) {
            this.scrollContainer.style.transform = `translateX(-${this.dimensions.width * this.counter}px)`;
            this.counter++;
        }
    }

    showPrevSlider() {
        if (this.counter > 1) {
            this.counter--;
            this.scrollContainer.style.transform = `translateX(-${this.dimensions.width * this.counter - this.dimensions.width}px)`;
        }

    }
}

customElements.define('fz-slider', FzSlider);
