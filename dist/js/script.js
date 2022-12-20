/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent();
  tabsParrent.addEventListener('click', event => {
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

  const deadline = '2022-12-24';
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    let days, hours, minutes, seconds;
    if (t <= 0) {
      // умова, якщо кінцева дата приходить в мінусовому значенні
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor(t / (1000 * 60 * 60) % 24);
      minutes = Math.floor(t / 1000 / 60 % 60);
      seconds = Math.floor(t / 1000 % 60);
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
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal();
    });
  });
  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });
  document.addEventListener('keydown', e => {
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
    constructor(img, alt, title, descr, price, parentSelector, transfer) {
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = transfer;
      this.changeToUAH();
      for (var _len = arguments.length, classes = new Array(_len > 7 ? _len - 7 : 0), _key = 7; _key < _len; _key++) {
        classes[_key - 7] = arguments[_key];
      }
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

  new MenuItem("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9, '.menu .container', 37, 'menu__item', 'first').render();
  new MenuItem("img/tabs/elite.jpg", "elite", 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 12, '.menu .container', 37, 'menu__item').render();
  new MenuItem("img/tabs/post.jpg", "post", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 7, '.menu .container', 37, 'menu__item').render();

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
    }).then(response => response.text()).then(response => {
      const data = JSON.parse(response); // відповідь
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
  forms.forEach(item => postData(item));
  function postData(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);
      const formData = new FormData(form);
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      fetch('server.php', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(object)
      }).then(data => data.text()).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => showThanksModal(message.failure)).finally(() => {
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

  function showThanksModal(message) {
    // цю функцію виконуємо при сабміті форми , старий модал - hide , новий створюємо
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
    }, 3000); /// для можливості повторного відкриття модального вікна.
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
  const getsElem = {
    ivan: 'person',
    anna: 'person',
    cat: 'animal',
    dog: 'animal'
  };
  const newArr = Object.entries(getsElem).filter(item => item[1] === 'person').map(item => item[0]);
  console.log(newArr);

  // just test 

  const films = [{
    name: 'Titanic',
    rating: 9
  }, {
    name: 'Die hard 5',
    rating: 5
  }, {
    name: 'Matrix',
    rating: 8
  }, {
    name: 'Some bad film',
    rating: 4
  }];
  function setFilmsIds(arr) {
    return arr.map((item, i) => {
      item.id = i;
      return item;
    });
  }
  const tranformedArray = setFilmsIds(films);
  function checkFilms(arr) {
    return arr.every(item => 'id' in item);
  }
  function showGoodFilms(arr) {
    return arr.filter(item => {
      return item.rating >= 8;
    });
  }
  function showListOfFilms(arr) {
    return arr.map(item => item.name).join(', ');
  }
  //// test 2 

  const funds = [{
    amount: -1400
  }, {
    amount: 2400
  }, {
    amount: -1000
  }, {
    amount: 500
  }, {
    amount: 10400
  }, {
    amount: -11400
  }];
  const getPositiveIncomeAmount = data => {
    const result = data.filter(item => item.amount >= 0);
    return result.reduce((sum, current) => sum + current.amount, 0);
  }; // готово

  const getTotalIncomeAmount = data => {
    if (data.some(el => el.amount <= 0)) {
      return data.reduce((sum, current) => sum + current.amount, 0);
    } else {
      getPositiveIncomeAmount(funds);
    }
  };
  console.log(getTotalIncomeAmount(funds));
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map