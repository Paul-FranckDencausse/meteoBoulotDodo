const key = 'weather_app';

export const getConfiguration = () => {
  const defaultStore = {
    tempUnit: 'c',
    locations: [
      { city: 'Chennai, India', lat: 13.08784, lng: 80.27847 },
      { city: 'London, United Kingdom', lat: 51.50853, lng: -0.12574 },
      { city: 'New York, United States', lat: 40.71427, lng: -74.00597 },
      { city: 'Oslo, Norway', lat: 59.91273, lng: 10.74609 },
      { city: 'Singapore, Singapore', lat: 1.28967, lng: 103.85007 },
      { city: 'Washington, United States', lat: 38.89511, lng: -77.03637 }
    ]
  };

  return JSON.parse(localStorage[key] || JSON.stringify(defaultStore));
}

export const getLocation = (city) => {
  const { locations } = getConfiguration();

  return (locations || []).find((l) => l.city === city);
}

export const persistConfiguration = (config) => {
  localStorage.setItem(key, JSON.stringify(config))
}

export const celsiusToFahrenheit = (c) => {
  return (c * 9 / 5 + 32).toFixed(1);
}

export const getDayText = (date) => {
  const today =  new Date().toISOString().slice(0, 10);
  const day = new Date(date).getDay();
  const dayMapping = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };

  return today === date ? 'Today' : dayMapping[day];
}

export const getWeatherStatus = (weathercode, hour) => {
  if (weathercode <= 0) {
    if (hour && hour < 6 || hour > 17) {
      return 'moon';
    }
    return 'clearsky';
  }
  if (weathercode <=48) {
    return 'cloudy';
  }
  if (weathercode <=57) {
    return 'drizzle';
  }
  if (weathercode <= 67) {
    return 'rain';
  }
  if (weathercode <=86) {
    return 'snow';
  }
  if (weathercode <= 99) {
    return 'thunderstorm';
  }
  if (hour && hour >= 6 && hour <= 17) {
    return 'moon';
  }
  return 'clearsky';
}

export const getMostFrequentWeather = (weathercodes) => {
  const codeMapping = (weathercodes || [0]).reduce((acc, code) => {
    if (!acc[code]) {
      acc[code] = 0;
    }
    acc[code]++;

    return acc;
  }, {});

  return Object.keys(codeMapping).reduce((acc, code) => (
    (codeMapping[acc] < codeMapping[code]) ? code : acc
  ));
}
