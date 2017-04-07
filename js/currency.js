function init() {
  var info = getCurrencyInfo();
  document.getElementById('info').innerHTML = JSON.stringify(info.rates);
}

function getCurrencyInfo() {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "http://api.fixer.io/latest?base=GBP", false);
  xmlhttp.send();
  return JSON.parse(xmlhttp.responseText);
}
