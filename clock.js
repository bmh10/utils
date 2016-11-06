function updateTime()
{
  var now = new Date();
  var h = now.getHours()
  var m = now.getMinutes();
  var s = now.getSeconds();

  document.getElementById('time').innerHTML = formatTime(h, m, s)
  
  setTimeout(updateTime, 1000);
}

function formatTime(h, m, s)
{
  return formatNum(h) + ":" + formatNum(m) + ":" + formatNum(s);
}

function formatNum(n)
{
  return (n < 10) ? "0" + n : n;
}
