
function saveNote() {
  var content = document.getElementById('note').value;
  document.cookie = "content:" + content; 
}
