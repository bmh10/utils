
var msgs = localStorage;
var keyPrefix = "util";
var id = localStorage.length;
var noteCount = 0;

function init() {
  for (key in localStorage) {
    if (key.startsWith(keyPrefix)) {    
      addNoteToSidebar(localStorage[key], key.replace(keyPrefix, ''));
    }
  }
}

function saveNote() {
  var noteContent = document.getElementById('note').value;
  if (noteContent === '') return;
  msgs[keyPrefix + id] = noteContent;
  addNoteToSidebar(noteContent, id);
  id++;
  //createCookie("content", noteContent, 1);
}

function addNoteToSidebar(content, id) {
  var leftPanel = document.getElementById('left-panel');
  if (content.length > 20) {
    content = content.substring(0, 20) + "...";
  }
  leftPanel.innerHTML += '<div id="note-' + id + '" class="saved-note well" onclick=loadNote(' + id + ')><button type="button" class="close" onclick=deleteNote(' + id + ')>&times;</button>' + content + '</div>';
  noteCount++;
  updateSidebarVisibility();
}

function loadNote(id) {
  var noteContent = msgs[keyPrefix + id];
  if (noteContent) {
    document.getElementById('note').value = noteContent; //readCookie("content");
  }
}

function deleteNote(id) {
  var note = document.getElementById("note-" + id);
  note.parentNode.removeChild(note);
  delete msgs[keyPrefix + id];
  noteCount--;
  updateSidebarVisibility();
  document.getElementById('note').value = "";
}

function updateSidebarVisibility() {
  var leftPanel = document.getElementById('left-panel');
  if (noteCount == 0) {
     leftPanel.classList.add('hidden');
  } else {
     leftPanel.classList.remove('hidden');
  }
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
