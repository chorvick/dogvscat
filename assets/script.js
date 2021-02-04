var ans1 = document.getElementById("ans1");
var ans2 = document.getElementById("ans2");
var score = 0;

var response = document.getElementById("response");

function displayQuestion() {
  startTimer();
  document.getElementById("generate").style.display = "none";
  document.getElementById("rules").style.display = "none";

  ans1.style.display = "block";
  ans2.style.display = "block";
}

document.getElementById("generate").addEventListener("click", displayQuestion);

//hello testing 123
