var feedbackTypes = ["General", "Bug Report", "Feature Request"];

function init()
{
  initDropdowns();
  populateDropdown('category-dropdown', feedbackTypes, 'category');
  initOnClick('category', function(selected) {
    var feedbackTextarea = document.getElementById('feedback');
    var submitBtn = document.getElementById('submit-feedback');
    feedbackTextarea.classList.remove("hidden");
    submitBtn.classList.remove("hidden");
  });
}

function submitFeedback()
{
  alert('Feedback submitted');
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

// TODO: duplicates from converter.js
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
