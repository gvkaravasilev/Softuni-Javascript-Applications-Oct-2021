async function solution() {
    const url = "http://localhost:3030/jsonstore/advanced/articles/list";
    const mainSection = document.querySelector('#main');

    const res = await fetch(url);
    

    if (res.ok == false) {
        console.log(res.status);
    }
    const data = await res.json();

    for (let element in data) {
        let  { title, _id } = data[element];
        id = _id;
        mainSection.appendChild(createElement(title, _id));
    }

    const buttons = Array.from(document.querySelectorAll('button'))
        .forEach(b => b.addEventListener('click', onShow));
}

async function onShow(event) {
    const id = event.target.id;
    const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;

    const res = await fetch(url);
    
    if(res.ok == false) {
        console.log(res.status);
    }
    
    const data = await res.json();
    const btn = event.target

    const extraDiv =  document.querySelector('.extra');
    extraDiv.innerHTML = `<p>${data.content}</p>`;

    if(btn.textContent == 'More'){
        extraDiv.style.display = 'block';
        btn.textContent = 'Less';
    }else{
        extraDiv.style.display = 'none';
        btn.textContent = 'More';
    }

}


function createElement(title, _id) {
    const div = document.createElement('div');
    div.className = 'accordion';

    div.innerHTML = `<div class="head">
<span>${title}</span>
<button class="button" id="${_id}">More</button>
</div>
<div class = "extra">
</div>`;

    return div;
}

window.addEventListener('load', () => {
    solution();
});

