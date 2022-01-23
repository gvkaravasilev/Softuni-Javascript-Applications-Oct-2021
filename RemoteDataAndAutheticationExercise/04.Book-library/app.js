document.getElementById('loadBooks').addEventListener('click', getData);
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', createBook);
const url = 'http://localhost:3030/jsonstore/collections/books';

const tableBody = document.querySelector('tbody');

async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    tableBody.replaceChildren();


    
    Object.values(data).forEach(e => {
        tableBody.appendChild(createEntity(e));
    });

}

async function createBook(event) {

    event.preventDefault();
    const titleField = document.querySelector('input[name="title"]');
    const authorField = document.querySelector('input[name="author"]');

    const person = {
        author: authorField.value,
        title: titleField.value
    }

    if (titleField.value == '' || authorField.value == '') {
        return;
    } else {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(person)
            });

            if (response.ok == false) {
                throw new Error(`${res.message}`);
            }

            tableBody.appendChild(createEntity(person));
        } catch (error) {
            alert(error.message);
        }
    }
}

async function deleteBook(event) {
    console.log(event.target);
}



function createEntity(e) {
    const tr = document.createElement('tr');

    tr.innerHTML = `<td>${e.title}</td>
<td>${e.author}</td>
<td>
<button id = "editBtn">Edit</button>
<button id = "deleteBtn">Delete</button>
</td>`
    return tr;
}