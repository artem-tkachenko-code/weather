let acc = document.getElementsByClassName("acc__title");

console.log(acc);

let i;

for (i = 0; i < acc.length; i++) {
    console.log(i);
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



let head = document.getElementById('head');

let toggle = document.getElementById('menu__toggle');

toggle.addEventListener('change', function () {
    if (this.checked) {
        head.style.marginBottom = '60px'
    } else {
        head.style.marginBottom = '30px'
    }
})


const carouselSlide = document.querySelector('.app__picture');
const carouselImages = document.querySelectorAll('.app__picContainer img');


const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

nextBtn.addEventListener('click', () => {
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out"
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out"
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

});

carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].id === "lastClone") {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselImages[counter].id === "firstClone") {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});


let cityName 
let cityDate = new Date ()
let cityWeather
let cityRain
let cityWind
let cityPressure
let cityTemp



function getCityWeather () {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" + document.forms.cityForm.city.value + "&appid=c050cb7859d45c5d5fd7e8e59faab620");
console.log(xhr);

xhr.send()
xhr.onload = function () {

// cityName = xhr.response.name;
cityWeather = JSON.parse(xhr.response);
cityName = cityWeather.name;
cityRain = cityWeather.main.humidity + "%"
cityWind = cityWeather.wind.speed + "м/с"
cityPressure = cityWeather.main.pressure + "hPa"
cityTemp = Math.round(cityWeather.main.temp-273) + "°C"
console.log(cityWeather);
console.log(cityName);

let options = {
    month: 'numeric',
    day: 'numeric',
    weekday: 'long',
  };

document.getElementById('upCity').innerHTML = cityName;
document.getElementById('upDate').innerHTML = cityDate.toLocaleString ("ru", options);
document.getElementById('infoRain').innerHTML = cityRain;
document.getElementById('infoWind').innerHTML = cityWind;
document.getElementById('infoPressure').innerHTML = cityPressure;
document.getElementById('infoTemp').innerHTML = cityTemp;

    JSON.parse(xhr.response);
    
};
}

getCityWeather ()


