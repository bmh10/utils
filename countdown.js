var running = false;
var startTime = -1;
var savedTime = 0;
var targetHours = 0;
var targetMins = 30;
var timeElem;
var startStopBtn;
var resetBtn;

Number.prototype.mod = function(n) { return ((this%n)+n)%n; }

function initTimer()
{
  timeElem = document.getElementById('time');
  startStopBtn = document.getElementById('startStopBtn');
  resetBtn = document.getElementById('resetBtn');
  resetTimer();
  tick();
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
  var ms = targetTime - (now.getTime() - startTime.getTime() + savedTime);
  var ms_ = Math.floor((ms % 1000) / 10);
  var t = Math.floor(ms / 1000);
  var s = t % 60;
  t = Math.floor(t / 60);
  var m = t % 60;
  var h = Math.floor(t / 60); 
 
  return formatTime(h, m, s, ms_);
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
