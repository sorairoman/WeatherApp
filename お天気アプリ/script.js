async function getWeather() {
  const city = document.getElementById('city').value;
  if (!city) {
    alert('都市名を入力してください');
    return;
  }

  const apiKey = 'fef84ab5a83ef28db9703c6739eab9c1'; // OpenWeatherMapのAPIキーを設定
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById('weather-output').innerText = `エラー: ${data.message}`;
      return;
    }

    const weatherDescription = data.weather[0].description;
    const weatherMain = data.weather[0].main; // 天気の主要カテゴリ
    const temperature = data.main.temp;

    // 傘の必要性を判定
    let umbrellaNeeded = '';
    if (weatherMain === 'Rain' || weatherMain === 'Drizzle' || weatherMain === 'Thunderstorm') {
      umbrellaNeeded = '傘が必要です☔️';
    } else {
      umbrellaNeeded = '傘は不要です😊';
    }

    document.getElementById('weather-output').innerHTML = `
      <h2>${city}</h2><span>の天気</span>
      <p>天気: ${weatherDescription}</p>
      <p>気温: ${temperature}℃</p>
      <p><strong>${umbrellaNeeded}</strong></p>
    `;
  } catch (error) {
    document.getElementById('weather-output').innerText = '情報の取得に失敗しました';
  }
}
