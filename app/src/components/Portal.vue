<template>
  <div>
    <div id="header-portifolio" class="banner banner-backdrop backdrop-opace1 home text-center">
      <div class="banner-heading">
        <img src="../assets/rec-twitter-logo.png" class="mb-4 img-fluid img-logo" width="400" />
        <p class="font-size-sm">A Recommendation System For Twitter</p>
      </div>
      <div class="banner-body">
        <a class="btn btn-primary btn-lg" :href="this.$APIUri('/users/signin')" v-bind:disabled="loading" v-on:click="login()">
          <span v-if="loading">
            <i class="fas fa-spinner fa-pulse"></i>&nbsp;Loading</span>
          <span v-if="!loading"> Login Twitter</span>
        </a>
        <div class="row justify-content-center video-tutorial">
          <div class="col-md-5 col-sm-12">
            <div class="embed-responsive embed-responsive-16by9 mt-5" style="height:400px; margin-left:auto; margin-right:auto">
              <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/HsScQwWdapg" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div id="about" class="banner banner-blue">
      <div class="banner-heading">
        <h1 class="display-4 fancy">
          <span>ABOUT</span>
        </h1>
      </div>
      <div class="banner-body">
        <div class="container">
          <p class="lead text-justify">
            The recommendation system aims to analyze all the tweets received by one user at a time window to verify the interactions such as retweet, like and reply, as also their content. Hence after this analysis, we can measure which content is more similar to another to generate the recommendations proposed such as: follow an account -
            <i>Followee Recommendation</i> or unfollow an account -
            <i>Unfollowee Recommendation</i>.
          </p>
        </div>
      </div>
    </div> -->
    <modal-instructions></modal-instructions>
  </div>
</template>

<script>
import ModalInstructions from "../components/Instructions";
export default {
  name: "LoginTwitter",
  data() {
    return {
      loading: false
    };
  },
  components: {
    ModalInstructions
  },
  methods: {
    login: function() {
      this.loading = true;
    }
  }
};
</script>