function init() {
  var info = getIPInfo();
  document.getElementById('ip').innerHTML = info.ip;
  document.getElementById('location').innerHTML = 
    info.city + ', ' + info.region + ', ' + info.country;
  document.getElementById('map').href = 'https://www.google.co.uk/maps/place/' + info.loc;
}

function getIPInfo() {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "http://ipinfo.io/json", false);
  xmlhttp.send();
  return JSON.parse(xmlhttp.responseText);
}
