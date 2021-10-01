import Vue from 'vue'
import App from './components/app/app.vue';
import router from './router/index'
new Vue({
    router,
    el: '#root',
    render: h => h(App)
});