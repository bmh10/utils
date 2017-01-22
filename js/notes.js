
var msgs = {};
var id = 0;

function saveNote() {
  var noteContent = document.getElementById('note').value;
  if (noteContent === '') return;
  msgs[id] = noteContent;
  addNoteToSidebar(noteContent, id);
  id++;
  //createCookie("content", noteContent, 1);
}

function addNoteToSidebar(content, id) {
  var leftPanel = document.getElementById('left-panel');
  if (content.length > 20) {
    content = content.substring(0, 20) + "...";
  }
  leftPanel.innerHTML += '<div class="saved-note well" onclick=loadNote(' + id + ')>' + content + '</div>';
}

function loadNote(id) {
  var noteContent = msgs[id];
  document.getElementById('note').value = noteContent; //readCookie("content");
}


// Cookie functions

function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
