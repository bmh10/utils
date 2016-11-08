var running = false;
var startTime = -1;
var savedTime = 0;
var targetHours = 0;
var targetMins = 1;
var timerDiv;
var timeElem;
var startStopBtn;
var resetBtn;
var incHoursBtn;
var decHoursBtn;
var incMinsBtn;
var decMinsBtn;

Number.prototype.mod = function(n) { return ((this%n)+n)%n; }

function initTimer()
{
  timerDiv = document.getElementById('timer');
  timeElem = document.getElementById('time');
  startStopBtn = document.getElementById('startStopBtn');
  resetBtn = document.getElementById('resetBtn');
  incHoursBtn = document.getElementById('incHours');
  decHoursBtn = document.getElementById('decHours');
  incMinsBtn = document.getElementById('incMinutes');
  decMinsBtn = document.getElementById('decMinutes');
  
  hold(incHoursBtn, function() { adjHours(1); });
  hold(decHoursBtn, function() { adjHours(-1); });
  hold(incMinsBtn, function() { adjMinutes(1); });
  hold(decMinsBtn, function() { adjMinutes(-1); });

  timerDiv.onmouseover = function() { if (!running) showArrows(true); };
  timerDiv.onmouseout = function() { showArrows(false); };
  showArrows(false);
  resetTimer();
  tick();
}

function showArrows(show)
{
  var vis = show ? "visible" : "hidden";
  incHoursBtn.style.visibility = vis;
  decHoursBtn.style.visibility = vis;
  incMinsBtn.style.visibility = vis;
  decMinsBtn.style.visibility = vis;
}

function adjHours(n)
{
  targetHours = (targetHours + n).mod(100);
  resetTimer();
}

function adjMinutes(n)
{
  targetMins = (targetMins + n).mod(60);
  resetTimer();
}

function resetTimer()
{
  timeElem.innerHTML = formatTime(targetHours, targetMins, 0, 0);
  resetBtn.style.visibility = "hidden";
  running = false;
  savedTime = 0;
}

function updateTimer()
{
  if (running)
  {
    running = false;
    savedTime += new Date().getTime() - startTime.getTime();
    startStopBtn.innerHTML = "Start";
    startStopBtn.className = "btn btn-success";
    resetBtn.style.visibility = "visible";
  }
  else
  {
    startTime = new Date();
    running = true;
    startStopBtn.innerHTML = "Stop";
    startStopBtn.className = "btn btn-danger";
    resetBtn.style.visibility = "hidden";
  }
}

function tick()
{
  if (running)
  {
    timeElem.innerHTML = calcTime();
  }

  setTimeout(tick, 1);
}

function calcTime()
{
  var now = new Date();
  var targetTime = targetHours*60*60*1000 + targetMins*60*1000;
  var ms = Math.max(0, targetTime - (now.getTime() - startTime.getTime() + savedTime));
  if (ms == 0)
  {
    completed();
  } 

  var ms_ = Math.floor((ms % 1000) / 10);
  var t = Math.floor(ms / 1000);
  var s = t % 60;
  t = Math.floor(t / 60);
  var m = t % 60;
  var h = Math.floor(t / 60); 
 
  return formatTime(h, m, s, ms_);
}

function completed()
{
  running = false;
  timeElem.style.color = 'red';
  var sound = new Audio('bleep.mp3');
  sound.loop = true;
  sound.play();
}

function formatTime(h, m, s, ms)
{
  return formatNum(h) + ":" +
         formatNum(m) + ":" + 
         formatNum(s) + "." +
         formatNum(ms);
}

function formatNum(n)
{
  return (n < 10) ? "0" + n : n;
}

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
