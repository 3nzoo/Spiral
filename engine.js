var canvasWidth = 640; 
var canvasHeight = 480;
var trackRight = 0; 
var trackLeft = 1; 
var x=0;
var y=340; 
var srcX; 
var srcY; 
var left = false; 
var right = true;
var speed = 12; 
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight; 

//Asset Manager
var character = new Image(); 
character.src = "mega.png";
character.sWidth = 864;
character.sHeight = 280;
character.rows = 2;
character.cols = 8;
character.width = character.sWidth/character.cols;
character.height = character.sHeight/character.rows;
character.curFrame = 0;
character.frameCount = 8;
character.tween = true;
character.tweenStart = false; 
character.tweenFrom = 0;
character.tweenTo = 100;

var backg = new Image();
backg.src = "background.png";
backg.width = 650;
backg.height = 650;
backg.scroll = true;
backg.x = 0;


function updateFrame(){
    srcX = character.curFrame * character.width; 
    ctx.clearRect(x,y,backg.width,backg.height);	
    if(left && x>character.tweenFrom){
        srcY = trackLeft * character.height; 
        if(character.tweenStart){
            //4.2 Animation tween
            x-=speed;           
            character.curFrame = ++character.curFrame % character.frameCount;
            console.log(x + 'left')
            if(x <= character.tweenFrom){
                character.tweenStart = false;
            }
        }
    }
    if(right && x<canvasWidth-character.tweenTo){
        srcY = trackRight * character.height; 
        if(character.tweenStart){
            x+=speed;
            character.curFrame = ++character.curFrame % character.frameCount;
            if( x >= canvasWidth - character.tweenTo){
                character.tweenStart = false;
                srcX = character.curFrame;
            }
        }
    }    
}

//2. Renderer
function draw(){
    updateFrame();
    ctx.drawImage(backg, backg.x, 0, backg.width, backg.height);
    
    // 4.1 Spritesheet 
    ctx.drawImage(character,srcX,srcY,character.width,character.height,x,y,character.width,character.height);
}

//5. Input Manager
document.addEventListener('keydown', (event) => {
    var keyName = event.key;
    console.log(keyName);
    keyName = keyName.toUpperCase();
    if(keyName == 'ARROWLEFT' || keyName == 'A' ){    
        left = true; 
        right = false; 
        if(x>character.tweenFrom)
        x-=speed;
        character.curFrame = ++character.curFrame % character.frameCount;
    }else if(keyName == 'ARROWRIGHT' || keyName == 'D'){
        left = false;
        right = true; 
        if(x<canvasWidth-character.tweenTo)
        x+=speed;
        character.curFrame = ++character.curFrame % character.frameCount;
    }else if(keyName == 'ARROWUP' || keyName == 'W'){
        // moveRight();
    }else if(keyName == 'ARROWDOWN' || keyName == 'S'){
        // moveRight();
    }else if(keyName == ' '|| keyName =='enter'){
        character.tweenStart = true
    }
});


//3. GameLoop
setInterval(draw,100);