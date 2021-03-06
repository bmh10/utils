var val1 = 0;
var val2 = 0;
var op;

function init()
{
  var btns = document.getElementsByClassName('calc-btn');
  for (var i = 0; i < btns.length; i++)
  {
    assignOnClick(btns, i);
  }

  document.onkeypress = function(e) {
    e = e || window.event;
    var key = e.key;
    if (key === 'Delete') reset();
    if (key === 'Enter') key = '=';
    calc(key);
  }
}

function assignOnClick(btns, i)
{
  var param = btns[i].innerHTML;
  btns[i].onclick = function() { calc(param); }
}

function reset()
{
  val1 = 0;
  val2 = 0;
  op = undefined;
  show(val1);
}

function calc(n)
{
  switch (n)
  {
    case '+': op = add; break;
    case '-': op = sub; break;
    case '*': op = mul; break;
    case '/': op = div; break;
    case '=': 
      val1 = trim(op(parseFloat(val1), parseFloat(val2))).toString();
      show(val1);
      val2 = 0;
      op = undefined;
      break;
    default:
      if (op === undefined)
      {
        val1 = appendAndTrimZeros(val1, n);
        show(val1);
      }
      else
      {
        val2 = appendAndTrimZeros(val2, n);
        show(val2);
      }
  }
}

function show(n)
{
  document.getElementById('solution').innerHTML = n;
}

function trim(n)
{
  return parseFloat(n.toFixed(4));
}

function appendAndTrimZeros(str, n)
{ 
  if (n === '.' && !str.includes('.')) return str + ".";
  return parseFloat(str + n).toString();
}

function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function div(a, b) { return a / b; }
function mul(a, b) { return a * b; }
