import Vue from 'vue';
import AppInfiniteLine from '~/vue-components/AppInfiniteLine.vue';

export default {
  init() {
    document.querySelectorAll('.s-line').forEach((el) => new Vue({
      el,
      components: {
        AppInfiniteLine,
      },
    }));
  },
};
