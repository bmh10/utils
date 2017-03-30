var counter = 0;
var counterElem;
var incCounterBtn;
var decCounterBtn;
var id = 0;

function init() {
  /*counterLabel = document.getElementById('counterLabel');
  counterLabel.innerHTML = 'My Counter';
  counterElem = document.getElementById('count');
  counterElem.innerHTML = counter;
  incCounterBtn = document.getElementById('incCounter');
  decCounterBtn = document.getElementById('decCounter');

  hold(incCounterBtn, function() { adjCounter(1);  });
  hold(decCounterBtn, function() { adjCounter(-1); }); */
}

function addCounter() {
  alert('Add counter');
  id++;
  document.getElementById('counters').innerHTML += 
      '<h6 id="counterLabel" class="noselect">Counter' + id + '</h6>' +
      '<div id="counter' + id + '">' +
      '  <div>' +
      '    <span id="incCounter' + id + '" class="arrow-up"></span>' +
      '  </div>' +
      '  <h1 id="count' + id + '" class="noselect">0</h1>' +
      '  <div>' +
      '    <span id="decCounter' + id + '" class="arrow-down"></span>' +
      '  </div>' +
      '</div>';

  hold(document.getElementById('incCounter' + id), function () {adjCounter(1);});
  hold(document.getElementById('decCounter' + id), function () {adjCounter(-1);});
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
