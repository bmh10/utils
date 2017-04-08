var conversionTable = 
                { 'Length' : 
                  [{'unit' : 'mile', 'mult' : 1        },
                   {'unit' : 'kilometre',   'mult' : 1.609344  },
                   {'unit' : 'metre',    'mult' : 1000     },
                   {'unit' : 'yard',    'mult' : 1.09361329834 },
                   {'unit' : 'feet',    'mult' : 3       },
                   {'unit' : 'inch',    'mult' : 12      },
                   {'unit' : 'centimetre',   'mult' : 2.54     } ,
                   {'unit' : 'millimetre',   'mult' : 10       }],
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
                  [{'unit' : 'petabyte', 'mult' : 1    },
                   {'unit' : 'terabyte', 'mult' : 1024 },
                   {'unit' : 'gigabyte', 'mult' : 1024 },
                   {'unit' : 'megabyte', 'mult' : 1024 },
                   {'unit' : 'kilobyte', 'mult' : 1024 },
                   {'unit' : 'byte',     'mult' : 1024 },
                   {'unit' : 'bit',       'mult' : 8   }],
                  'Mass' :
                  [{'unit' : 'imperial tonne', 'mult' : 1       },
                   {'unit' : 'tonne',          'mult' : 1.01605 },
                   {'unit' : 'US ton',         'mult' : 1.10231 },
                   {'unit' : 'stone',          'mult' : 142.857 },
                   {'unit' : 'kilogram',       'mult' : 6.35029 },
                   {'unit' : 'pound',          'mult' : 2.20462 },
                   {'unit' : 'ounce',          'mult' : 16      },
                   {'unit' : 'gram',           'mult' : 28.3495 },
                   {'unit' : 'milligram',      'mult' : 1000    },
                   {'unit' : 'microgram',      'mult' : 1000    }],
                  'Temperature' :
                  [{'unit' : 'celsius',    'mult' : 0 },
                   {'unit' : 'fahrenheit', 'mult' : 0 },
                   {'unit' : 'kelvin',     'mult' : 0 }],
                  'Speed' :
                  [{'unit' : 'metre per second',   'mult' : 1 },
                   {'unit' : 'knot',               'mult' : 1.94384 },
                   {'unit' : 'miles per hour',     'mult' : 1.15078 },
                   {'unit' : 'foot per second',    'mult' : 1.46667 },
                   {'unit' : 'kilometre per hour', 'mult' : 1.09728 }],
                  'Pressure' : 
                  [{'unit' : 'atmosphere', 'mult' : 1 },
                   {'unit' : 'bar',        'mult' : 1.01325 },
                   {'unit' : 'torr',       'mult' : 750.062 },
                   {'unit' : 'pascal',     'mult' : 133.322 }],
                  'Area' : 
                   [{'unit' : 'square mile', 'mult' : 1 },
                   {'unit' : 'square kilometer', 'mult' : 2.58999 },
                   {'unit' : 'hectare', 'mult' : 100 },
                   {'unit' : 'acre', 'mult' : 2.47105 },
                   {'unit' : 'square meter', 'mult' : 4046.86 },
                   {'unit' : 'square yard', 'mult' : 1.19599 },
                   {'unit' : 'square foot', 'mult' : 9 },
                   {'unit' : 'square inch', 'mult' : 144 }],
                  'Currency' : []              
                };

var tempFuncs = {'celsius' : 
                  {'fahrenheit' : c => (c * (9/5)) + 32,
                   'kelvin'     : c => c + 273.15},
                'fahrenheit' :
                  {'celsius' : f => (f - 32) * (5/9),
                   'kelvin'  : f => (f - 32) * (5/9) + 273.15},
                'kelvin' :
                  {'celsius'    : k => k - 273.15,
                   'fahrenheit' : k => (k - 273.15) * (5/9) + 32}};

function init()
{
  initDropdowns();
  populateDropdown('category-dropdown', Object.keys(conversionTable), 'category');
  initOnClick('category', function(selected) 
  {
      enableUnitClickHandlers(true);
      var units = conversionTable[selected].map((x) => x.unit); 
      document.getElementById('left-unit').innerHTML = units[0];
      document.getElementById('right-unit').innerHTML = units[1];
      populateDropdown('unit-dropdown', units, 'unit');
      initOnClick('unit', function(selected) {});
  });

  // TODO refactor
  initConversionListener('left-input', 'left-input', 'left-unit', 'right-input', 'right-unit');
  initConversionListener('right-input', 'right-input', 'right-unit', 'left-input', 'left-unit');
 
  initConversionListener('left-dropdown', 'left-input', 'left-unit', 'right-input', 'right-unit');
  initConversionListener('right-dropdown', 'left-input', 'left-unit', 'right-input', 'right-unit');
  
  enableUnitClickHandlers(false);
}

function enableUnitClickHandlers(enabled)
{
  var s = enabled ? 'auto' : 'none';
  document.getElementById('unit-row').style['pointer-events'] = s;
}

function initConversionListener(listenerObj, srcInput, srcUnit, targetInput, targetUnit)
{
  var inputObj = document.getElementById(listenerObj);
  inputObj.addEventListener('keyup', function() {
    var val = document.getElementById(srcInput).value;
    var unit = document.getElementById(srcUnit).innerHTML;
    var tUnit = document.getElementById(targetUnit).innerHTML;
    var category = document.getElementById('category').innerHTML;
    var tVal = convert(val, unit, tUnit, category);
    document.getElementById(targetInput).value = tVal;
   });
}

function convert(val, unit, targetUnit, category)
{
  console.log("cat:"+category+" val:"+val+" unit:"+unit+" tUnit:"+targetUnit);
  if (category === "Temperature")
  {
    return convertTemperature(Number(val), unit, targetUnit);
  }

  var m = getMultiplier(unit, targetUnit, category);
  if (m === 0)
  {
    m = 1 / getMultiplier(targetUnit, unit, category);
  }

  var converted = m * val;
  return formatResult(converted);
}

function convertTemperature(t, unit, targetUnit)
{
  if (unit === targetUnit) return t;
  try {
    var converted = tempFuncs[unit][targetUnit](t);
    return formatResult(converted);
  }
  catch (err) {}
}

function formatResult(val)
{
  return val % 1 == 0 ? val : val.toFixed(3);
}

function getMultiplier(unit, targetUnit, category)
{
  var mult = 1;
  var startMult = false;

  if (unit === targetUnit) return 1;

  var arr = conversionTable[category];
  for (var i = 0; i < arr.length; i++)
  {
    var d = arr[i];
    if (startMult)
    {
      mult *= d.mult;
      if (d.unit === targetUnit)
      {
        return mult;
      }
    }

    if (d.unit === unit) startMult = true;
  }

  return 0;
}
