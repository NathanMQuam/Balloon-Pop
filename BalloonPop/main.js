let startButton = document.getElementById( "start-button" );
let inflateButton = document.getElementById( "inflate-button" );

// Data
let clickCount = 0;
let height = 140;
let width = 100;
let inflationRate = 20;
let maxSize = 340;
let popCount = 0;
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
        popCount++;
        height = 40;
        width = 20;
    }
    draw();
}



function draw () {
    let balloonElement = document.getElementById( "balloon" );
    let clickCountElem = document.getElementById( "click-count" );
    let popCountElem = document.getElementById( "pop-count" );
    
    balloonElement.style.height = height + "px";
    balloonElement.style.width = width + "px";
    
    clickCountElem.innerText = clickCount.toString();
    popCountElem.innerText = popCount.toString();
}



function stopGame () {
    console.log( "The game is over" );

    inflateButton.setAttribute( "disabled", "true" );
    startButton.removeAttribute( "disabled" );

    clickCount = 0;
    height = 140;
    width = 100;

    stopClock();
    draw();
}