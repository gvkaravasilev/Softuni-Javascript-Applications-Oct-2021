function attachEvents() {
    document.querySelector('input[value="Send"]').addEventListener('click', onCreate);
    document.querySelector('input[value="Refresh"]').addEventListener('click', displayMessages);
}

async function onCreate() {
    const [name, message] = document.querySelectorAll('input');
    const url = 'http://localhost:3030/jsonstore/messenger';

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            author: name.value.trim(),
            content: message.value.trim()
        })
    });

    name.value = '';
    message.value = '';
}

async function displayMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const textArea = document.getElementById('messages');

    const res = await fetch(url);
    const data = await res.json();

    textArea.value = Object.values(data)
        .map(e => `${e.author}: ${e.content}`)
        .join('\n');
}

attachEvents();