var categories = {};

function init()
{
  categories = {
    'Length' : ["mile", "km", "m", "yd", "cm", "mm"],
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
  initConversionListener('right-dropdown', 'left-input', 'left-unit', 'right-input', 'right-unit');
}

function initConversionListener(listenerObj, srcInput, srcUnit, targetInput, targetUnit)
{
  var inputObj = document.getElementById(listenerObj);
  inputObj.addEventListener('focusout', function() {
    var val = document.getElementById(srcInput).value;
    var unit = document.getElementById(srcUnit).innerHTML;
    var tUnit = document.getElementById(targetUnit).innerHTML;
    var category = document.getElementById('category').innerHTML;
    var tVal = convert(val, unit, tUnit, category);
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

var conversionTable = 
                { 'Length' : 
                  [{'unit' : 'mile', 'mult' : 1        },
                   {'unit' : 'km',   'mult' : 1.60934  },
                   {'unit' : 'm',    'mult' : 1000     },
                   {'unit' : 'yd',    'mult' : 1.09361 },
                   {'unit' : 'cm',   'mult' : 91.44    } ,
                   {'unit' : 'mm',   'mult' : 10       }],
                  'Time' :
                  [{'unit' : 'hours', 'mult' : 1  },
                   {'unit' : 'mins',  'mult' : 60 },
                   {'unit' : 's',     'mult' : 60 },
                   {'unit' : 'ms',    'mult' : 1000 },
                   {'unit' : 'ns',    'mult' : 1000000 }]
                };

function convert(val, unit, targetUnit, category)
{
  console.log("cat:"+category+" val:"+val+" unit:"+unit+" tUnit:"+targetUnit);
  var m = getMultiplier(unit, targetUnit, category);
  if (m === 0)
  {
    m = 1 / getMultiplier(targetUnit, unit, category);
  }

  return m * val;
}

function getMultiplier(unit, targetUnit, category)
{
  var mult = 1;
  var s = false;

  if (unit === targetUnit) return 1;

  var arr = conversionTable[category];
  for (var i = 0; i < arr.length; i++)
  {
    var d = arr[i];
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
