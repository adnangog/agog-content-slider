
const container = document.querySelector(".carousel-container");
const carousel = document.querySelector(".carousel-items");
let items = document.querySelectorAll(".carousel-item");
const size = 4;
const itemWidth = container.clientWidth / size;
let isSliding = false;


items.forEach((item, i) => {
    item.style.flexBasis = itemWidth + 'px';
})

items = Array.prototype.slice.call(document.querySelectorAll(".carousel-item"));

renderHtml();

function renderHtml() {
    for (i = 0; i < items.length; i++) {
        carousel.appendChild(items[i])
    }
}


/*
arrows
*/
let prevBtn = document.createElement("img");
prevBtn.id = 'prevBtn';
prevBtn.src = 'left.svg';
prevBtn.className = "arrows";

prevBtn.addEventListener('click', () => {
    if (!isSliding) {
        isSliding = true;
        items = [items[6], ...items.slice(0, 6)];
        renderHtml();
        carousel.style.transition = 'none';
        carousel.style.transform = 'translateX(' + (-itemWidth) + 'px)';

        setTimeout(() => {
            carousel.style.transition = 'transform 0.4s ease-in-out';
            carousel.style.transform = 'translateX(' + (0) + 'px)';
            isSliding = false;
        }, 0);
    }

})

let nextBtn = document.createElement("img");
nextBtn.id = 'nextBtn';
nextBtn.src = 'right.svg';
nextBtn.className = "arrows";

nextBtn.addEventListener('click', () => {
    if (!isSliding) {
        isSliding = true;
        carousel.style.transition = 'transform 0.4s ease-in-out';
        carousel.style.transform = 'translateX(' + (-itemWidth) + 'px)';

        items = [...items.slice(1, items.length), items[0]];

        setTimeout(() => {
            carousel.style.transition = 'none';
            carousel.style.transform = 'translateX(0px)';
            renderHtml();
            isSliding = false;
        }, 400);
    }
})

if (items.length > size) {
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
}

/* mouse events start*/
let pressed = false;
let startX;
let endX;

carousel.addEventListener('mousedown', (e) => {
    pressed = true;
    startX = e.pageX;
    carousel.style.cursor = "grabbing";
})

carousel.addEventListener('mouseenter', () => {
    carousel.style.cursor = "grab";
})

carousel.addEventListener('mouseup', () => {
    carousel.style.cursor = "grab";
    if (startX && endX) {
        if (startX < endX)
            prevBtn.click();
        if (startX > endX)
            nextBtn.click();
    }
    pressed = false;
    startX = endX = null;
})

carousel.addEventListener('mousemove', (e) => {
    if (!pressed) return;
    endX = e.pageX;
    e.preventDefault();
})

/* mouse events end */


