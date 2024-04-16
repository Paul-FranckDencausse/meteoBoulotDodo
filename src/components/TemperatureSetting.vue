<script>
import { store } from '../store.js'

export default {
  data() {
    return {
      store,
      isChecked: store.tempUnit === 'f',
    }
  },
  methods: {
    setTempUnit({ target }) {
      store.setTempUnit(target.checked ? 'f' : 'c');
    }
  }
}
</script>

<template>
  <div class="uk-card uk-card-default card">
    <div class="contents">
      <div class="title">
        Metric / Imperial
      </div>
      <div class="meter">
        <span class="unit">&#8451;</span>
        <label class="switch">
          <input type="checkbox" v-model="isChecked" @click="this.setTempUnit">
          <span class="slider"></span>
        </label>
        <span class="unit">&#8457;</span>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  background-color: #282a35;
  border-radius: 25px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #4f4f4f;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #282a35;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}
input:checked+.slider {
  background-color: #5cff6d;
}
input:focus+.slider {
  box-shadow: 0 0 1px #282a35;
}
input:checked+.slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.contents {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}
.title {
  font-size: 20px;
  font-weight: 700;
  color: #FFF;
}
.meter {
  display: flex;
  align-items: center;
  padding-top: 10px;
}
.unit {
  font-size: 20px;
  padding: 0px 15px;
  color: #FFF;
  font-weight: 700;
}
</style>