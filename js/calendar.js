var currDate;
var shownDate;

function init()
{
  currDate = new Date();
  shownDate = currDate;
  loadCalendar(shownDate);

  var leftArrow = document.getElementById('decMonth');
  var rightArrow = document.getElementById('incMonth');
  leftArrow.onclick = function() {
    shownDate = new Date(shownDate.getFullYear(), shownDate.getMonth()-1, 1);
    loadCalendar(shownDate);
  };
  rightArrow.onclick = function() {
    shownDate = new Date(shownDate.getFullYear(), shownDate.getMonth()+1, 1);
    loadCalendar(shownDate);
  };
}

function loadCalendar(now)
{
  var firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  var lastDayOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 0);
  var options = { month: "long", year: "numeric" };
  document.getElementById('month').innerHTML = now.toLocaleDateString('en-GB', options);

  var table = document.getElementById('calendar');

  var h = '<tr><td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thur</td><td>Fri</td><td>Sat</td></tr><tr>';

  var highlightToday = currDate.getFullYear() == now.getFullYear() && currDate.getMonth() == now.getMonth();  

  for (var i = 0; i < firstDayOfMonth.getDay() + lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()); i++) {
    if (i % 7 == 0) {
      h += '</tr><tr>';
    }
    if (i < firstDayOfMonth.getDay() || 
        i > firstDayOfMonth.getDay() + lastDayOfMonth.getDate()) {
      h += '<td></td>';
    } else {
      var date = i - firstDayOfMonth.getDay() + 1;
      var col = (highlightToday && date == currDate.getDate()) ? "red" : "white";
      h += '<td style="color:' + col + '">' + date + '</td>';
    }
  }
  
  h += '</tr>';
  table.innerHTML = h;
}
