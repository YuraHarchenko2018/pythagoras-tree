var canvas = document.querySelector('#ctx')
var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';

var statusRosh = 1
var degr = 45

var length = 160

var baseX = 600
var baseY = 720

var lineX = 0
var lineY = 0

    function makeTree() {
        lineX = 600
        lineY = 500

        ctx.lineWidth = 4; // толщина линии
        ctx.moveTo(baseX, baseY); //передвигаем перо
        ctx.lineTo(lineX, lineY); //рисуем линию

        for (let i = 0; i < 10; i++) {
            createBranch('right')
        }

        ctx.moveTo(600, 500); //передвигаем перо
        lineX = 600
        degr = 45
        lineY = 500
        length = 160
        statusRosh = 1

        for (let i = 0; i < 10; i++) {
            createBranch('left')
        }

        ctx.stroke();
    }

makeTree()

function createBranch(directionStatus) {

    if(statusRosh == 4) {
        statusRosh = 1
    } else {
        //statusRosh++
    }
    
    degr -= 10
    // Angle in radians = Angle in degrees x PI / 180.
                    // 0.0174533
    let radian = degr * Math.PI / 180

    // if turn right
    let sin = Math.sin(radian)
    let cos = Math.cos(radian)
    let yLength = length * sin
    let xLength = length * cos

    if( directionStatus == 'right' ) {
        goRight(xLength, yLength)
    }
    if( directionStatus == 'left' ) {
        goLeft(xLength, yLength)
    }

    length = length / 2

    ctx.lineTo(lineX, lineY);
}


function goRight(xLength, yLength) {
    if(statusRosh == 1) {
        lineX += xLength
        lineY -= yLength
    }
    if(statusRosh == 2) {
        lineX += xLength
        lineY += yLength
    }
    if(statusRosh == 3) {
        lineX -= xLength
        lineY += yLength
    }
    if(statusRosh == 4) {
        lineX -= xLength
        lineY -= yLength
    }
}

function goLeft(xLength, yLength) {
    if(statusRosh == 1) {
        lineX -= xLength
        lineY -= yLength
    }
    if(statusRosh == 2) {
        lineX -= xLength
        lineY += yLength
    }
    if(statusRosh == 3) {
        lineX += xLength
        lineY += yLength
    }
    if(statusRosh == 4) {
        lineX += xLength
        lineY -= yLength
    }
}



// canvas.onmousemove = function(e) {
//     let x = e.layerX + getRandomInt(1, 10) - getRandomInt(1, 10)
//     let y = e.layerY + getRandomInt(1, 10) - getRandomInt(1, 10)

//     ctx.rect(x, y, 4, 4);
//     ctx.fill();
// }

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }