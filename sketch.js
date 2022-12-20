var minigame1_img, 
crate1_img, crate2_img, crate3_img, 
button1_img, button2_img, 
crane_img;

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, rope2, con, con2;


function preload()
{
	minigame1_img = loadImage("./images/mini_game1.png");
  
	crate1_img = loadImage("./images/crate1.png") ;
	crate2_img = loadImage("./images/crate2.png") ;
	crate3_img = loadImage("./images/crate3.png");
  
}

function setup() {
	createCanvas(700, 500);
	engine = Engine.create();
	world = engine.world;
  

	//crates
	var crate1=createSprite(500,200,100,100);
	crate1.addImage("crate1",crate1_img);
	crate1.scale = 0.25;
  
	var crate2=createSprite(520,250,100,100);
	crate2.addImage("crate2",crate2_img);
	crate2.scale = 0.2;
  
	var crate3=createSprite(550,300,100,100);
	crate3.addImage("crate3",crate3_img);
	crate3.scale = 0.32;

	//buttons
	var button=createImg("./images/button1.png");
	button.position(200,130);
	button.size(80,50);
  button.mouseClicked(remove_rope);
  
	var button2=createImg("./images/button1.png");
	button2.position(375,50);
	button2.size(80,50);
  button2.mouseClicked(drop);
  
	var crane=createImg("./images/crane.png");
	crane.position(258,45);
	crane.size(100,50);

  rope = new Rope (5,{x:230, y: 330});
  rope2= new Rope(4, {x:50, y: 450}) ;
  con = new Link(rope, crane);
  con2= new Link(rope2, crane);

	Engine.run(engine);
  
}



function draw(){
  rectMode(CENTER);
  background(minigame1_img);  
  Engine.update(engine);

  push();
  imageMode(CENTER) ;
  if (crane!=null){
  image(crane_img, crane.position.x, crane.position.y,70,70) ;
  }
  pop();
  rope.show();
  rope2.show();


  if (collide (crane, crate1, 80)==true){
    remove_rope();
    World.remove(engine.world, crate1);
    crane=null;
  }

  else if (collide (crane, crate2, 80)==true){
    remove_rope();
    World.remove(engine.world, crate2) ;
    crane=null;
  }

  else if (collide (crane, crate3, 80)==true){
    remove_rope();
    World.remove(engine.world, crate3) ;
    crane=null;
  }

  drawSprites();
}



function collide(body,sprite,x){
  if(body!=null){

    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=x){
      return true; 
    }
    
    else{
      return false;
    }

  }
}

function remove_rope(){
  rope.break();
  con.dettach();
  con = null; 
}

function drop(){
  rope2.break();
  con2.dettach();
  con2=null;
}















