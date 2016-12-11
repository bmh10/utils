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

  var leftInput = document.getElementById("left-input");
  leftInput.addEventListener("focusout", function() {
    var leftVal = "10";
    var leftUnit = "cm";
    var rightVal = "20";
    var rightUnit = "m";
    convert(leftVal, leftUnit, rightVal, rightUnit);
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

var multipliers = {}
multipliers["m"]["cm"] = 100;

function convert(leftVal, leftUnit, rightVal, rightUnit)
{
  console.log("leftVal:" + leftVal + " leftUnit:" + leftUnit + " rightVal: " + rightVal + " rightUnit: " + rightUnit);
  var m = multipliers[leftUnit][rightUnit]; 
  rightVal = leftVal * m;
  leftVal = rightVal / m;
}
