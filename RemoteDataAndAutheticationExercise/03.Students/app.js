const url = 'http://localhost:3030/jsonstore/collections/students';
const form = document.getElementById('form');
const tableBody = document.querySelector('tbody');

form.addEventListener('submit', postData);

window.addEventListener('load', () => {
    loadData();
});

async function loadData() {

    const res = await fetch(url);
    const data = await res.json();


    Object.values(data).forEach(e => {
        tableBody.appendChild(createEntity(e));
    });
}

async function postData(event){
    event.preventDefault();
    
    
    const inputData = new FormData(form);
    const entries = [...inputData.entries()];
    const firstName = entries[0][1];
    const lastName = entries[1][1];
    const facultyNumber = entries[2][1];
    const grade = entries[3][1];

    const person = {firstName, lastName, facultyNumber, grade};

    if(firstName == '' || lastName == '' || facultyNumber == '' || grade == ''){
        return;
    }else{
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(person)
        });

        tableBody.appendChild(createEntity(person));
    }
    form.reset();
}

function createEntity(element) {
    const tr = document.createElement('tr');

    tr.innerHTML = `<th>${element.firstName}</th>
<th>${element.lastName}</th>
<th>${element.facultyNumber}</th>
<th>${element.grade}</th>`;
    return tr;
}

