function updateTime()
{
  var now = new Date();
  document.getElementById('time').innerHTML = formatTime(now);
  document.getElementById('date').innerHTML = formatDate(now);
  setTimeout(updateTime, 1000);
}

function formatTime(now)
{
  return formatNum(now.getHours()) + ":" +
         formatNum(now.getMinutes()) + ":" + 
         formatNum(now.getSeconds());
}

function formatDate(now)
{
  return formatNum(now.getDate()) + "/" +
         formatNum(now.getMonth()+1) + "/" + 
         now.getFullYear();
}
