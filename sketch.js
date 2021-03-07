// add variables
var path,pathImg;
var mainCyclist, mainRacerImg1,mainRacerImg2,endMainRacer;
var enemy1, endEnemy1;
var enemy2, endEnemy2;
var enemy3, endEnemy3;

var obstacles1,obstacles2,obstacles3;

var OP1G, OP2G, OP3G, OBG;

var gameEndS,gameEnd;

var bell;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
 //load images and animations
pathImg = loadImage("Road.png");
mainRacerImg1=loadAnimation("mainPlayer1.png","mainPlayer2.png");
mainRacerImg2=loadAnimation("mainPlayer3.png");
endMainRacer=loadImage("mainPlayer3.png");
enemy1=loadAnimation("opponent4.png","opponent5.png");
enemy2=loadAnimation("opponent1.png","opponent2.png");
enemy3=loadAnimation("opponent7.png","opponent8.png");
endEnemy1=loadImage("opponent6.png");
endEmemy2=loadImage("opponent3.png");
endEmemy3=loadImage("opponent9.png");
obstacles1=loadImage("obstacle1.png");
obstacles2=loadImage("obstacle2.png");
obstacles3=loadImage("obstacle3.png");
gameEnd=loadImage("gameOver.png");
bell=loadSound("bell.mp3");
                         
  
}

function setup(){
  
  createCanvas(500,300);

  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;
  
  gameEndS=createSprite(250,150,10,10);
  gameEndS.addImage(gameEnd);
  gameEndS.scale=0.5;
  
  // add groups
  OP1G= new Group();
  OP2G= new Group();
  OP3G = new Group();
  OBG= new Group();

  mainCyclist.debug = true;
  mainCyclist.setCollider("circle",0,0,40);
  
}

function draw() {
  background(0);
  
  if(gameState===PLAY){
  
    gameEndS.visible = false;
    
    
   distance= distance + Math.round(getFrameRate()/60); 
    
   mainCyclist.y = World.mouseY;
   
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
  
  //code to reset the background
  if(path.x < 20 ){
    path.x = width/2;
    }
    
    spawnOP1();
    spawnOP2();
    spawnOP3();
    
    if(keyDown("space")){
      bell.play();
    }
    
    if(distance>200){
      spawnOB();
    }
    
    if(OBG.isTouching(mainCyclist)||OP1G.isTouching(mainCyclist)||OP2G.isTouching(mainCyclist)||OP3G.isTouching(mainCyclist)){
      gameState=END;
    }
    if(gameState===END){
      gameEndS.visible = true;
      End();
      //mainCyclist.changeAnimation(endMainRacer);
      if(keyDown("t")){
        reset();
      }
    }
  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
}

function spawnOP1(){
  if (World.frameCount % 140 === 0) {
  var OP1 = createSprite(600,Math.round(random(15,285),10,10));
  OP1.addAnimation("h",enemy1);
  OP1.scale=0.07;
  OP1.velocityX =-(8+distance/100);
  OP1.lifetime = 150;
  OP1G.add(OP1);
  }
}

function spawnOP2(){
  if(World.frameCount % 120 === 0){
  var OP2 =createSprite(600,Math.round(random(15,285),10,10));
    OP2.addAnimation("h",enemy2);
    OP2.scale=0.07;
    OP2.velocityX=-(8+distance/100);
    OP2.lifetime=150;
    OP2G.add(OP2);
  }
}

function spawnOP3(){
  if(World.frameCount % 200 === 0){
    var OP3= createSprite(600,Math.round(random(15,285),10,10));
    OP3.addAnimation("h",enemy2);
    OP3.scale=0.07;
    OP3.velocityX=-(8+distance/100);
    OP3.lifetime=150;
    OP3G.add(OP3);
  }
}

function spawnOB(){
  if(World.frameCount % 240 === 0){
    var OB=createSprite(600,Math.round(random(15,285),10,10));
    OB.velocityX=-(8+distance);
    OB.lifetime=150;
    var rand= Math.round(random(1,3));
    switch(rand){
      case 1: OB.addImage(obstacles1);
        break;
      case 2: OB.addImage(obstacles2);
        break;
      case 3: OB.addImage(obstacles3);
        break;
    default: break;
    }
    OB.scale=0.07;
    OBG.add(OB);
  }
}

function End(){
  OBG.lifetime=-1;
  OP1G.lifetime=-1;
  OP2G.lifetime=-1;
  OP3G.lifetime=-1;
  //distance=0;
  //OP1G.changeAnimation(endEnemy1);
  
  //OP2G.changeAnimation(endEnemy2);
  //OP3G.changeAnimation(endEnemy3);
  mainCyclist.velocityX=0;
  OBG.velocityX=0;
  OP1G.velocityX=0;
  OP2G.velocityX=0;
  OP3G.velocityX=0;
  path.velocityX = 0;
  mainCyclist.lifetime = 0;
}

function reset(){
  gameState=PLAY;
  gameEndS.visible = false;
  distance=0;
  OBG.destroyEach();
  OP1G.destroyEach();
  OP2G.destroyEach();
  OP3G.destroyEach();
}
