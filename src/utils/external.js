export const getWeatherInfo = async (lat, lng) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
  const response = await (await fetch(url)).json();
  const current = response.current_weather;
  
  return {
    temperature: current.temperature,
    weathercode: current.weathercode,
    winddirection: current.winddirection,
    windspeed: current.windspeed
  }
};

export const searchCity = async (searchKey) => {
  const url =`https://geocoding-api.open-meteo.com/v1/search?name=${searchKey}`
  const response = await (await fetch(url)).json();
  const { results = [] } = response;
  const uniqueCities = new Set([]);

  return results.reduce((acc, { name, country, latitude, longitude }) => {
    const city = `${name}, ${country || ''}`;
    
    if (!uniqueCities.has(city)) {
      uniqueCities.add(city);
      acc.push({ city, lat: latitude, lng: longitude });
    }
    return acc;
  }, [])
};

export const getWeatherForecast = async (lat, lng) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,weathercode`;
  const response = await (await fetch(url)).json();
  const current = response.current_weather;
  const hourly = [];
  const daily = {};

  let index = 0;
  while(hourly.length < 24) {
    if (response.hourly.time.length < index) {
      break;
    }
    if (current.time <= response.hourly.time[index]) {
      hourly.push({
        hour: (new Date(response.hourly.time[index])).getHours(),
        temperature: response.hourly.temperature_2m[index],
        weathercode: response.hourly.weathercode[index],
      });
    }
    index++;
  }
  for(index = 0; index < response.hourly.time.length; index++) {
    const time = response.hourly.time[index].split('T')[0];
    const temp = response.hourly.temperature_2m[index];
    const weathercode = response.hourly.weathercode[index];

    if (daily[time]) {
      if (daily[time].min > temp) {
        daily[time].min = temp;
      }
      if (daily[time].max < temp) {
        daily[time].max = temp;
      }
      daily[time].weathercode.push(weathercode);
    } else {
      daily[time] = {
        min: temp,
        max: temp,
        weathercode: [weathercode]
      }
    }
  }

  return {
    temperature: current.temperature,
    weathercode: current.weathercode,
    winddirection: current.winddirection,
    windspeed: current.windspeed,
    hourly,
    daily,
  }
};
