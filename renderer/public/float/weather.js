(() => {
  let weatherComponent = document.querySelector('#weather');
  console.log(weatherComponent);
  if (weatherComponent) {
    interval();
    async function interval() {
      weatherComponent.innerHTML = ` --° `;
      const json = await getWeather();
      //   console.log(json);
      weatherComponent.innerHTML = `${json.now.text ? json.now.text + ' ' : ''}${json.now.temp ? json.now.temp : '--'}°`;
      setTimeout(() => {
        interval();
      }, 1 * 1000);
    }
  }
})();
async function getWeather(location = 101300505) {
  if (localStorage.getItem('weather') && localStorage.getItem('weather_expires') > Date.now()) {
    return JSON.parse(localStorage.getItem('weather'));
  }
  let json = await (
    await fetch(`https://api.qweather.com/v7/weather/now?location=${location}&key=bdd98ec1d87747f3a2e8b1741a5af796`, {
      referrerPolicy: 'no-referrer',
    })
  ).json();
  localStorage.setItem('weather', JSON.stringify(json));
  localStorage.setItem('weather_expires', Date.now() + 10 * 60 * 1000);
  return json;
}
