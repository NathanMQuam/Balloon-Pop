let clickCount = 0;

function inflate () {
    clickCount++;

    var balloonElement = document.getElementById( "balloon" );
    balloonElement.style.height = "400px";
    balloonElement.style.width = "300px";

    var clickCountElem = document.getElementById( "click-count" );
    clickCountElem.innerText = clickCount.toString();
}