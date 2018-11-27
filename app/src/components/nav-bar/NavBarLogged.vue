<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="currentRoute != '/' && currentRoute != '/unauthorized' && currentRoute != '/instructions'">
        <div class="container">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="/dashboard">RecTwitter</a>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0" >
                    <li class="nav-item" :class="{'active': linkActive('/dashboard')}">
                        <a class="nav-link" href="/dashboard">Dashboard
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item" :class="{'active': linkActive('/recommendations')}">
                        <a class="nav-link" href="/recommendations">Recomendações</a>
                    </li>
                    <li class="nav-item" :class="{'active': linkActive('/about')}">
                        <a class="nav-link" href="/about">Sobre</a>
                    </li>
                </ul>
                <ul class="navbar-nav my-2 my-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img class="rounded-circle img-fluid" width="30" :src="user.profileImageUrl" /> {{user.name}}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#" v-on:click="logout()">
                                <i class="fas fa-sign-out-alt"></i>&nbsp;Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      currentRoute: window.location.pathname
    };
  },
  methods: {
    linkActive: function(currentPath) {
      var path = window.location.pathname;
      return path === currentPath;
    },
    logout: function() {
      this.$http
        .get(this.$APIUri("/users/signout"))
        .then(() => {
          window.location.href = "/";
        })
        .finally(() => {
          localStorage.removeItem("token");
        });
    }
  }
};
</script>

