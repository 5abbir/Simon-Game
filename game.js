var userClickedPattern = [];
var gamePattern = [];
var cnt = -1;
var win = true;
var loose = false;
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
}
var level = -1;

$(document).keydown(function () {
    //console.log(randomChosenColor)
    if (level == -1) {
      gamePattern = [];
      userClickedPattern = [];
      cnt = -1;
      win = true;
      loose = false;
      nextSequence();
      level++;
      $("h1").text("Level " + level);
      $("."+randomChosenColor).fadeOut(100).fadeIn(100);
      var audio = new Audio("sounds/"+randomChosenColor +".mp3");
      animatePress(randomChosenColor);
      audio.play();
    }

});
function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $(".pressed").removeClass("pressed");
  }, 100);
}

function wrongAnimate(){
  $("body").addClass("red");
  setTimeout(function () {
    $("body").removeClass("red");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
  }, 100);
}

function game(){

  cnt = -1;
  userClickedPattern = [];
  if (win) {
    level++;
    $("h1").text("Level " + level);
    setTimeout(function() {
      nextSequence();
      $("."+randomChosenColor).fadeOut(50).fadeIn(50);
      var audio = new Audio("sounds/"+randomChosenColor +".mp3");
      animatePress(randomChosenColor);
      audio.play();
    }, 1000);
  }else{
    $("h1").html("GameOver, Press Any Key To Restart");
    wrongAnimate();
    loose = true;
    level = -1;
  }


}

$(".btn").click(function(e){
  if (level > -1){
    cnt++;
    var userChosenColour = e.target.id;
    $(e.target).fadeOut(50).fadeIn(50);
    var audio = new Audio("sounds/"+e.target.id +".mp3");
    audio.play();
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);

      if (gamePattern[cnt] != userClickedPattern[cnt]) {
        win = false;
        game();
      }
    if (cnt+1 == gamePattern.length) {
      game();
    }
  }

  if (loose) {
    var userChosenColour = e.target.id;
    $(e.target).fadeOut(50).fadeIn(50);
    var audio = new Audio("sounds/"+e.target.id +".mp3");
    audio.play();
    wrongAnimate();
  }
      // console.log(userClickedPattern);
    });
