const socket = io('ws://localhost:3000');
socket.on('connect', (text) => {
    console.log("siemthing went from here")
   const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el);
})

socket.on('message', (msg) => {
    const el = document.createElement('li');
    el.textContent = msg;
    document.querySelector('ul').appendChild(el);
});

document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value;
    socket.emit('message', text);
}