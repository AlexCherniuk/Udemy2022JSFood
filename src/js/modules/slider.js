function slider({container, slide, nextArrow, prewArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide);
    const next = document.querySelector(nextArrow);
    const prev = document.querySelector(prewArrow);
    const totalSlides = document.querySelector(totalCounter);
    const currentSlides = document.querySelector(currentCounter);
    const slider = document.querySelector(container);
    let slideIndex = 1;
    let offset = 0;
    const dots = [];

    slider.style.position = 'relative';
    const indicators = document.createElement('ol');
    slider.append(indicators);
    indicators.classList.add('carousel-indicators');

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }



    if (slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`;
        currentSlides.textContent = `0${slideIndex}`;
    } else {
        totalSlides.textContent = slides.length;
        currentSlides.textContent = slideIndex;
    }

    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);

    const width = window.getComputedStyle(slidesWrapper).width;

    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(slide => slide.style.width = width);
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    const widthToNum = +width.replace(/\D/g, '');// 


    next.addEventListener('click', () => {
        if (offset == widthToNum * (slides.length - 1)) { // width to string and delete 2 last symbols
            offset = 0;
        } else {
            offset += widthToNum;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slideIndex < 10) {
            currentSlides.textContent = `0${slideIndex}`;
        } else {
            currentSlides.textContent = slideIndex;
        }

        //navigation dots 
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = widthToNum * (slides.length - 1);
        } else {
            offset -= widthToNum;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slideIndex < 10) {
            currentSlides.textContent = `0${slideIndex}`;
        } else {
            currentSlides.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = widthToNum * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (slideIndex < 10) {
                currentSlides.textContent = `0${slideIndex}`;
            } else {
                currentSlides.textContent = slideIndex;
            }
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

    ///////version 2 
    // showSlides(slideIndex);
    // if (slides.length < 10) {
    //     currentSlides.textContent = `0${slideIndex}`;
    //     totalSlides.textContent = `0${slides.length}`;

    // }

    // function showSlides(n) {
    //     if(n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if(n < 1) {
    //         slideIndex = slides.length;
    //     }
    //     slides.forEach(slide => slide.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';
    //       .textContent = `0${slideIndex}`;
    // }
    // next.addEventListener('click', ()=>{
    //     ++slideIndex;
    //     showSlides(slideIndex);
    // });
    // prev.addEventListener('click', ()=>{
    //     --slideIndex;
    //     showSlides(slideIndex);
    // });
}
export default slider;