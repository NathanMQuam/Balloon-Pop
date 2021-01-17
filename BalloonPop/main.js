let clickCount = 0;
let height = 120;
let width = 100;
let inflationRate = 20;
let maxSize = 340;

function inflate () {
    clickCount++;

    let balloonElement = document.getElementById( "balloon" );
    height += inflationRate;
    width += inflationRate;
    
    if ( height >= maxSize ) {
        console.log( "Balloon popped!" );
        height = 40;
        width = 20;
    }

    balloonElement.style.height = height + "px";
    balloonElement.style.width = width + "px";

    let clickCountElem = document.getElementById( "click-count" );
    clickCountElem.innerText = clickCount.toString();
}