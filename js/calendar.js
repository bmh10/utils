function loadCalendar()
{
  var now = new Date();
  var firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  var lastDayOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 0);
  document.getElementById('date').innerHTML = firstDayOfMonth + "-" + lastDayOfMonth;

  console.log(firstDayOfMonth.getDay());
  var tr = document.getElementsByTagName('tr');

  // First row of calendar
  var day = 1;
  for (var i = 0; i < 7; i++) {
    if (i < firstDayOfMonth.getDay()) {
      tr[1].innerHTML += '<td></td>';
    } else {
      tr[1].innerHTML += '<td>' + (day++)  + '</td>'
    }
  }
}
