// defined variable
var horizontalMax;
var verticalMax;
var removeTimer;
var loseLife;
var score = 0;
var lifes = 5;
var interval;
var apparitionTimer = 2000;
var disapearanceTimer = 1800;

$(document).ready(function(){

  renderGameBoard(5, 5);
  interval = setInterval(displayTarget, 1000);
  $('body').on('click','img', function(){
    clearTimeout(removeTimer);
    removeTarget(true);
  })

  function playSound(sound){
    $('body').append('<audio src="' + sound +'" autoplay></audio>');
  }

  // affiche le score
  function renderScore(){
    $('section[data-use="menu"]').html('<p>score : ' + score +'</p>');

  }
  // affiche les vies
  function renderLifes(){
    $('section[data-use="menu"]').html('<p>lifes : ' + lifes +'</p>');
  }


  function incrementScore(increment){
    score = score + increment;
    renderScore();
    apparitionTimer -= 100;
    disapearanceTimer = apparitionTimer;
    clearInterval(interval);
    interval = setInterval(displayTarget, apparitionTimer);

  }

  // Game Over alert
  function gameOver() {
    $('section[data-use="gameBoard"]').html();
    alert('Game Over');
    clearTimeout(removeTimer);
  }

  // Decrement the life and display Game Over
  // if life is equal or below 0
  function loseLife(){
    lifes --;
    renderLifes();
    if (lifes <= 0) {
      gameOver();
    }
  }


  // Remove removeTarget
  // If status  = true, increment lifes
  // Else loseLife
  function removeTarget(status){
    $('#target').remove();
    if(status == true){
      incrementScore(1);
    } else {
      loseLife();
    }
  }
  // Random generate for the position of target
  function displayTarget(){
    var hor = 1 + Math.floor(Math.random()* horizontalMax);
    var ver = 1 + Math.floor(Math.random()* verticalMax);
    $('div[data-vertical="' + ver + '"] div[data-horizontal="' + hor + '"]').html('<div id="target" class="imgDiv"><img src="./assets/img/serpent.png"></div>')
    removeTimer = setTimeout(function(){
      removeTarget(false);
    }, 1000);
  }
  function renderGameBoard(horizontal = 5, vertical = 5){
    horizontalMax = horizontal;
    verticalMax = vertical;
    var gameBoard = "";
    for (var i = 1; i <= vertical  ; i++) {
      gameBoard += "<div data-vertical='" + i + "'>";
      for (var j = 1; j <= horizontal; j++) {
        gameBoard += "<div style='height:" + 100/vertical + "vh;width:" + 100/horizontal + "%;' data-horizontal='" + j + "'></div>";
      }
      gameBoard += "</div>";
    }
    $('section[data-use="gameBoard"]').html(gameBoard);
  }




})
