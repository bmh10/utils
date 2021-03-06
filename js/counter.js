var id = 0;

function init() {
  addCounter();
}

function addCounter() {
  if (id > 8) return;
  id++;
  document.getElementById('counters').insertAdjacentHTML('beforeend', 
      '<div id="counter' + id + '" style="margin: 0 25px 0 25px;">' +
      '  <input id="counterLabel" class="transparent-input noselect" placeholder="Counter' + id + '"></h6>' +
      '  <div>' +
      '    <span id="incCounter' + id + '" class="arrow-up"></span>' +
      '  </div>' +
      '  <h1 id="count' + id + '" class="noselect">0</h1>' +
      '  <div>' +
      '    <span id="decCounter' + id + '" class="arrow-down"></span>' +
      '  </div>' +
      '</div>');

  var counterElem = document.getElementById('count' + id);

  hold(document.getElementById('incCounter' + id), function () {adjCounter(counterElem, 1);});
  hold(document.getElementById('decCounter' + id), function () {adjCounter(counterElem, -1);});
}

function adjCounter(elem, n) {
  elem.innerHTML = parseInt(elem.innerHTML) + n; 
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
