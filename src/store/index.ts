import daybookStore from '@/modules/daybook/store';
import Vue from 'vue';
import Vuex from 'vuex';
import { extractVuexModule } from 'vuex-class-component';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ...extractVuexModule(daybookStore),
  },
});
