//Variáveis da bolinha
let xbolinha = 300
let ybolinha = 200
let diametro = 20

let velocidadeXdabolinha = 7;
let velocidadeYdabolinha = 7;
let raio = diametro / 2;

//Variáveis da raquete
let xraquete = 5;
let yraquete = 150;
let raquetewidth = 10;
let raqueteheight = 90;
let colidiu = false;

//Variáveis oponente
let xraqueteoponente = 585;
let yraqueteoponente = 150;
let colidiuopon = false;
let velocidadey 
let chanceDeErrar = 39;

//Variáveis do placar do jogo
let pontos = 0;
let pontosoponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//setup
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//jogo
function draw() {
  background(0);
  mostrabolinha();
  movimentabolinha();
  colisaobordas();
  mostraraquete(xraquete, yraquete);
  movimentoraquete();
  //verificacolisaoraquete();
  colisaoraquetebiblioteca(xraquete, yraquete);
  mostraraquete(xraqueteoponente, yraqueteoponente);
  movimentaraqueteoponente();
  colisaoraquetebiblioteca(xraqueteoponente, yraqueteoponente);
  placar();
  contapontos();
  bolinhanaoficapresa();
}


function mostrabolinha(){
  circle(xbolinha, ybolinha, diametro);
}



function movimentabolinha(){
  xbolinha += velocidadeXdabolinha;
  ybolinha += velocidadeYdabolinha;
}



function colisaobordas(){
  if (xbolinha + raio > width || xbolinha - raio < 0){
    velocidadeXdabolinha *= -1;
  
  }
  
  
  if (ybolinha + raio > height || ybolinha - raio < 0){
    velocidadeYdabolinha = velocidadeYdabolinha * -1;
    
    
  }
}

function mostraraquete(x, y){
  rect(x, y, raquetewidth, raqueteheight);
}


function movimentoraquete(){
  if (keyIsDown(87)){
    yraquete -= 10;
    
  }
  
  if (keyIsDown(83)){
    yraquete += 10;
    
  }
}

function verificacolisaoraquete(){
  
  if(xbolinha - raio < xraquete + raquetewidth && ybolinha - raio < yraquete + raqueteheight && ybolinha + raio > yraquete){
    velocidadeXdabolinha *= - 1;
  }

}

  function colisaoraquetebiblioteca(x, y){
    
    colidiu = collideRectCircle(x, y, raquetewidth, raqueteheight, xbolinha, ybolinha, raio); 
    if (colidiu){
      velocidadeXdabolinha *= - 1;
      raquetada.play();
    }
    
  
  }


function calculaChanceDeErrar() {
  if (pontosoponente >= pontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35;
    }
  }
}

function movimentaraqueteoponente(){
  velocidadey = ybolinha - yraqueteoponente - raqueteheight / 2 - 50;
  yraqueteoponente += velocidadey + chanceDeErrar;
  calculaChanceDeErrar();
  

  /*if (keyIsDown(UP_ARROW)){
    yraqueteoponente -= 10;
    
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yraqueteoponente += 10;
    
  }*/
  
  
}

function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140, 0));
  rect(130, 10, 40, 20);
  fill(255);
  text(pontos, 150, 26);
  fill(color(255,140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosoponente, 450, 26);
  
  
}

function contapontos(){
  if (xbolinha > 590){
    pontos +=1;
    ponto.play();
  }
    
    if (xbolinha < 10){
      pontosoponente +=1;
      ponto.play();
    }
}
  
function bolinhanaoficapresa(){
    if (xbolinha - raio < 0){
    xbolinha = 23
    }
}

