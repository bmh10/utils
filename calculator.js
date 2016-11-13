function init()
{
  var btns = document.getElementsByClassName('calc-btn');
  for (var i = 0; i < btns.length; i++)
  {
    assignOnClick(btns, i);
  }
}

function assignOnClick(btns, i)
{
  var param = btns[i].innerHTML;
  console.log(param)
  btns[i].onclick = function() { calc(param); }
}

function calc(n)
{
  console.log(n);
  document.getElementById('solution').innerHTML = n;
}
