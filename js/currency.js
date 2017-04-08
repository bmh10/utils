function init() {
  initDropdowns();
  var info = getCurrencyInfo();
  var currencies = Object.keys(info.rates);
  document.getElementById('info').innerHTML = JSON.stringify(info.rates);
  populateDropdown('currency-dropdown', currencies, 'currency');
}

function getCurrencyInfo() {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "http://api.fixer.io/latest?base=GBP", false);
  xmlhttp.send();
  return JSON.parse(xmlhttp.responseText);
}


// TODO: duplicated from converter.js
function populateDropdown(dropdownClass, items, clazz) {
  var dropdowns = document.getElementsByClassName(dropdownClass);
  for (var n = 0; n < dropdowns.length; n++) {   
     var dropdown = dropdowns[n];
     dropdown.innerHTML = "";
     for (var i = 0; i < items.length; i++) {
       dropdown.innerHTML +=
         '<li><a href="#" class="' + clazz  + '">' + items[i]  + '</a></li>';        
     }
  }
}

