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



/// call cat api 
function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log('responseText:' + xmlhttp.responseText);
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

ajax_get('https://api.thecatapi.com/v1/images/search?size=full', function (data) {
  document.getElementById("id").innerHTML = data[0]["id"];
  document.getElementById("url").innerHTML = data[0]["url"];

  var html = '<img src="' + data[0]["url"] + '">';
  document.getElementById("image").innerHTML = html;
});

////////dog api

const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';

const select = document.querySelector('.breeds');

fetch(BREEDS_URL)
  .then(res => {
    return res.json();
  })
  .then(data => {
    const breedsObject = data.message;
    const breedsArray = Object.keys(breedsObject);
    for (let i = 0; i < breedsArray.length; i++) {
      const option = document.createElement('option');
      option.value = breedsArray[i];
      option.innerText = breedsArray[i];
      select.appendChild(option);
    }
    console.log(breedsArray);
  });

select.addEventListener('change', event => {
  let url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
  getDoggo(url);
});

const img = document.querySelector('.dog-img');
const spinner = document.querySelector('.spinner');

const getDoggo = url => {
  spinner.classList.add('show');
  img.classList.remove('show');
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      img.src = data.message;
    });
};

img.addEventListener('load', () => {
  spinner.classList.remove('show');
  img.classList.add('show');
});