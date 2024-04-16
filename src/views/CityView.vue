<script >
import CityViewCurrentWeather from '../components/CityViewCurrentWeather.vue';
import ManageHeader from '../components/ManageHeader.vue';
import { getWeatherForecast } from '../utils/external';
import { store } from '../store';

export default {
  components: {
    CityViewCurrentWeather,
    ManageHeader
  },
  data() {
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
      const { lat, lng } = this.$route.query

      this.data = await getWeatherForecast(lat, lng)
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      this.error = {
        message: err.message
      };
    }
    
  },
}
</script>

<template>
  <ManageHeader />
  <div class="uk-flex uk-flex-center uk-flex-middle" v-if="isLoading">
    <div uk-spinner="ratio: 2"></div>
  </div>
  <div class="uk-flex uk-flex-center uk-flex-middle" v-if="error.message !== ''">
    <span class="error"> Failed to get weather information</span>
  </div>
  <CityViewCurrentWeather :city="this.$route.params.city" :data="data" v-if="data.temperature !== undefined" />
</template>

<style scoped>
.cardBody {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.city {
  font-weight: 700;
  font-size: 50px;
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
