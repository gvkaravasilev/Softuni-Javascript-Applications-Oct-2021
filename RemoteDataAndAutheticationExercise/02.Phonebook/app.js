function attachEvents() {
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    loadBtn.addEventListener('click', loadData);
    createBtn.addEventListener('click', postData);
}
const list = document.getElementById('phonebook');

async function loadData() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    let data;
    list.replaceChildren();

    try {
        const res = await fetch(url);

        if (res.ok == false) {
            throw new Error(`${res.status}`);
        }

        data = await res.json();


        Object.values(data).forEach(e => {
            const liElement = document.createElement('li');
            liElement.innerHTML = `${e.person}: ${e.phone}<button class = "data" id = "${e._id}">Delete</button>`;
            list.appendChild(liElement);
        });

        const buttons = document.querySelectorAll('.data')
            .forEach(b => b.addEventListener('click', deleteData));

    } catch (error) {
        alert(error.message);
    }
}
async function deleteData(event) {
    const id = event.target.id;
    const url = 'http://localhost:3030/jsonstore/phonebook/' + id;

    const res = await fetch(url, {
        method: 'DELETE'
    });

    event.target.parentElement.remove();
}

async function postData() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            person: personInput.value,
            phone: phoneInput.value
        })
    });
    const result = await res.json();
    
    const [person, phone, id] = Object.values(result);
    const liElement = document.createElement('li');
    liElement.innerHTML = `${person}: ${phone}<button class = "data" id = "${id}">Delete</button>`;
    list.appendChild(liElement);

    personInput.value = '';
    phoneInput.value = ''

}

attachEvents();