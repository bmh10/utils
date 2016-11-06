var running = false;
var startTime = -1;
var savedTime = 0;

function initTime()
{
  document.getElementById('time').innerHTML = formatTime(0, 0, 0, 0);
  tick();
}

function updateTimer()
{
  var btn1 = document.getElementById('btn1');
  if (running)
  {
    running = false;
    savedTime += new Date().getTime() - startTime.getTime();
    btn1.innerHTML = "Start";
    btn1.className = "btn btn-success";
  }
  else
  {
    startTime = new Date();
    running = true;
    btn1.innerHTML = "Stop";
    btn1.className = "btn btn-danger";
  }
}

function tick()
{
  if (running)
  {
    document.getElementById('time').innerHTML = calcTime();
  }

  setTimeout(tick, 1);
}

function calcTime()
{
  var now = new Date();
  var ms = now.getTime() - startTime.getTime() + savedTime;
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
