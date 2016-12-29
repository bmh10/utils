function loadCalendar()
{
  var now = new Date();
  var firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  var lastDayOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 0);
  document.getElementById('date').innerHTML = firstDayOfMonth + "-" + lastDayOfMonth;

  console.log(firstDayOfMonth.getDay());
  var table = document.getElementById('calendar');

  var h = '<tr><td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thur</td><td>Fri</td><td>Sat</td></tr><tr>';

  for (var i = 0; i < firstDayOfMonth.getDay() + lastDayOfMonth.getDate(); i++) {
    if (i % 7 == 0) {
      h += '</tr><tr>';
    }
    if (i < firstDayOfMonth.getDay()) {
      h += '<td></td>';
    } else {
      var date = i - firstDayOfMonth.getDay() + 1;
      var col = (date == now.getDate()) ? "red" : "white";
      h += '<td style="color:' + col + '">' + date + '</td>';
    }
  }
  
  h += '</tr>';
  table.innerHTML = h;
}
