$(document).ready(function () {
  var ans1 = document.getElementById("dog-btn");
  var ans2 = document.getElementById("cat-btn");
  var score = 0;

  var response = document.getElementById("response");

  function displayQuestion() {
    document.getElementById("generate").style.display = "none";
    // document.getElementById("rules").style.display = "none";
    getRandomImage();
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

    // we are using fetch api to make rest api calls. you can use axios use.
    // we are also using promises here.
    fetch(randomImageApiUrl)
      .then(function (response) {
        // we get raw response. need to first convert it into json format so we can use the data easily
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
});
