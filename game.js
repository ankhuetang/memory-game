var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];

//keypress to start game
var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});
// $(document).keypress(function() {
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });

function nextSequence(){
  //inncrease level
  userClickedPattern =[];
  level ++;
  $("h1").text("Level "+level);
  //start next sequence
  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

//check answer function
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
      //call back function
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game over, Press any key to restart");
    startOver();
  }
}

//start over function
function startOver(){
  level = 0;
  gamePattern=[];
  started=false;
}

//sound function
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

//user click
$(".btn").click(handler);
function handler(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}
//animate function
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
