'use strict'
let itemCounter = 0;
let localCounter = 0;
let clear = null;
const day = document.querySelector('.day');
const date = document.querySelector('.date');
const myDate = new Date();
const todoInput = document.querySelector('.todo__input');
const plusBtn = document.querySelector('.plus__btn');
const itemCounterText = document.querySelectorAll('.item__counter');
const todoSpan = document.querySelector('.todo__span');
const todoList = document.querySelector('.list');
const completeList = document.querySelector('.list__complete');
const completeSpan = document.querySelector('.complete__span');
//const deleteBtn = document.querySelectorAll('.delete');
//const checkBox = document.querySelectorAll('.checkbox');
const completeBtn = document.querySelector('.complete__btn');
const clearBtn = document.querySelector('.clear__btn');

/*LOCAL STORAGE*/
const local = {
    setLocalItem(key, input) {
        localStorage.setItem(key, JSON.stringify(input))
    },

    readLocalItems() {
        for (let i = 0; i < localStorage.length; i++) {
        let output = document.createElement('DIV')
        output.classList.add('list__item')
        output.innerHTML = `
            <input type="checkbox" name="" class="checkbox">
            <p>${JSON.parse(localStorage.getItem(localStorage.key(i)))}</p>
            <button class="delete fa fa-trash"></button>
            `;
        todoList.appendChild(output);
        addLocalCounter();
        plusCounter();
        }        
        itemRemover();
        addToCompleteList();
    },

    deleteOneLocalItem(value) {                  
        for (let i = 0; i< localStorage.length; i ++) {
            if (localStorage.getItem(i) == value) {
                return
            } else {
                localStorage.removeItem(localStorage.key(i));//Ezt még ki kell dolgozni!!!!!
            }
        }
    },

    deleteAllLocalItems() {
        localStorage.clear()
    }
}

local.readLocalItems();



function addLocalCounter() {
    localCounter++
};

function minusLocalCounter(){
    localCounter--;
};

/*ITEM COUNTER*/



function plusCounter() {
    itemCounter++;
    todoSpan.innerText = itemCounter;
}

function minusCounter() {
    itemCounter--;
    todoSpan.innerText = itemCounter;
}


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
function createItem(/*ha nem működik lehet hogy stringgé kell alakítani a bevitt adatot*/input) {
    let output = document.createElement('DIV')
    output.classList.add('list__item')
    output.innerHTML = `
 <input type="checkbox" name="" class="checkbox">
 <p>${input}</p>
 <button class="delete fa fa-trash"></button>
 `;
    todoList.appendChild(output);
    itemRemover();
    // onclickListItem();
    addToCompleteList();
};

function createCompleteItem(item/*ha nem működik lehet hogy stringgé kell alakítani a bevitt adatot*/) {
    let output = document.createElement('DIV')
    output.classList.add('list__complete--item')
    output.innerHTML = `
    <i class="fa fa-check-square"></i>
    <p>${item}</p>
 `;
    completeList.appendChild(output);
};

/*ITEM ADDING*/
function itemAdder() {
    if (todoInput.value == '') {
        return
    } else {
        itemCounterText[0].style.display = 'block';
        completeBtn.style.display = 'inline';
        clearBtn.style.display = 'inline';
        addLocalCounter();
        hurray();
        createItem(todoInput.value);
        local.setLocalItem(localCounter, todoInput.value);
        plusCounter();
        clear = false
    }
    todoInput.value = '';
};

/*ITEM REMOVE*/
function itemRemover() {
    let close = document.querySelectorAll('.delete');
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = 'none';//Ezt még valahogy át kell dolgozni!!!
            //local.deleteOneLocalItem();
            minusLocalCounter()
            minusCounter();
        }
    }
};

/*COMPLETE LIST*/

function showHideComplete() {
    if (completeBtn.innerText == 'Show Complete') {
        completeList.style.display = 'flex';
        completeBtn.innerText = 'Hide Complete';
    } else {
        completeList.style.display = 'none';
        completeBtn.innerText = 'Show Complete';
    };
};

function addToCompleteList() {
    let checkbox = document.querySelectorAll('.checkbox');
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = 'none';//Ezt még valahogy át kell dolgozni!!!
            let item = div.innerText
            local.deleteOneLocalItem(item)
            createCompleteItem(item);
            minusCounter();
        }
    }
};

/*CLEAR ALL*/

function clearAll() {
    clear = true;
    let noTasksOutput = `<div class="no__tasks">
    <i class="fa fa-glass"></i>
    <p>Time to chill! You have no todos.!</p>
    </div>`
    todoList.innerHTML = noTasksOutput;
    itemCounter = 0;
    localCounter = 0;
    removeItems();
    local.deleteAllLocalItems();
};

function removeItems() {
    itemCounterText[0].style.display = 'none';
    completeList.style.display = 'none';
    completeBtn.style.display = 'none';
    clearBtn.style.display = 'none';
    completeBtn.innerText = 'Show Complete';
    completeList.innerHTML = '';
};

function hurray() {
    if (clear == true) {
        todoList.innerHTML = '';
    } else {
        return
    }
};

plusBtn.addEventListener('click', itemAdder);
completeBtn.addEventListener('click', showHideComplete);
clearBtn.addEventListener('click', clearAll);
