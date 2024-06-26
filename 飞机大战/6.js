var gameArea,gameAreaWidth,gameAreaHeight,myAirplane;
var posX,posY;

function gameStart() {
    var mask = document.querySelector('.mask');
    // console.log(mask);
    mask.style.display = 'none';
    var btn = document.querySelector('.btn');
    btn.style.display = 'none';
    game.statue = true;
    game.bulletFly();
}

window.onload=function () {
    gameArea=document.querySelector('.gameArea');
    // console.log(gameArea);
    gameAreaWidth = gameArea.offsetWidth;
    gameAreaHeight = gameArea.offsetHeight;
    // console.log(gameAreaWidth,gameAreaHeight);
    myAirplane=document.querySelector('.me');
    gameArea.onmousemove = function (event) {
        posX = event.offsetX;
        posY = event.offsetY;
        // console.log(posX, posY);
        if(game.statue){
            myAirObj.fly(posX,posY);
        }
    }
    gameArea.onmousedown = function () {
        if(game.statue){
            myAirObj.sendBullet(posX,posY);
        }
    }
}

var game={
    statue:false,
    bulletArray:[],
    bulletFlyTime:0,
    bulletFly:function () {
        game.bulletFlyTime = setInterval(function () {
            for(var i = 0 ;i<game.bulletArray.length;i++){
                game.bulletArray[i].fly();
            }
        },10)
    }
}
var myAirObj={
    fly:function (x,y) {
        if(x > 53 && x < gameAreaWidth - 53){
            myAirplane.style.left = x - 53 + 'px';
        }
        if(y > 38 && y < gameAreaHeight - 38){
            myAirplane.style.top =y -38 + 'px';
        }
    },
    sendBullet:function (left,top) {
        if(left>0&&left<53){
            this.left = 53
        }else if(left>gameAreaWidth - 53){
            this.left=gameAreaWidth - 58
        }else {
            this.left = left - 5;
        }
        if(top>gameAreaHeight - 76){
            this.top = gameAreaHeight - 76 - 35;
        }else{
            this.top = top - 38 - 35;
        }
        game.bulletArray.push(new Bullet(this.left,this.top));
        // console.log(game.bulletArray);
    }
}
var bulletId = 0;
function Bullet(left,top) {
    // this.id = 'bullet'+(bulletId++) % 10000;
    this.id = (bulletId++) % 10000;
    // console.log(this.id);
    this.left = left;
    this.top = top;
    var thisBullet = document.createElement('div');
    thisBullet.id = this.id;
    thisBullet.className = 'bullet';
    thisBullet.style.left = this.left + 'px';
    thisBullet.style.top = this.top + 'px';
    gameArea.appendChild(thisBullet);
}
Bullet.prototype.fly = function(){
    var thisBullet = document.getElementById(this.id);
    this.top -= 5;
    if(this.top>0){
        thisBullet.style.top = this.top + 'px';
    }else{
        this.disappear();
    }
}
Bullet.prototype.disappear = function(){
    var thisbullet = document.getElementById(this.id);
    gameArea.removeChild(thisbullet);
    for(var i=game.bulletArray.length-1;i>=0;i--){
        if(game.bulletArray[i]==this){
            game.bulletArray.splice(i,1);
        }
    }
}
