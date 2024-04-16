<script>
import Header from '../components/Header.vue';
import SearchBar from '../components/SearchBar.vue';
import SearchResult from '../components/SearchResult.vue';
import WeatherCard from '../components/WeatherCard.vue';
import { store } from '../store';

export default {
  components: {
    Header,
    SearchBar,
    SearchResult,
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
  <Header />
  <SearchBar />
  <SearchResult :searchKey="this.store.searchKey"  v-if="this.store.searchKey"/>
  <div class="weatherCards" v-else>
    <WeatherCard :city="location.city" v-for="location in store.locations" />
  </div>
</template>
