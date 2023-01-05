window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item');
    const tabContent = document.querySelectorAll('.tabcontent');
    const tabsParrent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParrent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

    // Timer 

    const deadline = '2023-01-06:22:00';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        let days, hours, minutes, seconds;
        if (t <= 0) { // умова, якщо кінцева дата приходить в мінусовому значенні
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num > 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

    // Modal

    const modal = document.querySelector('.modal');
    const btns = document.querySelectorAll('[data-modal]');


    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }


    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal();
        });
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    function User(name, age, proffesion) {
        this.name = name;
        this.age = age;
        this.proffesion = proffesion;
    }

    const alex = new User('Alex', '32', 'Front-end developer');


    // Class =================================================================


    // class Square {
    //     constructor(width, height) {
    //         this.width = width;
    //         this.height = height;
    //     }
    //     createSquare(){
    //         return this.width * this.height;
    //     }
    // }
    // const square1 = new Square(34, 23);
    // console.log(square1.createSquare());

    class MenuItem {
        constructor(img, altimg, title, descr, price, parentSelector, transfer, classes) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = transfer;
            this.changeToUAH();
            this.classes = classes;
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const elem = document.createElement('div');
            this.classes.forEach(className => elem.classList.add(className));
            elem.innerHTML = `                
                    <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
            this.parent.append(elem); // загружаеьмо наш elem в HTML , а саме в тег parent;
        }
    }

    const getResource = async (url) => { // universal function for GET method and use this data
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Помилка в ${url}  статус: ${res.status}`);  // create manual error  
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')  // universal Promise for rendering element
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price, parentSelector, transfer, classes}) => {
    //             new MenuItem(img, altimg, title, descr, price, parentSelector, transfer, classes).render();
    //         });
    //     }); 
    //////////  axios library(server)
    const axios = require('axios');
    axios.get('http://localhost:3000/menu')
        .then(response => {
            response.data.forEach(({ img, altimg, title, descr, price, parentSelector, transfer, classes }) => {
                new MenuItem(img, altimg, title, descr, price, parentSelector, transfer, classes).render();
            });
        });
    // new MenuItem(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container',
    //     37,
    //     'menu__item'
    // ).render();

    // new MenuItem(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     12,
    //     '.menu .container',
    //     37,
    //     'menu__item'
    // ).render();

    // new MenuItem(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     7,
    //     '.menu .container',
    //     37,
    //     'menu__item'
    // ).render();


    // AJAX=============================
    const inputUA = document.querySelector('#uah'),
        inputUsd = document.querySelector('#usd');

    // Old method :      
    // const request = new XMLHttpRequest();
    // Запрос відкриваємо , налаштовуємо , відправляємо
    // request.open('GET', 'js/current.json');
    // request.setRequestHeader('Content-type', 'applocation/json; charset=utf-8');
    // request.send();

    // // Запрос виконався і чекає на дії , ми в свою чергу створюємо ці дії - якщо запрос загрузився , то перевіряєм чи вдало 
    // // загрузився робимо дії , якщо невдало то робимо відповідні сповіщення
    // request.addEventListener('load', () => {
    //     if (request.status === 200) {
    //         const data = JSON.parse(request.response);   // відповідь
    //         console.log(request.response);
    //         inputUsd.value = (+inputUA.value / data.current.usd).toFixed(2);
    //     } else {
    //         inputUsd.value = "Щось пішло не так!";
    //     }
    // });
    inputUA.addEventListener('input', () => {
        fetch('js/current.json', {
            method: 'GET',
            headers: {
                'Content-type': 'applocation/json',
                'charset': 'utf-8'
            }
        }).then(response => response.text())
            .then(response => {
                const data = JSON.parse(response);   // відповідь
                console.log(response);
                inputUsd.value = (+inputUA.value / data.current.usd).toFixed(2);
            }).catch(() => inputUsd.value = "Щось пішло не так!");
    });

    // =============== POST practic - send forms


    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Loading...',
        success: 'Thanks!',
        failure: 'Error!'
    };




    forms.forEach(item => bindPostData(item));

    const postData = async (url, data) => {    // universal  POST method function 
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries())); //universal converter formData to json


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => showThanksModal(message.failure))
                .finally(() => {
                    form.reset();
                });

            // request.addEventListener('load', () => {
            //     if (request.status === 200) { // коли ми отримали відповідь від сервера.
            //         console.log(request.response); // це відповідь від сервера. 
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }


    function showThanksModal(message) {     // цю функцію виконуємо при сабміті форми , старий модал - hide , новий створюємо
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();

        }, 3000);   /// для можливості повторного відкриття модального вікна.
    }

    //// Promise
    // const syncAction = new Promise((resolve, reject) => {
    //     console.log('preparing...');
    //     resolve();
    // }).then(() => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             console.log('Loading data...');
    //             resolve();
    //         }, 1000);
    //     });
    // }).then(() => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             console.log('Send data...');
    //             resolve();
    //         }, 1000);
    //     });
    // }).then(() => {
    //     setTimeout(() => {
    //         console.log('Finish)');
    //     }, 1000);
    // });
    /////////////////////////////// fetch API
    // fetch('server.php', {
    //     method: 'POST', 
    //     headers: {
    //         'Content-type': 'aplication/json'
    //     },
    //     body: formData
    // });



    //================================ Array methods 
    // const getsElem = {
    //     ivan: 'person',
    //     anna: 'person',
    //     cat: 'animal',
    //     dog: 'animal'
    // };

    // const newArr = Object.entries(getsElem)
    //     .filter(item => item[1] === 'person')
    //     .map(item => item[0]);

    // console.log(newArr);
    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(result => console.log(result));

    // just test 


    //////////////////////////////////////////////////////////////// Slider /////

    const slides = document.querySelectorAll('.offer__slide');
    const next = document.querySelector('.offer__slider-next');
    const prev = document.querySelector('.offer__slider-prev');
    const totalSlides = document.querySelector('#total');
    const currentSlides = document.querySelector('#current');
    const slider = document.querySelector('.offer__slider');
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

    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');

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

    //////////////                             Calculator

    // const result = document.querySelector('.calculating__result span');
    // let sex = 'female', height, weight, age, ratio = 1.375;
    // //Функція - формула розрахунку. 
    // function calcTotal() {
    //     if (!sex || !height || !weight || !age || !ratio) {
    //         result.textContent = '___ ';
    //         return;
    //     }

    //     if (sex === 'female') {
    //         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    //     } else {
    //         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    //     }
    // }
    // calcTotal();

    // // get data from static content (sex , ratio)

    // function getStaticInformation(parentSelector, activeClass) {
    //     const elements = document.querySelectorAll(`${parentSelector} div`);

    //     elements.forEach(el => {
    //         el.addEventListener('click', (e) => {
    //             if (e.target.getAttribute('data-ratio')) {
    //                 ratio = e.target.getAttribute('data-ratio');
    //             } else {
    //                 sex = e.target.getAttribute('id');
    //             }
    //             elements.forEach(el => {
    //                 el.classList.remove(activeClass);
    //             });
    //             e.target.classList.add(activeClass);
    //             calcTotal();

    //         });
    //     });
    // }

    // getStaticInformation('#gender', 'calculating__choose-item_active');
    // getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    // //function for dynamic data (input)
    // function getDynamicInformation(selector) {
    //     const input = document.querySelector(selector);

    //     input.addEventListener('input', () => {
    //         switch (input.getAttribute('id')) {
    //             case 'height':
    //                 height = +input.value;
    //                 break;
    //             case 'weight':
    //                 weight = +input.value;
    //                 break;
    //             case 'age':
    //                 age = +input.value;
    //                 break;
    //         }

    //         calcTotal();

    //     });
    // }

    // getDynamicInformation('#height');
    // getDynamicInformation('#weight');
    // getDynamicInformation('#age');

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }



    //sync active class with LocalStorage
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.remove(activeClass);

            if (el.getAttribute('id') === localStorage.getItem('sex')) {
                el.classList.add(activeClass);
            }

            if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                el.classList.add(activeClass);
            }
        });
    }


    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');



    function calcTotal() {
        if (!height || !weight || !age) {
            result.textContent = '___ ';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {

            elem.addEventListener('click', (e) => {
                if (elem.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
    
    
    
    
    ///test
    //test encapsulation
    class UserA {
        constructor(name, age) {
            this._name = name;
            this._age = age;
        }

        get age() {
            return this._age;
        }

        set  age(age) {
            this._age = age;
        }
    }

const alexandr = new UserA('Alex', 32);
console.log(alexandr.age);
console.log(alexandr.name); //not working

});