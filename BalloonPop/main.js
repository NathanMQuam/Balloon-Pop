let startButton = document.getElementById( "start-button" );
let inflateButton = document.getElementById( "inflate-button" );

//#region GAME LOGIC AND DATA

// Data
let clickCount = 0;
let height = 140;
let width = 100;
let inflationRate = 20;
let maxSize = 340;
let highestPopCount = 0;
let currentPopCount = 0;
let gameLength = 5000;
let clockId = 0;
let timeRemaining = 0;



function startGame () {
    startButton.setAttribute( "disabled", "true" );
    inflateButton.removeAttribute( "disabled" );
    startClock();
    setTimeout(stopGame, gameLength );
}



function startClock () {
    timeRemaining = gameLength;
    drawClock();
    clockId = setInterval( drawClock, 1000 );
}

function stopClock () {
    clearInterval( clockId );
    // Not sure why, but my displayed "time remaining" never draws 0 unless I drawClock() here
    drawClock();
}

function drawClock () {
    let countdownElem = document.getElementById( "countdown" );
    countdownElem.innerText = ( timeRemaining / 1000 ).toString();
    timeRemaining -= 1000;
}



function inflate () {
    clickCount++;

    height += inflationRate;
    width += inflationRate;
    
    if ( height >= maxSize ) {
        console.log( "Balloon popped!" );
        currentPopCount++;
        height = 40;
        width = 20;
    }
    draw();
}



function draw () {
    let balloonElement = document.getElementById( "balloon" );
    let clickCountElem = document.getElementById( "click-count" );
    let popCountElem = document.getElementById( "pop-count" );
    let highPopCountElem = document.getElementById( "high-pop-count" );
    
    balloonElement.style.height = height + "px";
    balloonElement.style.width = width + "px";
    
    clickCountElem.innerText = clickCount.toString();
    popCountElem.innerText = currentPopCount.toString();
    highPopCountElem.innerText = highestPopCount.toString();
}



function stopGame () {
    console.log( "The game is over" );

    inflateButton.setAttribute( "disabled", "true" );
    startButton.removeAttribute( "disabled" );

    clickCount = 0;
    height = 140;
    width = 100;

    if ( currentPopCount > highestPopCount ) {
        highestPopCount = currentPopCount;
    }
    
    currentPopCount = 0;

    stopClock();
    draw();
}

//#endregion



let players = [
    {
        name: "Jake",
        topScore: 1
    }
];

function setPlayer (event) {
    event.preventDefault();
    let form = event.target;

    let playerName = form.playerName.value;

    let currentPlayer = players.find( player => player.name == playerName );

    if ( !currentPlayer ) {
        currentPlayer = { name: playerName, topScore: 0 };
    }

    console.log( currentPlayer );

    form.reset();
}

function savePlayers () {
    window.localStorage.setItem( "players", JSON.stringify( players ) );
}

function loadPlayers () {
    let playersData = JSON.parse( window.localStorage.getItem( "players" ) );
    
    if ( playersData ) {
        players = playersData;
    }
}