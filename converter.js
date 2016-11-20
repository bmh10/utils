var categories = {};

function init()
{
  categories = {
    'Length' : ["mm", "cm", "m", "km"],
    'Time' : ["ns", "ms", "s", "mins", "hours"],
    'Volume' : [],
    'Currency' : ["£", "$"]
  };
  initDropdowns();
  populateDropdown('category-dropdown', Object.keys(categories), 'category');
  initOnClick('category', function(selected) 
  {
      populateDropdown('unit-dropdown', categories[selected], 'unit');
      initOnClick('unit', function(selected) {});
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
      document.getElementById('selected-' + clazz).innerHTML = selected;
      func(selected);
    }
  }
}

function populateDropdown(dropdownId, items, clazz)
{
  var dropdown = document.getElementById(dropdownId);
  dropdown.innerHTML = "";
  for (var i = 0; i < items.length; i++)
  {
    dropdown.innerHTML +=
      '<li><a href="#" class="' + clazz  + '">' + items[i]  + '</a></li>';
  }
}
