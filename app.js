var newArray = []

var nextNumber = 1

var game = {
  player1: {time:0, turn:true},
  player2: {time:0, turn:false},
  clock: 0
}

for (var i = 0; i < 32; i++) {
  if(i < 10) {
    newArray[i] = i + 1
  } else {
    newArray[i] = null
  }
}

var startButton = $('#startBtn')

var resetButton = $('#resetBtn')
resetButton.on('click', function(){
  $('.faceUp').toggleClass('faceDown')
  $('#container').append($("<div id='startScreen'><p>Prove that you are the best cat herder!<p>Collect all the cats in order and try to beat your opponent's time.</p></p><p>Hit the Start button when you're ready to go!</p><p>Remember: Cats are skittish so if you try to collect them out of order they'll all run to a new location</p></div>").hide().fadeIn())
  game.player1.time = 0
  game.player1.turn = true
  nextNumber = 1;
  game.clock = 0;
  for (var i = 1; i < 99999; i++){
    window.clearInterval(i)
  }
  $('#player1Time').html(0)
  $('#player2Time').html(0)
  setTimeout(function(){
    goToStart()
  },600)
})

goToStart()

function setStartButton(){
  startButton.on('click', function(){
    startButton.off('click')
    shuffle(newArray)
    $('#startScreen').fadeOut()
    $('#turnSwap').fadeOut()
    setTimeout(function(){
      faceUpGrid()
      var theTimer = window.setInterval(function(){
        game.clock = game.clock + 1
        updateTime()
        if (nextNumber > 10){
          clearInterval(theTimer)
          endTurn()
        }
      },1000)
    },600)
  })
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function appendFaceUp(i){
  $('#container').append("<div class='card faceUp faceDown'><div class='contents'><div class='front'><img class='frontal' src='images/front.png'><p class='frontal'>"+newArray[i]+"<p></div><div class='back'><img src='images/back.png'></div></div></div>")
  //$('.faceUp').toggleClass('faceDown')
}

function faceUpGrid(){
  $('#container').empty()
  for (var i = 0; i < newArray.length; i++) {
    if(newArray[i] == null){
      appendFaceDown()
    } else {
      appendFaceUp(i)
    }
  }
  //$('.faceUp').toggleClass('faceDown')
  makeClickable()
  setTimeout(function(){
    $('.faceUp').toggleClass('faceDown')
  }, 100)

}

function appendFaceDown(){
  $('#container').append("<div class='card faceDown'><div class='contents'><div class='front'><img src='images/front.png'></div><div class='back'><img src='images/back.png'></div></div></div>")
}

function faceDownGrid(){
  $('#container').empty()
  for (var i = 0; i < newArray.length; i++) {
    appendFaceDown()
  }
}

function makeClickable(){
  $('.card').on('click', function() {
    if ($(this).find('p').text() == nextNumber) {
      $(this).toggleClass('faceDown')
      $(this).toggleClass('faceUp')
      nextNumber = nextNumber + 1
      // if(fx.beep.paused) {
      //   fx.beep.play()
      // } else {
      //   fx.beep.pause()
      // }
    }
    else {
      $('.faceUp').toggleClass('faceDown')
      setTimeout(punishShuffle,600);
    }
  })
}

function punishShuffle(){
  $('#container').empty()
  shuffle(newArray)
  for (var i = 0; i < newArray.length; i++) {
    if(newArray[i] >= nextNumber){
      appendFaceUp(i)
    } else {
      appendFaceDown()
    }
  }
  makeClickable()
  setTimeout(function(){
    $('.faceUp').toggleClass('faceDown')
  }, 100)
}

function endTurn(){
  faceDownGrid()
  if(game.player1.turn == true){
    $('#container').append($("<div id='turnSwap'><p>Player 1's turn is over!</p><p>Player 2 get Ready!</p><p>Hit Start to take your turn</p></div>").hide().fadeIn())
    game.player1.turn = false
    game.player2.turn = true
    game.clock = 0
    nextNumber = 1
    setStartButton()
  } else {
    endGame()
  }
}

function endGame(){
  $('.card').fadeOut()
  setTimeout(function(){
    if (game.player1.time<game.player2.time){
      $('#container').append($("<div id= 'winner'><p>Player 1 is the winner!</p><p>They beat player 2 by "+(game.player2.time-game.player1.time)+" seconds!</p><img class='ribbon' src='images/ribbon.png' alt='ribbon'></div>").hide().fadeIn())
    } else if (game.player2.time<game.player1.time){
      $('#container').append($("<div id= 'winner'><p>Player 2 is the winner!</p><p>They beat player 1 by "+(game.player1.time-game.player2.time)+" seconds!</p><img class='ribbon' src='images/ribbon.png' alt='ribbon'></div>").hide().fadeIn())
    } else {
      $('#container').append($("<div id= 'winner'><p>Tie! Everyone Wins!</p><img class='ribbon' src='images/ribbon.png' alt='ribbon'><img class='ribbon' src='images/ribbon.png' alt='ribbon'></div>").hide().fadeIn())
    }
  },600)
}

function updateTime(){
  if(game.player1.turn == true){
    game.player1.time = game.clock
    $('#player1Time').text(game.clock)
  }else{
    game.player2.time = game.clock
    $('#player2Time').text(game.clock)
  }
}

function goToStart(){
  setStartButton()
  faceDownGrid()
  $('#container').append("<div id='startScreen'><p>Prove that you are the best cat herder!<p>Collect all the cats in order and try to beat your opponent's time.</p></p><p>Hit the Start button when you're ready to go!</p><p>Remember: Cats are skittish so if you try to collect them out of order they'll all run to a new location</p></div>")
}
