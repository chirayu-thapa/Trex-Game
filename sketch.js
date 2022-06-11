var play = 1;
var end = 0;
var gamestate = play;
var trex;
var trex_image;
var ground;
var ground_image;
var invisible_ground;
var cloud, cloudimage;
var ob1, ob2, ob3, ob4, ob5, ob6;
var obstaclegroup;
var obstacle;
var cloudgroup;
var trex_collision;
var gameover;
var restart;
var jumpsound;
var checkpointsound;
var diesound;
var score;
var gameover1;
var restart1;

function preload(){
  trex_image = loadAnimation("trex1.png","trex3.png","trex4.png"); 
  ground_image = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  trex_collision = loadAnimation("trex_collided.png")
  jumpsound = loadSound("jump.mp3");
  checkpointsound = loadSound("checkpoint.mp3");
  diesound = loadSound("die.mp3");
  gameover1 = loadImage("gameOver.png");
  restart1 = loadImage("restart.png");
}

function setup(){
 createCanvas(windowWidth,windowHeight);
 
trex = createSprite(80,height-100,50,50);
trex.addAnimation("running",trex_image);
trex.addAnimation("collision",trex_collision);

ground = createSprite(width/2-100,height-30,width,50);
ground.addImage(ground_image);

ground.x = width/2;

invisible_ground = createSprite(width/2,height-20,width,10);
invisible_ground.visible = false;

gameover = createSprite(width/2,height/2);
gameover.addImage(gameover1);

restart = createSprite(width/2,height/2+100);
restart.addImage(restart1);

restart.visible = false;
gameover.visible = false;

trex.scale = 0.5;

ground.x = ground.width/2;

obstaclegroup = new Group()
cloudgroup = new Group()

trex.setCollider("circle",0,0,40);

score = 0;
}

function draw(){
  background("grey");
  fill("white");
  text("score " + score,500,50);

  if(gamestate === play){
    trex.changeAnimation("running",trex_image);
    ground.velocityX = -8;

    if(ground.x <= 100){
      ground.x = ground.width/2
    }
  
    if (keyDown("space")&& trex.y >= 340){
      trex.velocityY = -6
      jumpsound.play();
    }
    score = score + Math.round(getFrameRate() / 50);

    if(score > 0 && score % 500 === 0){
      checkpointsound.play();
    }

    trex.velocityY = trex.velocityY + 0.8;
  
    cloudspawn();
    spawnobstacles();
    
    if(obstaclegroup.isTouching(trex)){
      gamestate = end;
      diesound.play();
    }
  }

  else if(gamestate === end){
    ground.velocityX = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    trex.changeAnimation("collision",trex_collision);
    gameover.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)){
      reset();
    }
  }
  trex.collide(invisible_ground);
  drawSprites();
}

function reset(){
  gamestate = play;
  restart.visible = false;
  gameover.visible = false;
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  score = 0;
}

function cloudspawn(){
  if(frameCount % 50 === 0){
    cloud = createSprite(width+10,height-300,20,20);
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -4;
    cloud.y = random(20,60);
    cloud.lifetime = 600;
    cloudgroup.add(cloud);
  }
}

function spawnobstacles(){
  if(frameCount % 70 === 0){
    obstacle = createSprite(width,height-45,20,20);
    obstacle.velocityX = -4;
    randomob = Math.floor(random(1,6))
    obstacle.lifetime = 600;
    obstaclegroup.add(obstacle);

    switch(randomob){
      case 1 : obstacle.addImage(ob1);
               obstacle.scale = 0.5;
      break;

      case 2 : obstacle.addImage(ob3);
               obstacle.scale = 0.5;
      break;

      case 3 : obstacle.addImage(ob3);
               obstacle.scale = 0.5;
      break;

      case 4 : obstacle.addImage(ob4);
               obstacle.scale = 0.5;
      break;

      case 5 : obstacle.addImage(ob5);
               obstacle.scale = 0.5;
      break;

      case 6 : obstacle.addImage(ob6);
               obstacle.scale = 0.5;
      break;

      default:
        break;
    }
  }
}