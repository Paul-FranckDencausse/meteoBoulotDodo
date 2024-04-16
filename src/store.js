import { reactive } from 'vue'
import { getConfiguration, persistConfiguration } from './utils';

const local = getConfiguration();

export const store = reactive({
  tempUnit: local.tempUnit ,
  locations: local.locations,
  searchKey: '',
  setTempUnit(unit) {
    this.tempUnit = unit;
    this.persistInLocalStore();
  },
  addLocation(location) {
    if (!this.locations.find((l) => l.city === location.city)) {
      this.locations.push(location);
      this.persistInLocalStore();
    }
  },
  removeLocation(location) {
    this.locations = this.locations.filter((l) => l.city !== location.city)
    this.persistInLocalStore();
  },
  search(key) {
    this.searchKey = key;
  },
  persistInLocalStore() {
    persistConfiguration({ tempUnit: this.tempUnit, locations: this.locations })
  }
});
