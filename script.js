'use strict';

// Elements selection

const display1El = document.querySelector('.display-1');
const display2El = document.querySelector('.display-2');
const tempResultEl = document.querySelector('.temp-result');
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
const equalEl = document.querySelector('.equal');
const clearAllEl = document.querySelector('.all-clear');
const clearLastEl = document.querySelector('.last-entity-clear');

// Variables

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

// Events

// Numbers and dot sign

numbersEl.forEach((number) => {
  number.addEventListener('click', (e) => {
    if (e.target.innerText === '.' && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === '.' && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    display2El.innerText = dis2Num;
  });
});

// Mathematical operations

operationEl.forEach((operation) => {
  operation.addEventListener('click', (e) => {
    if (!dis2Num) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      // We must change string to number

      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

function clearVar(name = '') {
  dis1Num += `${dis2Num} ${name} `;
  display1El.innerText = dis1Num;
  display2El.innerText = '';
  dis2Num = '';
  tempResultEl.innerText = result;
}

function mathOperation() {
  if (lastOperation === 'x') {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === '+') {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === '-') {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === '/') {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === '%') {
    result = parseFloat(result) % parseFloat(dis2Num);
  }
}

// Equal

equalEl.addEventListener('click', (e) => {
  if (!dis1Num || !dis2Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2El.innerText = result;
  tempResultEl.innerText = '';
  dis2Num = result;
  dis1Num = '';
});

// Clear buttons

clearAllEl.addEventListener('click', (e) => {
  display1El.innerText = '';
  display2El.innerText = '';
  dis1Num = '';
  dis2Num = '';
  result = '';
  tempResultEl.innerText = 0;
});

clearLastEl.addEventListener('click', (e) => {
  display2El.innerText = '';
  dis2Num = '';
});

// Usage of keyboard by pressing keys

window.addEventListener('keydown', (e) => {
  if (
    e.key === '0' ||
    e.key === '0' ||
    e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.'
  ) {
    clickButtonEl(e.key);
  } else if (e.key === '/' || e.key === '+' || e.key === '-' || e.key === '%') {
    clickOperation(e.key);
  } else if (e.key === '*') {
    clickOperation('x');
  } else if (e.key == 'Enter' || e.key == '=') {
    clickEqual();
  } else if (e.key == 'Backspace') {
    clearAll();
  } else if (e.key == 'Delete') {
    clearLast();
  }
});

function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operationEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickEqual() {
  equalEl.click();
}

function clearAll() {
  clearAllEl.click();
}

function clearLast() {
  clearLastEl.click();
}
