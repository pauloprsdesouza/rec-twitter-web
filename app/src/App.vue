<template>
  <div id="app">
    <header>
      <nav-bar-portal></nav-bar-portal>
      <nav-bar-logged :user="user"></nav-bar-logged>
    </header>
    <main v-bind:class="{'container': currentRoute != '/'}">
      <router-view/>
    </main>
    <footer class="footer">
      <div class="container text-center">
        <span class="text-muted">RecTwitter 2018 - &copy;&nbsp;by&nbsp;<a class="text-primary" href="http://paulorsouza.com.br">Paulo Roberto</a></span>
      </div>
    </footer>
    
  </div>
</template>

<script>
import NavBarLogged from "./components/nav-bar/NavBarLogged";
import NavBarPortal from "./components/nav-bar/NavBarPortal";

export default {
  data() {
    return {
      user: {},
      message: { error: null, info: null },
      currentRoute: window.location.pathname,
      loading: false
    };
  },
  components: {
    NavBarLogged,
    NavBarPortal
  },
  methods: {
    getCurrentUser: function() {
      this.$http
        .get(this.$APIUri("/users/details"))
        .then(response => response.json())
        .then(json => {
          this.user = json;
        })
        .catch(response => response.json())
        .then(message => {
          this.message.error = message;
        });
    }
  },
  mounted() {
    if (localStorage.getItem("token")) this.getCurrentUser();
  }
};
</script>