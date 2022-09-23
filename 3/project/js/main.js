const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const basketTotalEl = document.querySelector('.basketTotal');

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                //                 console.log(data);
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();
console.log(list.allProducts);

class Basket {
    constructor(container = '.basket') {
        this.container = container;
        this.goods = [];
        this._hideBasket();
        this._getBasket()
            .then(data => {
                this.goods = data.contents;
                this.render()
            });
    }

    _hideBasket() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.basket').classList.toggle('hidden');
        });
    }

    _getBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    addProduct() {
       
    }

    removeProduct() {

    }

    render() {
        const blockBasket = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductBasket();
            blockBasket.insertAdjacentHTML('beforeend', productObj.render(product));
        }

    }

}


class ProductBasket {
    render(product, img = 'https://via.placeholder.com/200x150') {
        return ` <div class="basketRow" data-id="${product.id_product}">
                <div>${product.product_name}  <img src="${img}" alt="Some img"></div>
                <div>
                     <span class="productCount">${product.quantity}</span> шт.</div>
                <div>$${product.price}</div>
                <div >
                  $<span class="productTotalRow">${(product.price * product.quantity).toFixed(2)}</span>
                 </div>
                 <div class="del"> <button class="delbtn">x</button></div>
                 </div>
                  `;

    }


}
new Basket();

