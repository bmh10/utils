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
