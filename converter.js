var categories = {};

function init()
{
  categories = {
    'Length' : ["mm", "cm", "m", "km"],
    'Time' : ["ns", "ms", "s", "mins", "hours"],
    'Volume' : ["l", "ml"],
    'Currency' : ["£", "$"]
  };
  initDropdowns();
  populateDropdown('category-dropdown', Object.keys(categories), 'category');
  initOnClick('category', function(selected) 
  {
      populateDropdown('unit-dropdown', categories[selected], 'unit');
      initOnClick('unit', function(selected) {});
  });

  initConversionListener('left-input', 'left-unit', 'right-input', 'right-unit');
  initConversionListener('right-input', 'right-unit', 'left-input', 'left-unit');
}

function initConversionListener(srcInput, srcUnit, targetInput, targetUnit)
{
  var inputObj = document.getElementById(srcInput);
  inputObj.addEventListener('focusout', function() {
    var val = document.getElementById(srcInput).value;
    var unit = document.getElementById(srcUnit).innerHTML;
    var tUnit = document.getElementById(targetUnit).innerHTML;
    var tVal = convert(val, unit, tUnit);
    document.getElementById(targetInput).value = tVal;
   });
}

function initOnClick(clazz, func)
{
  var elems = document.getElementsByClassName(clazz);
  for (var i = 0; i < elems.length; i++)
  {
    elems[i].onclick = function()
    {
      var target = event.target || event.srcElement;
      var selected = target.innerHTML;
      target.parentElement.parentElement.parentElement.getElementsByClassName('selected-' + clazz)[0].innerHTML = selected;
      func(selected);
    }
  }
}

function populateDropdown(dropdownClass, items, clazz)
{
  var dropdowns = document.getElementsByClassName(dropdownClass);
  for (var n = 0; n < dropdowns.length; n++)
  {
    var dropdown = dropdowns[n];
    dropdown.innerHTML = "";
    for (var i = 0; i < items.length; i++)
    {
      dropdown.innerHTML +=
	'<li><a href="#" class="' + clazz  + '">' + items[i]  + '</a></li>';
    }
  }
}

var multipliers = { 'm' : 
                          { 'cm' : 100,
                            'mm' : 1000 
                          }
                  };

function convert(val, unit, targetUnit)
{
  console.log("val:"+val+" unit:"+unit+" tUnit:"+targetUnit);
  if (unit === targetUnit)
  {
    return val;
  }
 
  var lookup = multipliers[unit];
  if (lookup !== undefined)
  {
    return val * lookup[targetUnit];
  }
  
  return "";
}
