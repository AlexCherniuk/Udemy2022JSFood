import {closeModal, openModal} from "./modal";
import { postData } from "../services/services";

function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'Loading...',
        success: 'Thanks!',
        failure: 'Error!'
    };
    forms.forEach(item => bindPostData(item));

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

                function showThanksModal(message) {     // цю функцію виконуємо при сабміті форми , старий модал - hide , новий створюємо
                    const prevModalDialog = document.querySelector('.modal__dialog');
            
                    prevModalDialog.classList.add('hide');
                    openModal('.modal');
            
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
                        closeModal('.modal');
                    }, 3000);   /// для можливості повторного відкриття модального вікна.
                }
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
}
export default forms;