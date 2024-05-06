let font;
function preload() {
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  music = loadSound("trilha.mp3");
  fonte = loadFont("Jacquard24-Regular.ttf");
}

//sons
let ponto;
let raquetada;
let music;
let stop = -11;

// variação da bola
let X = 350;
let Y = 250;
let diametro = 16;
let raio = diametro / 2;

// raquete
let largura = 10;
let altura = 90;
let posicaoX = 3;
let posicaoY = 205;

//raquete oponente
let OposicaoX = 687;
let OposicaoY = 205;
let velocidadeO;

// velocidade
let velocidadeX = 8;
let velocidadeY = 8;

let colisao = false;

//placar
let meuPonto = 0;
let Opontos = 0;

function bolinha() {
  fill("white");
  circle(X, Y, diametro);
}

function raquete(x, y) {
  rect(x, y, largura, altura);
}

function movimentacaoDaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    posicaoY -= 12;
  }

  if (keyIsDown(DOWN_ARROW)) {
    posicaoY += 12;
  }
}

function movimentacaoDaRaqueteO() {
  if (keyIsDown(87)) {
    OposicaoY -= 12;
  }

  if (keyIsDown(83)) {
    OposicaoY += 12;
  }
}

// function colisaoRaquete(){
//   if(X - raio < posicaoX + largura && Y - raio < posicaoY + altura && Y + raio > posicaoY){
//     velocidadeX *= -1;
//     }
// }

function velocidadeXY() {
  X += velocidadeX;
  Y += velocidadeY;
}

function bordasColisao() {
  if (X + raio > width || X - raio < 0) {
    velocidadeX *= -1;
    if (velocidadeX <= -8) {
      velocidadeX += -1;
      if (velocidadeX <= -11) {
        velocidadeX = stop;
      }
    }
  }

  if (Y + raio > height || Y - raio < 0) {
    velocidadeY *= -1;
    if (velocidadeY <= -8) {
      velocidadeY += -1;
      if (velocidadeY <= -11) {
        velocidadeY = stop;
      }
    }
  }
}

// function raqueteColisao(){
//   colisao = collideRectCircle(posicaoX, posicaoY, largura, altura, X, Y, raio);
//   if (colisao){
//     velocidadeX *= -1;
//   }
// }

// function raqueteOColisao(){
//   colisao = collideRectCircle(OposicaoX, OposicaoY, largura, altura, X, Y, raio);
//   if (colisao){
//     velocidadeX *= -1;
//   }
// }

function colisaoRaquete(x, y) {
  colisao = collideRectCircle(x, y, largura, altura, X, Y, raio);
  if (colisao) {
    velocidadeX *= -1;
    raquetada.play();
  }
}

function placar() {
  textAlign(CENTER);
  textSize(50);
  textFont(fonte);
  fill("white");
  text(meuPonto, 175, 30);
  text(Opontos, 525, 30);
}

function pontuacao() {
  if (X > 686) {
    meuPonto += 1;
    ponto.play();
  }
  if (X < 9) {
    Opontos += 1;
    ponto.play();
  }
}

function setup() {
  createCanvas(700, 500);
  music.loop();
}

function draw() {
  background("black");
  bolinha();
  velocidadeXY();
  bordasColisao();
  raquete(posicaoX, posicaoY);
  raquete(OposicaoX, OposicaoY);
  movimentacaoDaRaquete();
  colisaoRaquete(OposicaoX, OposicaoY);
  colisaoRaquete(posicaoX, posicaoY);
  movimentacaoDaRaqueteO();
  placar();
  pontuacao();
  //console.log(velocidadeX);
  //console.log(velocidadeY);
  // raqueteColisao();
  // raqueteOColisao();
}
