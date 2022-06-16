let availableInput = document.querySelector('.currency-number'); //находим левый инпут
availableInput.value = '1';

let desirableInput = document.querySelector('.currency-number-two'); //находим правый инпут


let currencyAvaliable = document.querySelectorAll('.currency-form-list .currency-name li'); //находим li, которые лежат в левом конвертере
console.log('currencyAvaliable',currencyAvaliable);
let currencyDisarable = document.querySelectorAll('.currency-form-list-two .currency-name-two li') //аналогично находим в правом
console.log('currencyDisarable',currencyDisarable); 



//addEvListener на li
currencyAvaliable.forEach(item => { //проходимся методом, тк qyeryselectorAll
    item.addEventListener('click', (event) => {
        console.log(currencyAvaliable);
        currencyAvaliable.forEach (item => {
            item.classList.remove ('chosen') //убираем класс
        })
        event.target.classList.add('chosen') //добавляем класс
        getCurrencyCourse(true)
    })
})

currencyDisarable.forEach(item => {
    item.addEventListener('click', (event) => {
        currencyDisarable.forEach (item => {
            item.classList.remove ('chosen')
        })
        event.target.classList.add('chosen')
        getCurrencyCourse(true)
    })
}) 

//addEvListener на enter
console.log(document.querySelectorAll('input'));

document.querySelectorAll('input').forEach(item => {
    item.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') 
        getCurrencyCourse(true);
    })
}) 

//adEvListener на левый input
availableInput.addEventListener('input', (event) => {
    console.log(event.target.value)
})

//adEvListener на правый input
desirableInput.addEventListener('input', (event) => {
    console.log(event.target.value)
})


function getCurrencyCourse (isAvaliableInput = true) { //функция будет делать запрос и подсчитывать значения
let rightCurrency = document.querySelector('.currency-form-list li.chosen').innerText; //значения, которые мы подставляем под наш запрос //USD
let leftCurrency = document.querySelector('.currency-form-list-two li.chosen').innerText; //RUB 

let leftSpanForm = document.querySelector('.currency-equivalent'); //находим span 
let rightSpanForm = document.querySelector('.currency-equivalent-two');
console.log(leftCurrency);
console.log(rightCurrency);

if (rightCurrency  == leftCurrency ) { //span записывается одинаково при одинаковых currency 
    rightSpanForm.innerText =`1 ${rightCurrency} = 1.00 ${leftCurrency}`;
    
    leftSpanForm.innerText =`1 ${rightCurrency} = 1.00 ${leftCurrency}`;
    desirableInput.value = availableInput.value;
    }else {
    var requestURL = `https://api.exchangerate.host/latest?base${rightCurrency}&to=${leftCurrency}&places=4`; 
    fetch(requestURL)
    .then(response => response.json())
    .then(data => console.log(data)); 

    // display results after convertion
    let fromRate = data.rates[leftCurrency];
    let toRate = data.rates[rightCurrency];
    finalValue.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = 'block';
}} 

/*.catch((error) => {
    console.log(error);
})*/

//https://api.exchangerate.host/latest?base=USD&symbols=RUB 

/*Найти спаны по тегам
let span = docQuerySelector ('span')
let span2 = 

if (rightCurrency  === leftCurrency ) {
span.innerText === `1 ${rightCurrency}= 1 ${leftCurrency}` 
span2.innerText === `1 ${rightCurrency}= 1 ${leftCurrency}`
desirableInput.value == availableInput.value
}else {
fetch()
var requestURL = `https://api.exchangerate.host/convert?from=${rightCurrency}&to=${leftCurrency}`;
.then ....
.data.rates[leftCurrency or rightCurrency] ..... посмотреть в консоли в preview/rates
}
.catch

}*/

