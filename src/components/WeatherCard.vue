<script>
import { store } from '../store';
import { getLocation, celsiusToFahrenheit } from '../utils';
import { getWeatherInfo } from '../utils/external';

export default {
  methods: {
    celsiusToFahrenheit,
    removeLocation (event) {
      event.preventDefault()
      event.stopPropagation()
      store.removeLocation({ city: this.city });
    },
    open (event) {
      event.preventDefault()
      event.stopPropagation()
      const { lat, lng } = getLocation(this.city);

      window.location = `/city/${this.city}?lat=${lat}&lng=${lng}`;
    }
  },
  props: {
    city: { 
      type: String,
    },
    close: {
      type: Boolean,
    }
  },
  data () {
    return {
      store,
      isLoading: true,
      error: {
        message: ''
      },
      data:{},
    }
  },
  async mounted() {
    try {
      const { lat, lng } = getLocation(this.city);
      
      this.data = await getWeatherInfo(lat, lng)
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      this.error = {
        message: err.message
      };
    }
    
  },
};
</script>

<template>
  <div class="uk-card k-background-cover uk-card-default uk-card-hover card" @click="this.open">
    <button class="uk-modal-close-default close" type="button" uk-close v-if="this.close" @click="this.removeLocation"></button>
    <div class="uk-flex uk-flex-center uk-flex-middle" v-if="isLoading">
      <div uk-spinner="ratio: 2"></div>
    </div>
    <div class="cardBody" v-else-if="data.temperature !== undefined">
      <span class="city">{{ city }}</span>
      <span class="temperature" v-if="store.tempUnit==='c'">{{ this.data.temperature }} &#8451;</span>
      <span class="temperature" v-if="store.tempUnit==='f'">{{ celsiusToFahrenheit(this.data.temperature) }} &#8457;</span>
      <div class="wind">
        <img class="windIcon" src="/wind.png" />
        <span class="windSpeed">{{ this.data.windspeed }} kmph</span>
      </div>
    </div>
    <div class="uk-flex uk-flex-center uk-flex-middle" v-else>
      <span class="error"> Failed to get weather information</span>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 340px;
  min-height: 200px;
  border-radius: 25px;
  margin: 10px;
  padding: 12px;
  background-image: linear-gradient(#4786FC, #89B2FF);
  cursor: pointer;
}
.close {
  color: #FFF;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.2);
  width: 30px;
  height: 30px;
}
.cardBody {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.city {
  font-weight: 700;
  font-size: 30px;
  color: #FFF;
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
.error {
  font-size: 15px;
  color: #FFF;
}
</style>