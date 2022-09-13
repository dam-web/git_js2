const products = [
    {id: 1, title: 'Notebook', price: 2000, img: src="https://filearchive.cnews.ru/img/zoom/2019/07/22/hp.jpg" },
    {id: 2, title: 'Mouse', price: 20, img:src= "https://3.404content.com/1/C0/A5/456531598497023390/fullsize.jpg"},
    {id: 3, title: 'Keyboard', price: 200, img:src= "https://tekhnik.top/wp-content/uploads/2020/06/apple_magic_keyboard_white_bluetooth.An5hr.jpg"},
    {id: 4, title: 'Gamepad', price: 50, img: src= "https://playgames.ru/wa-data/public/shop/products/25/56/5625/images/44280/44280.970.jpg"},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = item => {
    return `<div class="product-item">
                <img class="img" src="${item.img}" alt="photo">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)).join("");
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);

/* Запятые появлялись, потому что мы собираем массив с разметкой
 и массив выводим,а когда массив превращается в строку,
 запятые, разделяющие значения остаются.
*/