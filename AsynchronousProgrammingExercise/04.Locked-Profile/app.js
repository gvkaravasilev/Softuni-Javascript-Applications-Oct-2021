async function lockedProfile() {
    const url = `http://localhost:3030/jsonstore/advanced/profiles`;
    const mainSection = document.getElementById('main');
    let div;



    const response = await fetch(url);

    const data = await response.json();

    console.log(data);
    let id = 2;
    for (let element in data) {
        div = document.createElement('div');
        const name = data[element].username;
        const email = data[element].email;
        const age = data[element].age;
        div.className = "profile";

        console.log(name, email, age);
        div.innerHTML = `<img src="./iconProfile2.png" class="userIcon">
<label>Lock</label>
<input type="radio" name="user${id}Locked" value="lock" checked="">
<label>Unlock</label>
<input type="radio" name="user${id}Locked" value="unlock"><br>
<hr>
<label>Username</label>
<input type="text" name="user${id}Username" value="${name}" disabled readonly="">
<div id="user${id}HiddenFields">
<hr>
<label>Email:</label>
<input type="email" name="user${id}Email" value="${email}" disabled readonly="">
<label>Age:</label>
<input type="email" name="user${id}Age" value="${age}" disabled readonly="">
</div>
<button>Show more</button>`;

        div.querySelector('div').style.display = 'none';
        mainSection.appendChild(div);
        id++;
    }

    const buttons = Array.from(document.querySelectorAll('button'))
        .forEach(b => b.addEventListener('click', onToggle));
}

function onToggle(event) {
    const parentNode = event.target.parentNode;
    const div = parentNode.querySelector('div');
    const isActive = parentNode.querySelector('input[type="radio"][value = "unlock"]').checked;
    const btn = event.target;

    if (isActive) {
        if (btn.textContent == 'Show more') {
            btn.textContent = 'Hide it';
            div.style.display = 'block';
        }else{
            btn.textContent = 'Show more';
            div.style.display = 'none';
        }

    }
}