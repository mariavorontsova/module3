let availableInput = document.querySelector('.currency-number'); //находим левый инпут
availableInput.value = '1';

let desirableInput = document.querySelector('.currency-number-two'); //находим правый инпут

let rateValue=0;

let currencyAvaliable = document.querySelectorAll('.currency-form-list .currency-name li'); //находим li, которые лежат в левом конвертере
// console.log('currencyAvaliable',currencyAvaliable);

let currencyDisarable = document.querySelectorAll('.currency-form-list-two .currency-name-two li') //аналогично находим в правом
// console.log('currencyDisarable',currencyDisarable);

//addEvListener на li
currencyAvaliable.forEach(item => { //проходимся методом, тк qyeryselectorAll
    item.addEventListener('click', (event) => {
        // console.log(currencyAvaliable);
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
        getCurrencyCourse()
    })
})
getCurrencyCourse();

//addEvListener на enter
console.log(document.querySelectorAll('input'));
document.querySelectorAll('input').forEach(item => {
item.addEventListener('keydown', (event) => {
if (event.key == 'Enter')
getCurrencyCourse(true);
})
})

function getCurrencyCourse (isAvaliableInput = true) { //функция будет делать запрос и подсчитывать значения
let rightCurrency = document.querySelector('.currency-form-list li.chosen').innerText; //значения, которые мы подставляем под наш запрос //USD
let leftCurrency = document.querySelector('.currency-form-list-two li.chosen').innerText; //RUB
let leftSpanForm = document.querySelector('.currency-equivalent'); //находим span
let rightSpanForm = document.querySelector('.currency-equivalent-two');
// console.log(leftCurrency);
// console.log(rightCurrency);
if (rightCurrency  !== leftCurrency ) { //span записывается одинаково при одинаковых currency
    rightSpanForm.innerText =`1 ${leftCurrency} = ${rateValue} ${rightCurrency}`;
    leftSpanForm.innerText =`1 ${rightCurrency} = ${(1/rateValue).toFixed(3)} ${leftCurrency}`;
    //desirableInput.value = availableInput.value;
    
    var requestURL = `https://api.exchangerate.host/convert?from=${rightCurrency}&to=${leftCurrency}`;
    
    fetch(requestURL)
    .then(result=>result.json())
    .then(data=>{
        console.log(data);
        rateValue = data.result;
        rateValue = rateValue.toFixed(3);
        
        desirableInput.value = ((data.result) * availableInput.value).toFixed(3);
        console.log(desirableInput.value)
    })
    
}else{
    rightSpanForm.innerText =`1 ${rightCurrency} = 1.00 ${leftCurrency}`;
    leftSpanForm.innerText =`1 ${rightCurrency} = 1.00 ${leftCurrency}`;
    // desirableInput.value = availableInput.value;
}
}
//adEvListener на левый input
availableInput.addEventListener('input', (event) => {
    availableInput=event.target.value;
    desirableInput.value=(availableInput*rateValue).toFixed(3)
    console.log(availableInput)
    console.log(desirableInput.value)
})
//adEvListener на правый input
desirableInput.addEventListener('input', (event) => {
    desirableInput=event.target.value
    availableInput.value=(desirableInput * (1/rateValue)).toFixed(3)
    console.log(desirableInput)
});
