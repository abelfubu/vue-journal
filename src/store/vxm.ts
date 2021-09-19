import store from '@/store';
import daybookStore from '@/modules/daybook/store';
import { createProxy } from 'vuex-class-component';

export default {
  journal: createProxy(store, daybookStore),
};
