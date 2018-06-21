<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="currentRoute != '/'">
        <div class="container">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="/">RecTwitter</a>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">

            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a class="nav-link" href="/dashboard">Dashboard
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/recommendations">Recommendations</a>
              </li>
            </ul>
            <ul class="navbar-nav my-2 my-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img class="rounded-circle img-fluid" width="30" :src="user.profileImageUrl" /> {{user.name}}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Profile</a>
                  <a class="dropdown-item" href="#" v-on:click="logout()">
                    <i class="fas fa-sign-out-alt"></i>&nbsp;Logout</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <main v-bind:class="{'container': currentRoute != '/'}">
      <router-view/>
    </main>
    <footer class="footer">
      <div class="container text-center">
        <span class="text-muted">RecTwitter 2018 - &copy; All Rights Reserved</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      user: {},
      currentRoute: window.location.pathname
    };
  },
  methods: {
    logout: function() {
      this.$http
        .get("http://localhost:8080/twitter/signout")
        .then(function(response) {
          localStorage.setItem("token", null);
        });
    },
    getCurrentUser: function() {
      this.$http
        .get("http://localhost:8080/users/details")
        .then(function(response) {
          this.user = response.body;
        });
    }
  },
  mounted() {
    if (this.currentRoute != "/") this.getCurrentUser();
  }
};
</script>