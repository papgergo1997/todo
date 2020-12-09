'use strict'

const day = document.querySelector('.day');
const date = document.querySelector('.date');
const myDate = new Date();
const todoInput = document.querySelector('.todo__input');
const plusBtn = document.querySelector('.plus__btn');
const deletBtn = document.querySelectorAll('.delete');


(function(){
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

(function(){
    let years = myDate.getFullYear();
    let months = (myDate.getMonth()) + 1;
    let days = myDate.getDate()
    if(days < 10) {
        days = '0' + days;
    } else {
        days = days;
    };
    if(months < 10) {
        months = '0' + months;
    } else {
        months = months;
    };
    date.innerHTML = `${days}-${months}-${years}`
})()
    