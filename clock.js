function updateTime()
{
  var now = new Date();
  document.getElementById('time').innerHTML 
    = formatTime(now.getHours(), now.getMinutes(), now.getSeconds());
  document.getElementById('date').innerHTML = formatDate(now);
  setTimeout(updateTime, 1000);
}
