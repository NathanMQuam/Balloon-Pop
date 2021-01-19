let startButton = document.getElementById( "start-button" );
let inflateButton = document.getElementById( "inflate-button" );

let clickCount = 0;
let height = 140;
let width = 100;
let inflationRate = 20;
let maxSize = 340;
let popCount = 0;

function startGame () {
    startButton.setAttribute( "disabled", "true" );
    inflateButton.removeAttribute( "disabled" );

    setTimeout(stopGame(), 3000 );
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

        draw();
}