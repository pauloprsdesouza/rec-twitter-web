<template>
  <div>
    <div id="header-portifolio" class="banner banner-backdrop backdrop-opace1 home text-center">
      <div class="banner-heading">
        <img src="../assets/rec-twitter-logo.png" class="mb-5" width="400" />
        <p class="font-size-sm">A Recommendation System From Twitter</p>
      </div>
      <div class="banner-body">
        <a class="btn btn-primary btn-lg" href="http://localhost:8080/twitter/signin" v-on:click="login()">
          <span v-if="loading">
            <i class="fas fa-spinner fa-pulse"></i>&nbsp;Loading</span>
          <span v-if="!loading"> Login Twitter</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginTwitter",
  data() {
    return {
      loading: false
    };
  },
  methods: {
    login:function(){
      this.loading = true;
    }
  }
};
</script>