import { getResource } from "../services/services";

function cards () {
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



    getResource('http://localhost:3000/menu')  // universal Promise for rendering element
        .then(data => {
            data.forEach(({img, altimg, title, descr, price, parentSelector, transfer, classes}) => {
                new MenuItem(img, altimg, title, descr, price, parentSelector, transfer, classes).render();
            });
        }); 
}
export default cards;