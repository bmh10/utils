function init() {
  initDropdowns();
  var info = getCurrencyInfo();
  var currencies = Object.keys(info.rates);
  populateDropdown('unit-dropdown', currencies, 'unit');
  initOnClick('unit', function(selected) {})
}

function getCurrencyInfo() {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "http://api.fixer.io/latest?base=GBP", false);
  xmlhttp.send();
  return JSON.parse(xmlhttp.responseText);
}

