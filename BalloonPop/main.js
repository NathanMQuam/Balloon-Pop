//#region GAME LOGIC AND DATA

// Data
let clickCount = 0;
let height = 140;
let width = 100;
let inflationRate = 20;
let maxSize = 340;
let highestPopCount = 0;
let currentPopCount = 0;
let gameLength = 10000;
let clockId = 0;
let timeRemaining = 0;
let currentPlayer = {};

// Balloon Colors
let currentColor = "red";
let possibleColors = ["red", "green", "blue", "orange", "magenta"];



function startGame () {
    document.getElementById( "game-controls" ).classList.remove( "hidden" );
    document.getElementById( "main-controls" ).classList.add( "hidden" );
    document.getElementById( "scoreboard" ).classList.add( "hidden" );
    startClock();
    setTimeout( stopGame, gameLength );
}



function startClock () {
    timeRemaining = gameLength;
    drawClock();
    clockId = setInterval( drawClock, 1000 );
}

function stopClock () {
    clearInterval( clockId );
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
    checkBalloonPop();

    draw();
}

function checkBalloonPop () {
    if ( height >= maxSize ) {
        console.log( "Balloon popped!" );
        currentPopCount++;
        height = 40;
        width = 20;

        let balloonElement = document.getElementById( "balloon" );
        // @ts-ignore
        document.getElementById( "pop-sound" ).play();

        balloonElement.classList.remove( currentColor );
        getRandomColor();
        balloonElement.classList.add( currentColor );
    }
}

function getRandomColor () {
    let i = Math.floor( Math.random() * possibleColors.length );
    currentColor = possibleColors[i];
}



function draw () {
    let balloonElement = document.getElementById( "balloon" );
    let clickCountElem = document.getElementById( "click-count" );
    let popCountElem = document.getElementById( "pop-count" );
    let highPopCountElem = document.getElementById( "high-pop-count" );
    let playerNameElem = document.getElementById( "player-name" );

    balloonElement.style.height = height + "px";
    balloonElement.style.width = width + "px";

    clickCountElem.innerText = clickCount.toString();
    popCountElem.innerText = currentPopCount.toString();
    highPopCountElem.innerText = currentPlayer.topScore;

    playerNameElem.innerText = currentPlayer.name;
}



function stopGame () {
    console.log( "The game is over" );

    document.getElementById( "game-controls" ).classList.add( "hidden" );
    document.getElementById( "main-controls" ).classList.remove( "hidden" );
    document.getElementById( "scoreboard" ).classList.remove( "hidden" );

    clickCount = 0;
    height = 140;
    width = 100;

    if ( currentPopCount > currentPlayer.topScore ) {
        currentPlayer.topScore = currentPopCount;
        savePlayers();
    }

    currentPopCount = 0;

    stopClock();
    draw();
}

//#endregion



//#region SAVING AND LOADER PLAYER DATA

let players = [
    {
        name: "Jake",
        topScore: 1
    }
];
loadPlayers();

function setPlayer ( event ) {
    event.preventDefault();
    let form = event.target;

    let playerName = form.playerName.value;

    currentPlayer = players.find( player => player.name == playerName );

    if ( !currentPlayer ) {
        currentPlayer = { name: playerName, topScore: 0 };
        players.push( currentPlayer );
        //console.log( "Player not found" );

        savePlayers();
    }

    console.log( currentPlayer );

    form.reset();
    document.getElementById( "game" ).classList.remove( "hidden" );
    form.classList.add( "hidden" );
    draw();
}

function changePlayer () {
    document.getElementById( "playerForm" ).classList.remove( "hidden" );
    document.getElementById( "game" ).classList.add( "hidden" );
}

function savePlayers () {
    window.localStorage.setItem( "players", JSON.stringify( players ) );
    //console.log(JSON.stringify( players ));
    //console.log( "added players to localstorage" );
}

function loadPlayers () {
    let playersData = JSON.parse( window.localStorage.getItem( "players" ) );

    if ( playersData ) {
        players = playersData;
    }
}
//#endregion