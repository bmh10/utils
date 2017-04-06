function init() {
  document.getElementById('ip').innerHTML = getIP();

}

function getIP() {
    xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open("GET", "http://ipinfo.io/json", false);
    xmlhttp.send();

    return xmlhttp.responseText;
}
