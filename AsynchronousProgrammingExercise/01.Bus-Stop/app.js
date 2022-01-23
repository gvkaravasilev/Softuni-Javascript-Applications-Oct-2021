async function getInfo() {
    const stopId = document.getElementById('stopId').value;
    const stopNameDiv = document.getElementById('stopName');
    const busesList = document.getElementById('buses');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        const response = await fetch(url);

        if(response.ok == false) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        busesList.replaceChildren();

        stopNameDiv.innerText = data.name;

        for(let bus in data.buses){
            let liElement = document.createElement('li');

            liElement.innerText = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
            busesList.appendChild(liElement);
        }
    } catch (error) {
        busesList.replaceChildren();
        stopNameDiv.innerText = `Error`;
    }
}


