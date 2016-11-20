var categories = {};

function init()
{
  categories = {
    'Length' : ["mm", "cm", "m", "km"],
    'Time' : [],
    'Volume' : [],
    'Currency' : []
  };
  initDropdowns();
  populateDropdown('category-dropdown', Object.keys(categories), 'category');

  var categoryElems = document.getElementsByClassName('category');
  for (var i = 0; i < categoryElems.length; i++)
  {
    assignOnClick(categoryElems, i);
  }
}

function assignOnClick(categoryElems, i)
{
  var catName = categoryElems[i].innerHTML; 
  categoryElems[i].onclick = function()
  {
    document.getElementById('selected-category').innerHTML = catName;
    populateDropdown('unit-dropdown', categories[catName], 'unit');
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
