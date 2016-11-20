function init()
{
  initDropdowns();

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

