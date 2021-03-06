let acc = document.getElementsByClassName("acc__title");

let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

//

let head = document.getElementById("head");

let toggle = document.getElementById("menu__toggle");

toggle.addEventListener("change", function () {
  if (this.checked) {
    head.style.height = "100px";
  } else {
    head.style.height = "80px";
  }
});

//

let step = 0;
let circles = document.querySelectorAll(".app__step__dot");

const carouselSlide = document.querySelector(".app__picture");
const carouselImages = document.querySelectorAll(".app__pic__container img");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let counter = 1;
const size = carouselImages[0].clientWidth;

carousel();

nextBtn.addEventListener("click", () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter++;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  nextStep();
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter--;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  prevStep();
});

carouselSlide.addEventListener("transitionend", () => {
  if (carouselImages[counter].id === "lastClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
  if (carouselImages[counter].id === "firstClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
});

function nextStep() {
  if (step < 2) {
    circles[step].style.backgroundColor = "rgb(196, 230, 237)";
    circles[step].style.width = "5px";
    circles[step].style.height = "5px";
    step++;
    circles[step].style.backgroundColor = "rgb(57, 96, 183)";
    circles[step].style.width = "7px";
    circles[step].style.height = "7px";
  } else if (step == 2) {
    circles[step].style.backgroundColor = "rgb(196, 230, 237)";
    circles[step].style.width = "5px";
    circles[step].style.height = "5px";
    step = 0;
    circles[step].style.backgroundColor = "rgb(57, 96, 183)";
    circles[step].style.width = "7px";
    circles[step].style.height = "7px";
  }
}

function prevStep() {
  if (step < 3 && step !== 0) {
    circles[step].style.backgroundColor = "rgb(196, 230, 237)";
    circles[step].style.width = "5px";
    circles[step].style.height = "5px";
    step--;
    circles[step].style.backgroundColor = "rgb(57, 96, 183)";
    circles[step].style.width = "7px";
    circles[step].style.height = "7px";
  } else if (step == 0) {
    circles[step].style.backgroundColor = "rgb(196, 230, 237)";
    circles[step].style.width = "5px";
    circles[step].style.height = "5px";
    step = 2;
    circles[step].style.backgroundColor = "rgb(57, 96, 183)";
    circles[step].style.width = "7px";
    circles[step].style.height = "7px";
  }
}

document.getElementsByTagName("BODY")[0].onresize = function () {
  carousel();
};

function carousel() {

  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";

  circles[step].style.backgroundColor = "rgb(57, 96, 183)";
  circles[step].style.width = "7px";
  circles[step].style.height = "7px";
}

//

let cityName;
let cityDate = new Date();
let cityWeather;
let cityRain;
let cityWind;
let cityPressure;
let cityTemp;

function getCityWeather() {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" +
      document.forms.city__form.city.value +
      "&appid=c050cb7859d45c5d5fd7e8e59faab620"
  );

  xhr.send();
  xhr.onload = function () {
    cityWeather = JSON.parse(xhr.response);
    cityName = cityWeather.name;
    cityRain = cityWeather.main.humidity + "%";
    cityWind = cityWeather.wind.speed + "м/с";
    cityPressure = cityWeather.main.pressure + "hPa";
    cityTemp = Math.round(cityWeather.main.temp - 273) + "°C";

    let options = {
      month: "numeric",
      day: "numeric",
      weekday: "long",
    };

    document.getElementById("upCity").innerHTML = cityName;
    document.getElementById("upDate").innerHTML = cityDate.toLocaleString(
      "ru",
      options
    );
    document.getElementById("infoRain").innerHTML = cityRain;
    document.getElementById("infoWind").innerHTML = cityWind;
    document.getElementById("infoPressure").innerHTML = cityPressure;
    document.getElementById("infoTemp").innerHTML = cityTemp;

    JSON.parse(xhr.response);
  };
}

getCityWeather();

//

window.onscroll = function () {
  myFunction(), onScroll();
};

var header = document.getElementById("head");
var fixed = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > fixed) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
}

var lastScrollTop = 0;

function onScroll() {
  var top = window.pageYOffset;
  if (lastScrollTop > top) {
    header.style.visibility = "visible";
    header.style.opacity = "1";
    header.style.backgroundColor = "#39caebd7";
  } else if (lastScrollTop < top) {
    header.style.visibility = "hidden";
    header.style.opacity = "0";
  }
  lastScrollTop = top;
}

//
