<script>
import { store } from '../store';
import { searchCity } from '../utils/external';

export default {
  watch: {
    searchKey: {
      immediate: true,
      async handler (value) {
        this.results = await searchCity(value)
      }
    },
  },
  props: {
    searchKey: { 
      type: String,
    }
  },
  data() {
    return {
      store,
      results: []
    }
  },
  methods: {
    addLocation(location) {
      store.addLocation(location);
      store.search('')
    }
  }
}
</script>

<template>
  <div class="uk-card uk-card-default searchResult">
    <ul class="uk-list uk-list-divider">
      <li v-for="entry in results">
        <div class="city">
          <a :href="'/city/'+entry.city+'?lat='+entry.lat+'&lng='+entry.lng" class="name">{{  entry.city }}</a>
          <span class="action" @click="this.addLocation(entry)">+Add</span>
        </div>
      </li>
    </ul>
    <span class="emptyResult" v-if="results.length === 0">Refine your search by changing search text!</span>
  </div>
</template>

<style scoped>
.searchResult {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #282a35;
  border-radius: 25px;
  padding: 25px;
}
.city {
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
}
.name{
  font-size: 18px;
  color: #FFF;
}
.action {
  font-size: 18px;
  color: #0F0;
  cursor: pointer;
}
.emptyResult {
  font-size: 16px;
  color: #FFF;
}
</style>
