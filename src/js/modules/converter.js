function converter() {
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
                inputUsd.value = (+inputUA.value / data.current.usd).toFixed(2);
            }).catch(() => inputUsd.value = "Щось пішло не так!");
    });

    // =============== POST practic - send forms



}

module.exports = converter;