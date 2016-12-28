function loadCalendar()
{
  var now = new Date();
  var firstDayOfMonth = new Date(now.getYear(), now.getMonth(), 1);
  var first
  var lastDayOfMonth = new Date(now.getYear(), now.getMonth()+1, 0);
  document.getElementById('date').innerHTML = firstDayOfMonth + "-" + lastDayOfMonth;

  var tr = document.getElementsByTagName('tr');
  tr[1].innerHTML = '<tr>1</tr>'
}
