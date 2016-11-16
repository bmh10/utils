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
}

function assignOnClick(btns, i)
{
  var param = btns[i].innerHTML;
  btns[i].onclick = function() { calc(param); }
}

function calc(n)
{
  switch (n)
  {
    case '+': op = add; break;
    case '-': op = sub; break;
    case 'x': op = mul; break;
    case '/': op = div; break;
    case '=': 
      // TODO
      val = op(parseInt(val1), parseInt(val2)).toString();
      op = undefined;
      break;
    default:
      if (op === undefined)
      {
        val1 = trimZeros(val1 + n);
      }
      else
      {
        val2 = trimZeros(val2 + n);
      }
  }
  document.getElementById('solution').innerHTML = val;
}

function trimZeros(str)
{
  return parseInt(str).toString();
}

function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function div(a, b) { return a / b; }
function mul(a, b) { return a * b; }
