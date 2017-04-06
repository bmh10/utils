function init() {
  var info = getIPInfo();
  document.getElementById('ip').innerHTML = info.ip;

}

function getIPInfo() {
    xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open("GET", "http://ipinfo.io/json", false);
    xmlhttp.send();

    return JSON.parse(xmlhttp.responseText);
}
