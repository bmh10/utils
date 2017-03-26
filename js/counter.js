var counter = 0;
var counterElem;
var incCounterBtn;
var decCounterBtn;

function init() {
  counterElem = document.getElementById('count');
  counterElem.innerHTML = counter;
  incCounterBtn = document.getElementById('incCounter');
  decCounterBtn = document.getElementById('decCounter');

  hold(incCounterBtn, function() { adjCounter(1);  });
  hold(decCounterBtn, function() { adjCounter(-1); });
}

function addCounter() {
  alert('Add counter');
}

function adjCounter(n) {
  counter += n;
  counterElem.innerHTML = counter; 
}

// TODO: same as in countdown.js - extract
function hold(btn, action) {
    var t;
    var repeat = function () {
        action();
        t = setTimeout(repeat, start);
        if (start > 100)
        {
          start = start * 0.6;
        }
    }

    btn.onmousedown = function() {
        start = 500;
        repeat();
    }

    btn.onmouseup = function () {
        clearTimeout(t);
    }
}
