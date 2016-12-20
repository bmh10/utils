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

  // TODO refactor
  initConversionListener('left-input', 'left-input', 'left-unit', 'right-input', 'right-unit');
  initConversionListener('right-input', 'right-input', 'right-unit', 'left-input', 'left-unit');
 
  initConversionListener('left-dropdown', 'left-input', 'left-unit', 'right-input', 'right-unit');
  //initConversionListener('right-dropdown', 'right-input', 'right-unit', 'left-input', 'left-unit');
}

function initConversionListener(listenerObj, srcInput, srcUnit, targetInput, targetUnit)
{
  var inputObj = document.getElementById(listenerObj);
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

var distMults = [{'unit' : 'km', 'mult' : 1    },
                 {'unit' : 'm',  'mult' : 1000 },
                 {'unit' : 'cm', 'mult' : 100  },
                 {'unit' : 'mm', 'mult' : 10   }];

function convert(val, unit, targetUnit)
{
  console.log("val:"+val+" unit:"+unit+" tUnit:"+targetUnit);
  var m = getMultiplier(unit, targetUnit);
  if (m === 0)
  {
    m = 1 / getMultiplier(targetUnit, unit);
  }

  return m * val;
}

function getMultiplier(unit, targetUnit)
{
  var mult = 1;
  var s = false;

  if (unit === targetUnit) return 1;

  for (var i = 0; i < distMults.length; i++)
  {
    var d = distMults[i];
    if (s)
    {
      mult *= d.mult;
      if (d.unit === targetUnit)
      {
        return mult;
      }
    }

    if (d.unit === unit) s = true;
  }

  return 0;
}
