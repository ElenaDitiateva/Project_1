/* 1. Написать функцию, преобразующую число в объект. 
    Передавая на вход число от 0 до 999, надо получить на выходе объект.
    Например, для числа 245 надо получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. 
    Если число превышает 999, необходимо выдать соответствующее сообщение и вернуть пустой объект.*/

function getNumber(num) {
    if (num > 999) {
        console.log('Число превышает заданный диапазон');
        return {};
    }

    let a, b, c, r;
    r = num % 100;
    a = (num - r) / 100;
    c = r % 10;
    b = (r - c) / 10;

    return {
        "единицы": c,
        "десятки": b,
        "сотни": a
    };
}

console.log(getNumber(275));


// Shop

let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard']
let PRICES = [100, 120, 1000, 15, 18]
let IDS = [0, 1, 2, 3, 4]

let products = []

function createProductsDTO() {
    let length = IDS.length

    for (let i = 0; i < length; i++) {
        products.push(createProduct(i))
    }
}

function createProduct(index) {
    return {
        product_name: PRODUCTS_NAMES[index],
        price: PRICES[index],
        id_product: IDS[index]
    }
}

/* 3. Товары в корзине хранятся в массиве. Задачи:
a) Организовать такой массив для хранения товаров в корзине;
b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины. */

let BASKET_PRICES = [100, 120, 1000, 15, 18];
let countBasket = 0;

function countBasketPrice() {
    for (let i = 0; i < BASKET_PRICES.length; i++) {
        countBasket += BASKET_PRICES[i];
    }
}
countBasketPrice();

console.log(countBasket); // 1253


// Игра "Угадай число" из методички №2

function userNumber() {
    return parseInt(prompt('Введите четырехзначное число:', ''));
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
    //Максимум не включается, минимум включается
}

let compNumber = getRandomInt(1000, 10000);

function guessNumber() {
    while (true) {
        let num = userNumber();
        if (num > compNumber) {
            alert('Загаданное число меньше');
        } else if (num < compNumber) {
            alert('Загаданное число больше');
        } else if (num == compNumber) {
            alert('Вы угадали!');
        } else {
            alert('Игра окончена');
            break;
        }
    }  
}

guessNumber();