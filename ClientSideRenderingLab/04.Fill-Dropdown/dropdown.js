import { html, render } from './node_modules/lit-html/lit-html.js';





const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

const selectTemplate = (items) => html`
<select id="menu">
    ${items.map(item => html`<option value=${item._id}>${item.text}</option>`)}
</select>`;

const root = document.querySelector('div');
document.querySelector('form').addEventListener('submit', addItem);
getData();

async function getData (){
    const response = await fetch(url);
    const data = await response.json();

    update(Object.values(data));
}

function update(items) {
    const result = selectTemplate(items);
    render(result, root);
}

async function addItem(event){
    event.preventDefault();
    const text = document.getElementById('itemText').value;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text})
    });

    if(response.ok){
        getData();
    }
}