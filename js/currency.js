function init() {
  initDropdowns();
  var info = getCurrencyInfo();
  var currencies = Object.keys(info.rates);
  populateDropdown('unit-dropdown', currencies, 'unit');
  initOnClick('unit', function(selected) {})

  
  // TODO refactor - copied from converter.js
  initConversionListener('left-input', 'left-input', 'left-unit', 'right-input', 'right-unit');
  initConversionListener('right-input', 'right-input', 'right-unit', 'left-input', 'left-unit');
 
  initConversionListener('left-dropdown', 'left-input', 'left-unit', 'right-input', 'right-unit');
  initConversionListener('right-dropdown', 'left-input', 'left-unit', 'right-input', 'right-unit');
}

function getCurrencyInfo() {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "http://api.fixer.io/latest?base=GBP", false);
  xmlhttp.send();
  return JSON.parse(xmlhttp.responseText);
}

// TODO: almost same as in conversion.js
function initConversionListener(listenerObj, srcInput, srcUnit, targetInput, targetUnit)
{
  var inputObj = document.getElementById(listenerObj);
  inputObj.addEventListener('keyup', function() {
    var val = document.getElementById(srcInput).value;
    var unit = document.getElementById(srcUnit).innerHTML;
    var tUnit = document.getElementById(targetUnit).innerHTML;
    var tVal = 1; //convert(val, unit, tUnit, category);
    document.getElementById(targetInput).value = tVal;
   });
}
