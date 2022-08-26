'use strict'
const app =document.querySelector('#app')
const body =document.querySelector('body')
const searchBtn =document.querySelector('#search__place')
const place =document.querySelector('.place span')
const timeDuration =document.querySelector('.content .time')
const temp =document.querySelector('.temperature .value')
const shortDesc =document.querySelector('.content .short-desc')
const visibility =document.querySelector('.visibility span')
const wind =document.querySelector('.wind span')
const humidity =document.querySelector('.humidity span')


function changeWeatherUI() {

    searchBtn.value.trim()
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lon=position.coords.longitude;
            let lat=position.coords.latitude;
            let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=acf3af863acf99df0d6e052b4af19254`
            fetch(apiUrl)
                .then((response) => {
                   return response.json()
                })
                .then((data) => {
                    weatherReport(data)
                })
        })
    }
}
function weatherReport(data) {
    var urlWeatherReport=`http://api.openweathermap.org/data/2.5/weather?q=${data.name}&appid=acf3af863acf99df0d6e052b4af19254`
    fetch(urlWeatherReport)
        .then(res => {
            return res.json()
        })
         .then(data => {
             place.innerText=`${data.name}, ${data.sys.country}`
             var today=new Date();
             var hours=today.getHours() < 10 ? '0'+today.getHours() : today.getHours();
             var minutes=today.getMinutes() <10 ? '0'+today.getMinutes() : today.getMinutes();
             var seconds=today.getSeconds() < 10 ? '0'+today.getSeconds() : today.getSeconds();
             timeDuration.innerText=`${hours}:${minutes}:${seconds}, ${today.getDate()}/${today.getMonth()+1}/${today.getYear()+1900}`
             
             var currentWeather=data.weather[0].main
             shortDesc.innerText=currentWeather
             visibility.innerText=data.visibility+' (m)'
             wind.innerText=data.wind.speed+ ' (m/s)'
             humidity.innerText=data.main.humidity+' (%)'
             
             var currentTemp=Math.round(data.main.feels_like-272,15)
             temp.innerText=currentTemp;
             if(currentTemp >= 30)  {
                app.style.background=`url('./asset/img/hot.png') no-repeat center/cover`
                body.style.background=`url('./asset/img/hot.png') no-repeat center/cover`
             }else if(20 <= currentTemp <30) {
                app.style.background=`url('./asset/img/cool2.jpg') no-repeat center/cover`
                body.style.background=`url('./asset/img/cool2.jpg') no-repeat center/cover`
            }else if(currentTemp < 20) {
                 app.style.background=`url('./asset/img/cold1.jpg') no-repeat center/cover`
                 body.style.background=`url('./asset/img/cold1.jpg') no-repeat center/cover`
            }
            if(currentWeather=='Rain') {
                app.style.background=`url('./asset/img/rain1.jpg') no-repeat center/cover`
                body.style.background=`url('./asset/img/rain1.jpg') no-repeat center/cover`
            }
         })

}
function renderInfo() {
    var place=searchBtn.value;
    if(place) {
        var urlSearch=`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=acf3af863acf99df0d6e052b4af19254`
        fetch(urlSearch) 
           .then(res => {
               return res.json()
           })
           .then(data => {
              weatherReport(data)
           })
    }
}
searchBtn.onblur=function searchByCity() {
    renderInfo()
    searchBtn.value='';

}
searchBtn.addEventListener('keyup',e => {
    if(e.keyCode === 13) {
        renderInfo()
    searchBtn.value='';

    }
})

changeWeatherUI();