var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColour;
var userChosenColour;
var userClickedPattern = [];
var level = 1;
var index = 0;
var hasStarted = false;

// adding an event to any keystroke to start the game
$(document).on("keypress", function() {
  hasStarted = true;
  nextSequence();
});

// adding a click event to each of the button in the game
$(document).click(function(event) {

  // getting the id of the clicked button from the DOM
  userChosenColour = event.target.id;

  // checking if the area clicked was of a button or not
  if (userChosenColour !== "") {

    // adding the clicked button to the user pattern
    userClickedPattern.push(userChosenColour);

    var correct = checkClick(index);
    index++;

    // playing the button sound on click other wise wrong sound track will be played
    if(correct) playSound(userChosenColour);
    animateClick(userChosenColour);

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        if (hasStarted) nextSequence();
      }, 1000);
    }
  }

});

// function to flash the next button in the sequence and add it to the game pattern
function nextSequence() {

  // generate a random number between 0,1,2,3
  var randomNumber = Math.floor(Math.random() * 3 + 1)

  randomChosenColour = buttonColours[randomNumber];
  // adding the random chosen color to the game pattern
  gamePattern.push(randomChosenColour);

  $("#level-title").html("Level " + level);

  // flash effect using jquery
  $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
  level++;

  //resetting user clicked pattern after each level
  userClickedPattern = [];
  index = 0;
}

// function to play sounds of buttons and game over
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function for the animation of button on clicking them
function animateClick(currentColour) {

  // adding a class called pressed to the clicked button
  $("#" + currentColour).addClass("pressed");

  //removing the pressed class after a 100 milliseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// function to check if the clicked button matches the game pattern or not
function checkClick(index) {
  if (gamePattern[index] === userClickedPattern[index]) {

    return true;

  } else {

    playSound("wrong");

    //adding a class to flash the webpage with a red background indicating a wrong button was pressed
    $("body").addClass("game-over");

    //waiting for 200 milliseconds to remove the class
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // resetting the page title when any wrong button was pressed
    $("#level-title").html("Game Over, Press Any Key to Restart");
    
    startOver();

    return false;
  }
}

// function to reset the game when a wrong button is clicked
function startOver() {

  // resetting the variables
  gamePattern = [];
  userClickedPattern = [];
  level = 1;
  index = 0;
  hasStarted = false;

}
