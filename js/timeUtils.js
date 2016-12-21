function formatTime(h, m, s, ms)
{
  var ms_ = ms === undefined ? "" : "." + formatNum(ms);
  return formatNum(h) + ":" +
         formatNum(m) + ":" + 
         formatNum(s) + 
         ms_;
}

function formatDate(now)
{
  return formatNum(now.getDate()) + "/" +
         formatNum(now.getMonth()+1) + "/" + 
         now.getFullYear();
}

function formatNum(n)
{
  return (n < 10) ? "0" + n : n;
}
