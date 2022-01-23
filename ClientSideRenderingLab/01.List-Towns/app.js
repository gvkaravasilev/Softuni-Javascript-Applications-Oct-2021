import {html, render} from './node_modules/lit-html/lit-html.js'; 

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const towns = document.getElementById('towns').value.split(',').map(town => town.trim());

    console.log(towns);

    const template = listTemplate(towns);
    const root = document.getElementById('root');

    render(template, root);
});


const listTemplate = (towns) => html`
<ul>
    ${towns.map(town => html`<li>${town}</li>`)}
</ul>`

