<script >
import ManageHeader from '../components/ManageHeader.vue';
import WeatherCard from '../components/WeatherCard.vue';
import { store } from '../store';

export default {
  components: {
    ManageHeader,
    WeatherCard
  },
  data() {
    return {
      store,
    }
  },
}
</script>

<template>
  <ManageHeader />
  <div class="weatherCards">
    <WeatherCard :city="location.city" :close="true" v-for="location in store.locations" />
  </div>
</template>
