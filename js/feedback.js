var feedbackTypes = ["General", "Bug Report", "Feature Request"];

function init()
{
  initDropdowns();
  populateDropdown('category-dropdown', feedbackTypes, 'category');

}

// TODO: duplicated from converter.js
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
