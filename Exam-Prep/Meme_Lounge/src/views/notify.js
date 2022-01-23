const element = document.getElementById('errorBox');
const output = element.querySelector('span');

function notify(message) {
    output.textContent = message;
    element.style.display = 'block';
}

window.notify = notify;


