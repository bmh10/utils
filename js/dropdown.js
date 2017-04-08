function showDropdown(e)
{
  e = e || window.event;
  var evTarget = e.currentTarget || e.srcElement;
  evTarget.parentElement.classList.toggle('open');
  return false;
}

function closeDropdown(e)
{
  e = e || window.event;
  var evTarget = e.currentTarget || e.srcElement;
  evTarget.parentElement.classList.remove('open');
  
  // Trigger the click event on the target if it not opening another menu
  if (e.relatedTarget && e.relatedTarget.getAttribute('data-toggle') !== 'dropdown') {
      e.relatedTarget.click();
  }
  return false;
}

// Set event listeners for dropdown menus
function initDropdowns()
{
  var dropdownList = document.querySelectorAll('[data-toggle=dropdown]');
  for (var k = 0, dropdown, lenk = dropdownList.length; k < lenk; k++)
  {
    dropdown = dropdownList[k];
    dropdown.setAttribute('tabindex', '0'); // Fix to make onblur work in Chrome
    dropdown.onclick = showDropdown;
    dropdown.onblur = closeDropdown;
  }
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
