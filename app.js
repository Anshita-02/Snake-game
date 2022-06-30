 const end = document.querySelector(".end-game")
 const gameOver = document.querySelector(".end-game p");
 const refreshBtn = document.querySelector(".refresh")
 const cvs = document.getElementById('snake');
 const ctx = cvs.getContext('2d');

 //create box unit
 const box = 32;

 //load images

 //bg image
 const ground = new Image();
 ground.src = 'img/ground.png';

 //food img
 const foodImg = new Image();
 foodImg.src = 'img/food.png';

//load audio;
let dead = new Audio();
let up = new Audio();
let down = new Audio();
let right = new Audio();
let left = new Audio();
let eat = new Audio();

dead.src = 'audio/dead.mp3';
up.src = 'audio/up.mp3';
down.src = 'audio/down.mp3';
right.src = 'audio/right.mp3';
left.src = 'audio/left.mp3';
eat.src = 'audio/eat.mp3';

 //create the snake
 //snake is created using an array which holds all its locations of boxes
 let snake = [];
 //we will initialise snake 1st position
 snake[0] = {
    x : 9*box,
    y : 10*box
 };

 //create food
 //food will always have a random position
 let food = {
    x:Math.floor(Math.random()*17+1)*box,// 680/32=19 and 1 box on each side for wall
    y:Math.floor(Math.random()*15+3)*box//3 boxes are there on top wall and 1 on down wall

 }

 //create score variable 
 let score = 0;

//to control snake movement
let d;

document.addEventListener('keydown',direction);

function direction(event){
    if(event.keyCode==37 && d!='RIGHT'){
        d='LEFT';
        left.play();
    }
    else if(event.keyCode==38 && d!='DOWN'){ 
        d='UP';
        up.play();
    }
    else if(event.keyCode==39 && d!='LEFT'){
        d='RIGHT';
        right.play();
    }
    else if(event.keyCode==40 && d!='UP'){
        d='DOWN';
        down.play();
    }
}

//check collision function
function collisionHead(head,array){
    for(let i=0;i<array.length;i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        } 
    }
    return false;
}

 //to draw everything we use draw function
 function draw(){
            ctx.drawImage(ground,0,0);

            for(let i=0;i<snake.length;i++){
                ctx.fillStyle = (i==0)?'green':'white';
                ctx.fillRect(snake[i].x, snake[i].y, box,box);

                ctx.strokeStyle= 'red';
                ctx.strokeRect(snake[i].x, snake[i].y, box,box);
            }

            ctx.drawImage(foodImg,food.x,food.y);

            //old head position
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;
        
            //which direction
            if(d=='LEFT') {snakeX -=box; }
            if(d=='UP') {snakeY -=box;}
            if(d=='RIGHT') {snakeX +=box;}
            if(d=='DOWN') {snakeY +=box;}
        
            //if snake eats the food we need to increase score and create new food
            if(snakeX==food.x && snakeY==food.y){
                eat.play();
                score++;
                food = {
                    x:Math.floor(Math.random()*17+1)*box,// 680/32=19 and 1 box on each side for wall
                    y:Math.floor(Math.random()*15+3)*box//3 boxes are there on top wall and 1 on down wall
                
                }//if snake ate the food no need to remove it tail we will simply add a new head
            }else{
                    //remove the tail
                    snake.pop();

            }
 
            //add new head
            let newHead = {
                x:snakeX,
                y:snakeY
            }

            //game over
            if(snakeX<box || snakeX>17*box || snakeY<3*box || snakeY> 17*box || collisionHead(newHead , snake)){
                clearInterval(game); //clear interval jo h wo set interval ke time ko clear kr deti h usse ab mera 
                //draw function har 100 ms pr call nhi hoga
                dead.play();
                end.style.display = "block";
                gameOver.innerHTML = "GAME OVER☹ <br><br>SCORE:" + score;
                refreshBtn.addEventListener('click',function(){
                    window.location.reload();//this helps in reloading the page
                })
            }
            
            snake.unshift(newHead);
        
            ctx.fillStyle = 'white';
            ctx.font = '45px Changa one';
            ctx.fillText(score, 2*box , 1.6*box);

    }

 //call raw function every 200 ms
 let game = setInterval(draw,200);