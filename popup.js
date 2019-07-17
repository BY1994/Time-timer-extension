function drawClock(){
    // background
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
    var button = document.getElementById('button');

    ctx.translate(radius, radius);
    radius = radius * 0.90

    // initialize
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);

    // onclick event
    button.onclick = function(){

        var setTimer = setInterval(function(){
            // reset background
            drawFace(ctx, radius);

            // fill red area
            var time1 = document.getElementById("current_time1");
            var time2 = document.getElementById("current_time2");
            var current_time = time1.value * 60 + Number(time2.value);

            current_time -= 1
            time1.value = parseInt(current_time/60);
            time2.value = current_time % 60;

            // stop setInterval()
            if (current_time <= 0){
                clearInterval(setTimer);
            }

            ctx.beginPath();
            ctx.moveTo(0,0)
            ctx.arc(0, 0, radius*0.7, (Math.PI/180)*270 - (Math.PI/180)*(current_time/10), (Math.PI/180)*270);
            ctx.closePath();
            ctx.fillStyle = "red";
            ctx.fill();

            // face
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
            ctx.fillStyle = '#333';
            ctx.fill();

            // hand
            second = Math.PI*2 - (Math.PI/180)*(current_time/10);
            drawHand(ctx, second, radius*0.6, radius*0.02);

        }, 1000);

    }
}

function drawFace(ctx, radius){
    // clock
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.7, 0 , 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    // draw face
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius){
    // numbers
    var ang;
    var num;
    ctx.font = radius * 0.12 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        var minnum = 60 - 5 * num;
        ctx.fillText(minnum.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

// time
function drawTime(ctx, radius){
    drawHand(ctx, 0, radius*0.6, radius*0.02);
}

// hand
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

window.onload = drawClock;