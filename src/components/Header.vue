<script>
import TemperatureSetting from './TemperatureSetting.vue'

export default {
  components: {
    TemperatureSetting
  }
}
</script>

<template>
  <div class="navBar">
    <div class="corner">
      <div class="menuIcon">
        <a href="/manage">
          <img src="/menu.png" />
        </a>
      </div>
    </div>
    <div class="header">
      <span class="title">Weather</span>
    </div>
    <div class="corner">
      <div class="menuIcon" type="button">
        <img src="/temperature.png"/>
      </div>
      <div uk-drop="mode: click">
        <TemperatureSetting />
      </div>
    </div>
</div>
</template>
