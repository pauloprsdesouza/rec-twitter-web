// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.config.productionTip = false;

Vue.use(VueResource)

Vue.prototype.$APIUri = function (path) {
  return 'http://rectwitterapi-env.qvp8mkewsj.sa-east-1.elasticbeanstalk.com' + path;
 // return 'http://localhost:8080' + path;
}

Vue.http.interceptors.push((request, response) => {
  var token;

  if (window.location.pathname === '/dashboard') {
    token = getParameterByName('token');

    if (token) {
      localStorage.setItem("token", token);
    } else {
      token = localStorage.getItem("token");
    }
  } else {
    token = localStorage.getItem("token");
  }

  request.headers.set('Content-Type', 'application/json');
  request.headers.set('Authorization', 'Bearer ' + token);

  response((response) => {
    if (response.status === 401) {
      window.location.href = '/unauthorized';
      localStorage.removeItem("token");
    }

    if (response.status === 500) {
      window.location.href = '/internal-error';
    }
  });
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
