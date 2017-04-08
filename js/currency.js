function init() {
  initDropdowns();
  var info = getCurrencyInfo();
  var currencies = Object.keys(info.rates);
  populateDropdown('currency-dropdown', currencies, 'currency');
  initOnClick('currency', function(selected) {})
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

// TODO: duplicates from converter.js
function initOnClick(clazz, func)
{
  var elems = document.getElementsByClassName(clazz);
  for (var i = 0; i < elems.length; i++) {
    elems[i].onclick = function() {
      var target = event.target || event.srcElement;
      var selected = target.innerHTML;
      target.parentElement.parentElement.parentElement.getElementsByClassName('selected-' + clazz)[0].innerHTML = selected;
      func(selected);
    }
  }
}

