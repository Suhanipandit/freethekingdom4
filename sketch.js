var wizard,wizardimg
var monster,monsterimg
var fireball,fireballimg,fireballsound
var deathsound
var dragon,dragonimg
var bg,bgimage
var gameState="play"
var score=0
var dragonGroup
var monsterGroup
var fireballGroup
var fireballs=70
var life=3
var winsound

function preload(){
  bgimage=loadImage("volcano sky.jpg")
  dragonimg=loadAnimation("1.png","2.png","3.png","4.png","5.png")
  monsterimg=loadAnimation("monster1.png","monster2.png","monster3.png")
  wizardimg=loadAnimation("wizard1.png","wizard2.png","wizard3.png")
  fireballimg=loadImage("fireball.png")
  fireballsound=loadSound("fireball sound.mp3")
  deathsound=loadSound("death sound.mp3")
  winsound=loadSound("win sound.mp3")
}

function setup() {
  createCanvas(displayWidth-100,displayHeight-100);
  wizard=createSprite(200, 200, 50, 50);
  wizard.addAnimation("wizard",wizardimg)
  wizard.scale=0.5
  //wizard.debug=true
  wizard.setCollider("rectangle",0,0,250,300)


  dragonGroup=new Group()
  monsterGroup= new Group()
  fireballGroup= new Group()
  
}

function draw() {
  background(bgimage)  
  if(gameState==="play"){
   
    if(keyDown(UP_ARROW)){
      wizard.y=wizard.y-15
    }
    if(keyDown(DOWN_ARROW)){
      wizard.y=wizard.y+15
    }
    if(keyDown(RIGHT_ARROW)){
      wizard.x=wizard.x+15
    }
    if(keyDown(LEFT_ARROW)){
      wizard.x=wizard.x-15
    }
    if(keyWentDown("space")){
      fireball=createSprite(wizard.x+90,wizard.y-20,10,5)
      fireball.addImage(fireballimg)
      fireballsound.play()
      fireball.scale=0.4
      fireball.velocityX=20
      fireballGroup.add(fireball)
      fireballs=fireballs-1
    }
    if(fireballs===0){
      gameState="zero fireballs"
    }
  
    spawnDragons()
    spawnMonsters()

    if(fireballGroup.isTouching(dragonGroup)){
      for(var i=0;i<dragonGroup.length;i++){
        if(dragonGroup[i].isTouching(fireballGroup)){
          dragonGroup[i].destroy()
          score=score+2
        }
      }
    }
    if(fireballGroup.isTouching(monsterGroup)){
      for(var i=0;i<monsterGroup.length;i++){
        if(monsterGroup[i].isTouching(fireballGroup)){
          monsterGroup[i].destroy()
          score=score+5
        }
      }
    }
    if(wizard.isTouching(monsterGroup)){
      for(var i=0;i<monsterGroup.length;i++){
        if(monsterGroup[i].isTouching(wizard)){
          monsterGroup[i].destroy()
          life=life-1
        }
      }
    }
    if(wizard.isTouching(dragonGroup)){
      for(var i=0;i<dragonGroup.length;i++){
        if(dragonGroup[i].isTouching(wizard)){
          dragonGroup[i].destroy()
          life=life-1
        }
      }
    }
    if(life===0){
      gameState="end"
      deathsound.play()
    }
    if(score>=100){
      gameState="won"
      winsound.play()
    }
  
  }
  drawSprites();
  textSize(20)
  fill("white")
  text("Fireballs: "+fireballs,displayWidth-250,50)
  text("Score: "+score,displayWidth/2-100,50)
  text("Lives: "+life,50,50)
  if(gameState==="end"){
    wizard.destroy()
    monsterGroup.destroyEach()
    dragonGroup.destroyEach()
    fireballGroup.destroyEach()
    textSize(60)
    fill("red")
    text("YOU LOSE!",displayWidth/2-250,displayHeight/2)
  }
  else if(gameState==="zero fireballs"){
    textSize(50)
    fill("white")
    text("YOU RAN OUT OF fireballS!!",displayWidth/2-400,displayHeight/2)
    monsterGroup.destroyEach()
    dragonGroup.destroyEach()
    fireballGroup.destroyEach()
    wizard.destroy()
  }
  else if(gameState==="won"){
    textSize(100)
    fill("green")
    text("YOU WON!!",displayWidth/2-350,displayHeight/2)
    monsterGroup.destroyEach()
    dragonGroup.destroyEach()
    fireballGroup.destroyEach()
    wizard.destroy()
  }
}

function spawnDragons(){
  if(World.frameCount%120===0){
    dragon=createSprite(displayWidth+50,displayHeight-220,10,50)
    dragon.addAnimation("dragon",dragonimg)
    dragon.scale=0.5
    dragon.setCollider("rectangle",0,0,250,250)
    //dragon.debug=true
    dragon.y=random(100,displayHeight-100)
    dragon.velocityX=-(5+score/10)
    dragon.lifetime=600
    dragonGroup.add(dragon)
  }
}

function spawnMonsters(){
  if(World.frameCount%150===0){
    monster=createSprite(500,-30,10,50)
    monster.addAnimation("monster",monsterimg)
    monster.scale=0.3
    monster.setCollider("rectangle",0,0,250,200)
    //monster.debug=true
    monster.x=random(200,displayWidth/2)
    monster.velocityY=10+score/10
    monster.lifetime=600
    monsterGroup.add(monster)
  }
}

