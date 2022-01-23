async function loadCommits() {

    const username = document.getElementById('username').value;
    const repository = document.getElementById('repo').value;
    const list = document.getElementById('commits');


    const url = `https://api.github.com/repos/${username}/${repository}/commits`;


    try {
        const response = await fetch(url);

        if(response.ok == false) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        list.replaceChildren();

        for(let repo of data) {
            const liElement = document.createElement('li');
            liElement.innerText = `${repo.commit.author.name}: ${repo.commit.message}`;
            list.appendChild(liElement);
        }
    } catch (error) {
        list.replaceChildren();
        const liError = document.createElement('li');
        liError.innerText = `Error: ${error.message} (Not found)`;
        list.appendChild(liError);
    }
}
