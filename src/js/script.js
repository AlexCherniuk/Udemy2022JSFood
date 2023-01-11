import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import converter from './modules/converter';

window.addEventListener('DOMContentLoaded', () => {

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal');
    timer('.timer', '2023-01-17:12:00');
    cards();
    calc();
    forms('form');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prewArrow: '.offer__slider-prev',
        totalCounter: '#total', 
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    converter();
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

    //////////  axios library(server)
    // const axios = require('axios');
    // axios.get('http://localhost:3000/menu')
    //     .then(response => {
    //         response.data.forEach(({ img, altimg, title, descr, price, parentSelector, transfer, classes }) => {
    //             new MenuItem(img, altimg, title, descr, price, parentSelector, transfer, classes).render();
    //         });
    //     });
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







    ///test


});