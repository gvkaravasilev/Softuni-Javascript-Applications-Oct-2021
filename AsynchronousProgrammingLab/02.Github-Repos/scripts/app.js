function loadRepos() {
	const username = document.getElementById('username').value;
	const list = document.getElementById('repos');
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(res => {
			if (res.ok == false) {
				throw new Error(`${res.status} ${res.message}`);
			}
			return res.json();
		})
		.then(responseHandler)
		.catch(errorHandler);


	function responseHandler(data) {
		list.replaceChildren();
		for (let repo of data) {
			
			const liElement = document.createElement('li');

			liElement.innerHTML = `<a href="${repo.html_url}">
				${repo.full_name}
			</a>`
			list.appendChild(liElement);
		}
	}

	function errorHandler(error){
		list.replaceChildren();
		list.textContent = `${error.message}`;
	}
}