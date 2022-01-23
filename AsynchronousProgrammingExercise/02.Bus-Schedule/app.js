function solve() {

    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const busStopInfo = document.getElementsByClassName('info');
    let stop = {
        next: 'depot'
    }

    async function depart() {
        departBtn.disabled = true;
        arriveBtn.disabled = false;




        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        try {
            const response = await fetch(url);

            if (response.ok == false) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            busStopInfo[0].innerText = `Next stop ${data.name}`;
            stop = data;



        } catch (error) {
            busStopInfo[0].innerText = `Error`;
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }

    }

    function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;

        busStopInfo[0].innerText = `Arriving at ${stop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();