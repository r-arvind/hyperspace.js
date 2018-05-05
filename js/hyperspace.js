window.hyperspace = (function (parentid){

canvas = document.createElement('canvas');
context = canvas.getContext('2d');

var parent = document.getElementById(parentid);
var parentAttr = window.getComputedStyle(parent);

parent.style.backgroundColor = null;
canvas.height = parentAttr.getPropertyValue('height').slice(0,-2);
canvas.width = parentAttr.getPropertyValue('width').slice(0,-2);
canvas.style.position = 'absolute';
canvas.style.zIndex = -1;
context.shadowBlur = 1;
context.shadowColor = 'white';

var numStars = 200;
var stars=[];
var size = 1;
var fl = canvas.width/2;
var centerX = canvas.width/2;
var centerY = canvas.height/2;
var speed = 20;

for(var i=0;i<numStars;i++){
    stars[i] = new Star();
}

function Star(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.z = Math.random()*canvas.width;

    this.move = function(){
        this.z = this.z - speed;
        if(this.z <= 0){
            this.z = canvas.width;
        }
    }

    this.show = function(){
        var x,y,s;
        x = (this.x-centerX) * (fl/this.z);
        x = x + centerX;

        y = (this.y - centerY)*(fl/this.z);
        y = y + centerY;

        s = size* (fl/this.z);

        context.beginPath();
        context.fillStyle = 'white';
        context.strokeStyle="white";
        context.arc(x,y,s,0,Math.PI*2);
        context.lineTo(x,y);
        context.stroke();
        context.fill();
    }
}

function draw(){
    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.width,canvas.height);
    for(var i=0;i<numStars;i++){
        stars[i].show();
        stars[i].move();
    }
}

function update(){
    draw();
    window.requestAnimationFrame(update);
}

document.getElementById(parentid).appendChild(canvas)
update();

})