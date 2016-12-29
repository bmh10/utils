function loadCalendar()
{
  var now = new Date();
  var firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  var lastDayOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 0);
  document.getElementById('date').innerHTML = firstDayOfMonth + "-" + lastDayOfMonth;

  console.log(firstDayOfMonth.getDay());
  var table = document.getElementById('calendar');

  // First row of calendar
  var day = 1;
  var h = '<tr><td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thur</td><td>Fri</td><td>Sat</td></tr><tr>';

  for (var i = 0; i < 7; i++) {
    if (i < firstDayOfMonth.getDay()) {
      h += '<td></td>';
    } else {
      h += '<td>' + (day++)  + '</td>'
    }
  }
  
  h += '</tr>';
  table.innerHTML = h;
}
