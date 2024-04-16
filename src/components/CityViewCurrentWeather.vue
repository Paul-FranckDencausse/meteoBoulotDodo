<script >
import { celsiusToFahrenheit, getDayText, getWeatherStatus, getMostFrequentWeather } from '../utils'
import { store } from '../store';

export default {
  props: {
    city: {
      type: String,
    },
    data: {
      type: Object,
    }
  },
  data() {
    return {
      store,
    }
  },
  methods: {
    celsiusToFahrenheit,
    getDayText,
    getWeatherStatus,
    getMostFrequentWeather,
  },
}
</script>

<template>
  <div class="forecastView" if="data.temperature !== undefined">
    <span class="city">{{ city }}</span>
    <span class="temperature" v-if="store.tempUnit === 'c'">{{ this.data.temperature }} &#8451;</span>
    <span class="temperature" v-if="store.tempUnit === 'f'">{{ celsiusToFahrenheit(this.data.temperature) }} &#8457;</span>
    <div class="wind">
      <img class="windIcon" src="/wind.png" />
      <span class="windSpeed">{{ this.data.windspeed }} kmph</span>
    </div>
    <div class="hourViewContainer">
      <span class="hourViewTitle">Next 24 hours forecast</span>
      <div class="hourView">
        <div class="hourTemp" v-for="entry in data.hourly">
          <div>
            <span class="hour">{{  entry.hour }}</span> <br />
            <img class="hourIcon" :src="'/'+getWeatherStatus(entry.weathercode, entry.hour)+'.png'" /> 
            <br />
            <span class="temp" v-if="store.tempUnit === 'c'">{{ entry.temperature }} &#8451;</span>
            <span class="temp" v-if="store.tempUnit === 'f'">{{ celsiusToFahrenheit(entry.temperature) }} &#8457;</span>
          </div>
        </div>
      </div>
    </div>
    <div class="dayView">
      <div>
        <span class="dayViewTitle">Next 7 days forecast</span>
      </div>
      <div class="dayTemp" v-for="entry in Object.keys(data.daily).sort()">
        <span class="dayViewDay">{{ getDayText(entry) }} </span>
        <div class="dayViewWeather">
          <img class="dayViewIcon" :src="'/'+getWeatherStatus(getMostFrequentWeather(data.daily[entry].weathercode))+'.png'"/> 
        </div>
        <div class="dayViewMin">
          <img class="dayViewIcon" alt="low" src="/low.png" /> 
          <span v-if="store.tempUnit === 'c'">{{ data.daily[entry].min }} &#8451;</span>
          <span v-if="store.tempUnit === 'f'">{{ celsiusToFahrenheit(data.daily[entry].min) }} &#8457;</span>
        </div>
        <div class="dayViewMax">
          <img class="dayViewIcon" alt="high" src="/high.png" /> 
          <span v-if="store.tempUnit === 'c'">{{ data.daily[entry].max }} &#8451;</span>
          <span v-if="store.tempUnit === 'f'">{{ celsiusToFahrenheit(data.daily[entry].max) }} &#8457;</span>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<style scoped>
.forecastView {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.city {
  font-weight: 700;
  font-size: 50px;
  color: #FFF;
  text-align: center;
}

.temperature {
  font-weight: 400;
  font-size: 50px;
  color: #FFF;
}

.wind {
  display: flex;
  align-items: center;
}

.windIcon {
  margin: 10px;
  width: 32px;
}

.windSpeed {
  font-weight: 400;
  font-size: 20px;
  color: #FFF;
}
.hourViewContainer {
  width:100%;
  height: 125px;
  overflow: hidden;
  border-radius: 25px;
  padding: 12px;  
  background-color: #4786FC;
}
.hourViewTitle {
  color: #FFF;
  margin-left: 12px;
  font-size: 16px;
  font-style: italic;
  text-decoration: underline;
}
.hourView {
  height:120px;
  padding:5px;
  white-space:nowrap;
  overflow-x: scroll;
  overflow-y: hide;
  -webkit-overflow-scrolling:touch;
}
.hourTemp{
  display:inline-block;
  width:90px;
  height:65px;
  text-align: center;
}
.hour {
  color: #FFF;
  font-weight: 600;
}
.temp {
  color: #FFF;
  font-weight: 600;
}
.hourIcon {
  width: 25px;
  margin: 10px 0px;
}
.dayView {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 25px;
  padding: 12px; 
  margin-top: 25px;
  background-color: #4786FC;  
}
.dayViewTitle {
  color: #FFF;
  margin-left: 12px;
  font-size: 16px;
  font-style: italic;
  text-decoration: underline;
}
.dayTemp {
  display: flex;
  justify-content: space-between;
  color: #FFF;
  margin: 5px 10px;
  align-items: center;
}
.dayViewDay {
  width: 30%;
}
.dayViewWeather {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dayViewIcon {
  width: 25px;
  margin: 10px 0px;
}
.dayViewMin {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dayViewMax {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
