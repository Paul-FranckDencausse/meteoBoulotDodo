<script>
import { store } from '../store';

export default {
  data() {
    return {
      store,
    }
  },
  methods: {
    setSearchKey({ target }) {
      store.search(target.value);
    }
  }
}
</script>

<template>
  <div class="searchBar">
    <div class="uk-search uk-search-navbar search">
      <span class="icon" uk-search-icon></span>
      <input class="uk-search-input searchInput" placeholder="Search location" v-model="this.store.searchKey" @keyup="this.setSearchKey">
    </div>
  </div>
</template>

<style scoped>
.searchBar {
  display: flex;
  justify-content: center;
  margin: 20px 0px;
}
.icon {
  color: #FFF;
}
.search {
  background: rgba(0, 0, 0, 0.2);
  width: 600px;
  border-radius: 45px;
}
.searchInput{
  color: #FFF;
}
::placeholder {
  color: #FFF;
}
</style>
