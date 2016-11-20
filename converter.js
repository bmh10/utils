
function init()
{
  var categories = ["Length", "Time", "Volume", "Currency"];
  initDropdowns();
  populateDropdown('category-dropdown', categories, 'category');

  var categories = document.getElementsByClassName('category');
  for (var i = 0; i < categories.length; i++)
  {
    assignOnClick(categories, i);
  }

}

function assignOnClick(categories, i)
{
  var catName = categories[i].innerHTML; 
  categories[i].onclick = function()
  {
    document.getElementById('selected-category').innerHTML = catName;
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
