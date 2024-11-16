document.addEventListener('DOMContentLoaded', function() {
    // Sorting the color options alphabetically
    const colorOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'White', 'Black', 'Brown'].sort();

    window.addPlayer = function() {
        const playerInputs = document.getElementById('playerInputs');
        const div = document.createElement('div');
        div.innerHTML = `
            Name: <input type="text" placeholder="Player Name">
            Color: <select>${colorOptions.map(color => `<option value="${color}">${color}</option>`).join('')}</select>
        `;
        playerInputs.appendChild(div);
    };

    document.getElementById('setupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        startGame();
    });

    function startGame() {
        const inputs = document.querySelectorAll('#playerInputs > div');
        players = Array.from(inputs).map(inputDiv => {
            return {
                name: inputDiv.querySelector('input').value,
                color: inputDiv.querySelector('select').value,
                score: 0
            };
        });
        localStorage.setItem('carCountGame', JSON.stringify(players));
        document.getElementById('setup').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        renderPlayers();
    }

function renderPlayers() {
    const playerContainer = document.getElementById('players');
    playerContainer.innerHTML = '';
    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.innerHTML = `
            <h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="${player.color.toLowerCase()}" class="bi bi-car-front" viewBox="0 0 16 16">
                <path d="M4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                <path d="M7 12.5c0-.276.224-.5.5-.5h1c.276 0 .5.224.5.5s-.224.5-.5.5h-1a.5.5 0 0 1-.5-.5zM3 6h10c.556 0 1.016.356 1.182.854l.557 1.67A1.5 1.5 0 0 1 14 11h-1v3a1 1 0 1 1-2 0v-1H5v1a1 1 0 1 1-2 0v-3H2a1.5 1.5 0 0 1-1.739-2.476l.557-1.67A1.18 1.18 0 0 1 2 6zm1.539-.945A.178.178 0 0 0 3.5 6h9c.12 0 .22.092.261.192l-.44 1.32A.5.5 0 0 1 12 8H4a.5.5 0 0 1-.321-.488l-.44-1.32c.041-.1.14-.192.26-.192.12 0 .22.092.261.192L4.82 7H5.5a.5.5 0 0 0 0-1h-3L3.46 5.055z"/>
            </svg> ${player.name} - ${player.color} Cars</h2>
            <button onclick="incrementScore(${index})">+1</button>
            <button onclick="decrementScore(${index})">-1</button>
            <p>Score: <span id="score-${index}">${player.score}</span></p>
        `;
        playerContainer.appendChild(playerDiv);
    });
}



    window.incrementScore = function(index) {
        players[index].score++;
        document.getElementById(`score-${index}`).textContent = players[index].score;
        localStorage.setItem('carCountGame', JSON.stringify(players));
    };

    window.decrementScore = function(index) {
        if (players[index].score > 0) {
            players[index].score--;
            document.getElementById(`score-${index}`).textContent = players[index].score;
        }
        localStorage.setItem('carCountGame', JSON.stringify(players));
    };

    window.resetScores = function() {
        players = players.map(player => ({ ...player, score: 0 }));
        localStorage.setItem('carCountGame', JSON.stringify(players));
        renderPlayers();
    };

    window.endGame = function() {
        document.getElementById('game').style.display = 'none';
        displaySummary();
    };

    function displaySummary() {
        const summaryContainer = document.getElementById('finalScores');
        summaryContainer.innerHTML = '';
        players.forEach(player => {
            const playerResult = document.createElement('p');
            playerResult.textContent = `${player.name} (${player.color}): ${player.score}`;
            summaryContainer.appendChild(playerResult);
        });
        document.getElementById('summary').style.display = 'block';
    }

    window.startNewGame = function() {
        document.getElementById('summary').style.display = 'none';
        document.getElementById('setup').style.display = 'block';
        const playerInputs = document.getElementById('playerInputs');
        playerInputs.innerHTML = ''; // Clear previous inputs
        addPlayer(); // Start with one new player input
    };

    // Initialize with one player input
    addPlayer();
});
