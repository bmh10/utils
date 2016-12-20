var conversionTable = 
                { 'Length' : 
                  [{'unit' : 'mile', 'mult' : 1        },
                   {'unit' : 'kilometer',   'mult' : 1.609344  },
                   {'unit' : 'meter',    'mult' : 1000     },
                   {'unit' : 'yard',    'mult' : 1.09361329834 },
                   {'unit' : 'feet',    'mult' : 3       },
                   {'unit' : 'inch',    'mult' : 12      },
                   {'unit' : 'centimeter',   'mult' : 2.54     } ,
                   {'unit' : 'millimeter',   'mult' : 10       }],
                  'Time' :
                  [{'unit' : 'century',     'mult' : 1  },
                   {'unit' : 'decade',      'mult' : 10 },
                   {'unit' : 'year',        'mult' : 10 },
                   {'unit' : 'month',       'mult' : 12 },
                   {'unit' : 'week',        'mult' : 52/12 },
                   {'unit' : 'day',         'mult' : 7 },
                   {'unit' : 'hour',        'mult' : 24 },
                   {'unit' : 'minute',      'mult' : 60 },
                   {'unit' : 'second',      'mult' : 60 },
                   {'unit' : 'millisecond', 'mult' : 1000 },
                   {'unit' : 'microsecond', 'mult' : 1000 },
                   {'unit' : 'nanosecond',  'mult' : 1000 }],
                  'Digital Storage' :
                  [{'unit' : 'Petabyte', 'mult' : 1    },
                   {'unit' : 'Terabyte', 'mult' : 1024 },
                   {'unit' : 'Gigabyte', 'mult' : 1024 },
                   {'unit' : 'Megabyte', 'mult' : 1024 },
                   {'unit' : 'Kilobyte', 'mult' : 1024 },
                   {'unit' : 'Byte',     'mult' : 1024 },
                   {'unit' : 'Bit',       'mult' : 8   }],
                  'Volume' : [],
                  'Currency' : []              
                };

function init()
{
  initDropdowns();
  populateDropdown('category-dropdown', Object.keys(conversionTable), 'category');
  initOnClick('category', function(selected) 
  {
      document.getElementById('left-unit').innerHTML = "&nbsp;";
      document.getElementById('right-unit').innerHTML = "&nbsp;";
      populateDropdown('unit-dropdown', conversionTable[selected].map((x) => x.unit), 'unit');
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
