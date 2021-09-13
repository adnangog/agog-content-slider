(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.agogContentSlider = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    'use strict';

    var agogContentSlider = {};
    var supports = !!document.querySelector && !!root.addEventListener;
    var settings;


    // Varsayılan ayarlar
    var defaults = {
        selector: '[data-agog-content-slider]',
        containerClass: 'agogContentSlider-container',
        itemContainerClass: 'agogContentSlider-items-container',
        carouselClass: 'agogContentSlider-items',
        itemClass: 'agogContentSlider-item',
        size: 3,
        count:1,
        callbackBefore: function () {
        },
        callbackAfter: function () {
        }
    };


    //
    // Methods
    //



    /**
     * Handle events
     * @private
     */
    var eventHandler = function (event) {
        // @todo Do something on event
    };

    /**
     * Destroy the current initialization.
     * @public
     */
    agogContentSlider.destroy = function () {


        if (!settings) return;

        agogContentSlider.removeListeners();

        document.querySelectorAll("." + settings.containerClass).forEach(item => item.remove())

        settings = null;

    };

    agogContentSlider.init = function (options) {

        if (!supports) return;

        agogContentSlider.destroy();

        settings = Object.assign(defaults, options);

        settings.callbackBefore();

        agogContentSlider.create();

        settings.callbackAfter();

    };


    agogContentSlider.create = function () {

        const targetElements = document.querySelectorAll(settings.selector);

        for (let index = 0; index < targetElements.length; index++) {
            const carousel = targetElements[index];

            const container = document.createElement("div");
            container.classList = carousel.classList;
            container.classList.add(settings.containerClass);

            carousel.className=settings.carouselClass;

            const itemsContainer = document.createElement("div");
            itemsContainer.classList.add(settings.itemContainerClass)
            

            carousel.parentElement.appendChild(container);
            container.appendChild(itemsContainer);
            itemsContainer.appendChild(carousel);

            let items = Array.prototype.slice.call(carousel.children);

            const itemWidth = container.clientWidth / settings.size;

            items.forEach((item, i) => {
                item.style.flexBasis = itemWidth + 'px';
                items[i].classList.add(settings.itemClass);
            })


            agogContentSlider.renderHtml(items, carousel);



            /*
            arrows
            */
            let prevBtn = document.createElement("img");
            prevBtn.src = 'left.svg';
            prevBtn.classList.add("agogContentSlider-arrows", "agogContentSlider-prevBtn")

            let nextBtn = document.createElement("img");
            nextBtn.src = 'right.svg';
            nextBtn.classList.add("agogContentSlider-arrows", "agogContentSlider-nextBtn")

            if (items.length > settings.size) {
                container.appendChild(prevBtn);
                container.appendChild(nextBtn);
            }

            agogContentSlider.addListeners(carousel);
        }

    };

    agogContentSlider.renderHtml = function (items, carousel) {

        for (let i = 0; i < items.length; i++) {
            carousel.appendChild(items[i])
        }
    }

    agogContentSlider.addListeners = function (carousel) {


        document.querySelectorAll(".agogContentSlider-prevBtn").forEach(prevBtn => {
            prevBtn.addEventListener('click', function () { prevClick(carousel) })
        })

        document.querySelectorAll(".agogContentSlider-nextBtn").forEach(nextBtn => {
            nextBtn.addEventListener('click', function () { nextClick(carousel) })
        })

        document.querySelectorAll("." + settings.carouselClass).forEach(carousel => {
            carousel.addEventListener('mousedown', function (e) { carouselMouseDown(e,carousel) })
            carousel.addEventListener('mouseenter', function () { carouselMouseEnter(carousel) })
            carousel.addEventListener('mouseup', function () { carouselMouseUp(carousel) })
            carousel.addEventListener('mousemove', function (e) { carouselMouseMove(e) })
        })

    };

    agogContentSlider.removeListeners = function () {
        document.querySelectorAll(".agogContentSlider-prevBtn").forEach(prevBtn => {
            prevBtn.removeEventListener('click', function () { prevClick() })
        })

        document.querySelectorAll(".agogContentSlider-nextBtn").forEach(nextBtn => {
            nextBtn.removeEventListener('click', function () { nextClick() })
        })

        document.querySelectorAll("." + settings.carouselClass).forEach(carousel => {
            carousel.removeEventListener('mousedown', function (e) { carouselMouseDown(e) })
            carousel.removeEventListener('mouseenter', function () { carouselMouseEnter() })
            carousel.removeEventListener('mouseup', function () { carouselMouseUp() })
            carousel.removeEventListener('mousemove', function (e) { carouselMouseMove(e) })
        })
    };

    let pressed = false;
        let startX;
        let endX;
        let isSliding = false;

    function prevClick(carousel) {
        if (!isSliding) {
            isSliding = true;
            const itemWidth = carousel.parentElement.parentElement.clientWidth / settings.size;
            let items = Array.prototype.slice.call(carousel.children);
            items = [items[items.length-1], ...items.slice(0, (items.length-1))];
            agogContentSlider.renderHtml(items,carousel);
            carousel.style.transition = 'none';
            carousel.style.transform = 'translateX(' + (-itemWidth) + 'px)';

            setTimeout(() => {
                carousel.style.transition = 'transform 0.4s ease-in-out';
                carousel.style.transform = 'translateX(' + (0) + 'px)';
                isSliding = false;
            }, 0);
        }
    }

    function nextClick(carousel) {
        if (!isSliding) {
            isSliding = true;
            const itemWidth = carousel.parentElement.parentElement.clientWidth / settings.size;
            carousel.style.transition = 'transform 0.4s ease-in-out';
            carousel.style.transform = 'translateX(' + (-itemWidth) + 'px)';

            

            let items = Array.prototype.slice.call(carousel.children);
            items = [...items.slice(1, items.length), items[0]];

            setTimeout(() => {
                carousel.style.transition = 'none';
                carousel.style.transform = 'translateX(0px)';
                agogContentSlider.renderHtml(items,carousel);
                isSliding = false;
            }, 400);
        }
    }


    /* mouse events start*/

    function carouselMouseDown(e,carousel) {
        pressed = true;
        startX = e.pageX;
        carousel.style.cursor = "grabbing";
    }

    function carouselMouseEnter(carousel) {
        carousel.style.cursor = "grab";
    }

    function carouselMouseUp(carousel) {
        carousel.style.cursor = "grab";
        if (startX && endX) {
            if (startX < endX)
                carousel.parentElement.parentElement.querySelector(".agogContentSlider-prevBtn").click();
            if (startX > endX)
                carousel.parentElement.parentElement.querySelector(".agogContentSlider-nextBtn").click();
        }
        pressed = false;
        startX = endX = null;
    }


    function carouselMouseMove(e) {
        if (!pressed) return;
        endX = e.pageX;
        e.preventDefault();
    }

    /* mouse events end */



    return agogContentSlider;

});