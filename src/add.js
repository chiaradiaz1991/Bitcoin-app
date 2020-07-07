const electron = require('electron');
const remote = electron.remote;
const closeButton = document.getElementById('closebutton');
const ipc = electron.ipcRenderer;

closeButton.addEventListener('click', function(event) {
  let win = remote.getCurrentWindow();
  win.close()
})

const updateBtn = document.getElementById('update-notify-value')

updateBtn.addEventListener('click', function (){
  ipc.send('update-notify-value', document.getElementById('notifyVal').value)

  let win = remote.getCurrentWindow;
  win.close();
})