var trex, trex_running;
var edges;
var ground, groundImage;
var invisibleGround ;
var r;
var cloud, cloudImage;
var obstacle;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score =0;
var cloudGroup, obstacleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImage;
var trexCollided;
var gameOverImage, gameOver;
var jumpSound, dieSound, checkPointSound;
var trexJump;


function preload(){
  trex_running =
  loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImage = loadImage("ground2.png");  
  cloudImage = loadImage("cloud.png");
    obstacle1 = loadImage( "obstacle1.png");
    obstacle2 = loadImage( "obstacle2.png");
    obstacle3 = loadImage( "obstacle3.png");
    obstacle4 = loadImage( "obstacle4.png");
    obstacle5 = loadImage( "obstacle5.png");
    obstacle6 = loadImage( "obstacle6.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  trexCollided = loadAnimation("trex_collided.png");
   jumpSound = loadSound("jump.mp3"); 
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  trexJump = loadAnimation ("trex1.png");
}

function setup (){
  createCanvas(600,200);
  
  //  creates trex sprite
  trex = createSprite(50,160,10,50);
  trex.addAnimation("trex_running",trex_running);  
  trex.addAnimation("trex_collided",trexCollided);
  trex.addAnimation("trex_jump",trexJump);
  trex.scale = 0.5;
  //trex.debug = true;
  //trex.setCollider("circle",0,0,40);
  
  edges = createEdgeSprites();
  restart = createSprite(300,140,10,10);
  restart.addImage("restart", restartImage);
  restart.scale = 0.5;
  
  gameOver = createSprite(300,100,10,10);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;
  
  //creates ground sprite
  ground = createSprite(300,180,600,20);
  ground.addImage ("ground",groundImage)
  
  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  
  obstacleGroup = new Group();
  
}

function draw(){
background("BLACK");
  
 // frameRate(70);

  //console.log(frameRate());
  //displays score
  text(" score:" + score,500,50);
  
  if(gameState === PLAY ){
  score=score+ Math.round( frameRate()/60);  
    
    trex.changeAnimation ("trex_running")
    
    // makes trex jump
  if((keyDown("space")||keyDown("up")) && trex.y >= 162){
    trex.velocityY = -10;
    
    jumpSound.play();
    
    
  }
    
    if(trex.y<161.5){
      trex.changeAnimation("trex_jump");
      
    }
     //gives gravity to trex
  trex.velocityY = trex.velocityY + 0.5
  
  ground.velocityX = -(2+score/100);
  
  // reset ground
  if(ground.x < 0){
  ground.x = ground.width/2;
  } 
    
    
  // to add sound at regular checkpoints
    if(score % 100=== 0 && score>0){
      checkPointSound.play();
      
    }    
  spawnClouds();
  spawnObstacles();
    
    //to check when trex collides with obstacles
   if(obstacleGroup.isTouching(trex)){
    gameState = END;
     dieSound.play();
    // trex.velocityY = -10;
   //jumpSound.play();
   }
  }
  else if(gameState === END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);     
   trex.changeAnimation("trex_collided"); 
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)){
       reset();       
       }
    
  } 
 
  drawSprites();
  
  //console.log(frameCount); 
  
  
  
  trex.collide(invisibleGround);
  
  
 
  
}
function reset(){
  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();
  gameState = PLAY;
  restart.visible = false
  gameOver.visible = false
  score = 0;
}


function spawnClouds(){ 
  if(frameCount % 60 ===0)
    { 
       cloud = createSprite(600,100,10,10);
      cloud.addImage ( "cloud",cloudImage);
      cloud.velocityX = -3;
      cloud.y = Math.round (random(40, 120));
      cloud.scale = 0.75;
      
      console.log(trex.depth);
      cloud.depth = trex.depth;
      trex.depth = trex.depth + 1 ;
      
      cloud.lifetime = 220;
      
      cloudGroup.add(cloud);
      
      
      
    }
}

function spawnObstacles(){
 if(frameCount % 80 === 0 ) 
   { obstacle = createSprite  (600,165,20,20);
    obstacle.velocityX = -(6+score/100);
    r = Math.round(random(1,6))
    switch(r){ 
        case 1: obstacle.addImage( obstacle1);
        break;
         case 2: obstacle.addImage( obstacle2);
        break;
         case 3: obstacle.addImage( obstacle3);
        break;
         case 4: obstacle.addImage( obstacle4);
        break;
         case 5: obstacle.addImage( obstacle5);
        break;
         case 6: obstacle.addImage( obstacle6);
        break;
        
        default:break;
    }
     
    obstacle.scale = 0.5 ;
    obstacle.lifetime = 120 ; 
   obstacleGroup.add(obstacle);
   
   } 
  
}