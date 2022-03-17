import Vue from 'vue';
import vSelect from 'vue-select';

Vue.component('v-select', vSelect);
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line vue/component-definition-name-casing

Vue.component('app-partners', require('~/vue-components/AppPartners.vue').default);

const componentEl = document.getElementById('app'); // элемент dom, внутри которого будет находиться твой компонент

if (componentEl) {
  // eslint-disable-next-line no-unused-vars
  const ComponentName = new Vue({ el: componentEl });
}
