$(document).ready(function () {    /// j query ready function 
  var ans1 = document.getElementById("dog-btn");  /// two buttons here one for cat and one for dog
  var ans2 = document.getElementById("cat-btn");
  var numberQuestion = 0;  //variable keeps track of number of questions posed to user
  var dogScore = 0;  // two variables keep track of number of times they clicked on dog dogScore and cat catScore
  var catScore = 0;
  var response = document.getElementById("response");  // an array that gives the user a random answer after they pick a cat or dog
  var feedback = [
    "Wow, nice!",
    "Good Choice!!",
    "You think so !!",
    "I agree !!",
    "Noooo way !!",
    "Absolutely !!",
    "Really ???",
    "Awesome",
    "You got it",
  ];
  var randI = feedback[Math.floor(Math.random() * feedback.length)];  //  variable to generate the random answer

  function displayQuestion() {   /// function displays the question to user
    document.getElementById("generate").style.display = "none";
    // document.getElementById("rules").style.display = "none";
    getRandomImage();  /// calls function to get cat + dog image
    ans1.style.display = "block";
    ans2.style.display = "block";
  }

  document
    .getElementById("generate")
    .addEventListener("click", displayQuestion);

  ////////dog api
  //fetches a random dog from api

  const imageRandom = document.getElementById("imageRandom");

  function getRandomImage() {
    /// call cat api
    function ajax_get(url, callback) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          console.log("responseText:" + xmlhttp.responseText);
          try {
            var data = JSON.parse(xmlhttp.responseText);
          } catch (err) {
            console.log(err.message + " in " + xmlhttp.responseText);
            return;
          }
          callback(data);
        }
      };

      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    }

    ajax_get(
      "https://api.thecatapi.com/v1/images/search?size=full",
      function (data) {
        var html =
          '<img src="' + data[0]["url"] + '" width="500" height="600" >';
        document.getElementById("image").innerHTML = html;
      }
    );
    const randomImageApiUrl = "https://dog.ceo/api/breeds/image/random";

    // we are using fetch api to make rest api calls.  also note for both cat and dog api's we are calling up a random photo , there is much more 
    /// information in the dog api which you can see in the console regarding breed ect and other classifications 
    fetch(randomImageApiUrl)
      .then(function (response) {
        // we get raw response. need to first convert it into json
        return response.json();
      })
      .then(function (json) {
        // now we got the json . we can use this to update any data in html  json item in console
        console.log(json);
        var imageUrl = json.message;
        ///alert(imageUrl);
        //update the image
        var img = document.createElement("img");
        img.src = imageUrl;
        var image = new Image();
        image.src = imageUrl;
        $("#thisdog").append(image);
      })
      .catch(function (error) {
        // if any error occurs read console
        console.log(error);
      });
  }
  // document.getElementById("response").addEventListener()
  document.getElementById("dog-btn").addEventListener("click", function () {  /// listens for click of dog button or cat button below
    document.getElementById("response").textContent = randI;  // random generated response from feedback array
    console.log(image);
    image = "";  //  clear image
    $("#thisdog").empty();  // dynamically empty the dog image and then the cat image after the user has selected
    $("#image").empty();
    randI = feedback[Math.floor(Math.random() * feedback.length)];  /// makes sure we get a new random reply each time
    dogScore++;   /// since dog button clicked add one to dog score 
    console.log("dog " + dogScore + " cat " + catScore);
    numberQuestion++;  ////keep track of total number of questions
    console.log("number of questions: " + numberQuestion);
    if (numberQuestion > 8) {  ////  if we are on the 9 th question we want it to be the last - clear everything else call new question again
      console.log("you are done!");
      document.getElementById("thisdog").style.display = "none";
      document.getElementById("image").style.display = "none";
      document.getElementById("response").style.display = "none";
      document.getElementById("dog-btn").style.display = "none";
      document.getElementById("cat-btn").style.display = "none";
      result();
    } else {
      displayQuestion();
    }
  });
  document.getElementById("cat-btn").addEventListener("click", function () {  ////this is the cat button -- all operation is identical to dog button
    document.getElementById("response").textContent = randI; //// except that we increment the catScore on line 124 
    console.log(image);
    image = "";
    $("#image").empty();
    $("#thisdog").empty();
    randI = feedback[Math.floor(Math.random() * feedback.length)];
    catScore++;
    console.log("dog " + dogScore + " cat " + catScore);
    numberQuestion++;
    console.log("number of questions: " + numberQuestion);
    if (numberQuestion > 8) {   ////  again if we are on question number 9 we tell user quiz is over , clear everything out , display result by calling that function
      console.log("you are done!");
      document.getElementById("thisdog").style.display = "none";
      document.getElementById("image").style.display = "none";
      document.getElementById("response").style.display = "none";
      document.getElementById("dog-btn").style.display = "none";
      document.getElementById("cat-btn").style.display = "none";
      result();
    } else {
      displayQuestion();
    }
  });
  function result() {  ////  this function is called when the user answered 9 questions - odd number means a tie is impossible 
    if (dogScore > catScore) {  ///   if their dog score is larger it displays ending mesg. they are a dog person
      document.getElementById("animated-text").style.display = "none";
      $("#final-message").addClass("animate__animated animate__jackInTheBox");
      document.getElementById(
        "final-message"
      ).textContent = `YAY looks like you are done! You are a dog person!!`;
    } else {////// otherwise they must be a cat person so that message is displayed 
      document.getElementById("animated-text").style.display = "none";
      $("#final-message").addClass("animate__animated animate__jackInTheBox");
      document.getElementById(
        "final-message"
      ).textContent = `YAY looks like you are done! You are a cat person!!`;
    }
  }
  // close jquery start below
});
