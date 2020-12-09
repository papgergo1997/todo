'use strict'

const day = document.querySelector('.day');
const date = document.querySelector('.date');
const myDate = new Date();
const todoInput = document.querySelector('.todo__input');
const plusBtn = document.querySelector('.plus__btn');
const todoSpan = document.querySelector('.todo__span');
const todoList = document.querySelector('.list');
const completeSpan = document.querySelector('.complete__span');
//const deleteBtn = document.querySelectorAll('.delete');
const checkBox = document.querySelectorAll('.checkbox');
const completeBtn = document.querySelector('.complete__btn');
const clearBtn = document.querySelector('.clear__btn');

/*ITEM COUNTER*/

function counter() {
    itemCounter++;
    todoSpan.innerText = itemCounter;
}
let itemCounter = 0;

/*CURRENT DATE*/
(function () {
    let weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    day.innerHTML = weekday[myDate.getUTCDay()];
})();

(function () {
    let years = myDate.getFullYear();
    let months = (myDate.getMonth()) + 1;
    let days = myDate.getDate()
    if (days < 10) {
        days = '0' + days;
    } else {
        days = days;
    };
    if (months < 10) {
        months = '0' + months;
    } else {
        months = months;
    };
    date.innerHTML = `${days}-${months}-${years}`
})()

/*ITEM CREATING*/
function creatItem(/*ha nem működik lehet hogy stringgé kell alakítani a bevitt adatot*/input) {
    let output = document.createElement('DIV')
    output.classList.add('list__item')
    output.innerHTML = `
 <input type="checkbox" name="" class="checkbox">
 <p>${input}</p>
 <button class="delete fa fa-trash"></button>
 `;
    todoList.appendChild(output);
    itemRemover()    
};

/*ITEM ADDING*/
function itemAdder() {
    if (todoInput.value == '') {
        return
    } else {
        creatItem(todoInput.value);
        counter();
    }

    todoInput.value = '';

};

/*ITEM REMOVE*/
function itemRemover() {
    let close = document.getElementsByClassName("delete");
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = "none";
        }
    }
};





plusBtn.addEventListener('click', itemAdder);



