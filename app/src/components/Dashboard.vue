<template>
  <div id="Dashboard">

    <div class="row align-items-center mt-4">
      <div class="col-md-12">
        <h1 class="display-4 float-left">Dashboard</h1>
        <button class="btn btn-primary btn-lg float-right" v-on:click="updateInformations()" v-bind:disabled="loading">
          <span v-if="loading">
            <i class="fas fa-spinner fa-pulse"></i>&nbsp;Loading</span>
          <span v-if="!loading">Update Informations</span>
        </button>
      </div>
    </div>

    <div class="card mb-4 mt-4">
      <div class="card-body">
        <h5 class="card-title">Overview</h5>
        <div class="row justify-content-center text-center">
          <div class="col mb-4">
            <div class="card">
              <div class="card-header">
                <b>Tweets</b>
              </div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <i class="fab fa-twitter text-primary"></i> &nbsp;{{userData.totalTweets}}
                </blockquote>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-header">
                <b>Followings</b>
              </div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <i class="fas fa-users"></i>&nbsp;{{userData.totalFollowings}}
                </blockquote>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-header">
                <b>Followers</b>
              </div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <i class="fas fa-users"></i>&nbsp;{{userData.totalFollowers}}
                </blockquote>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-header">
                <b>Likes</b>
              </div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <i class="far fa-heart text-danger"></i>
                  &nbsp;{{userData.totalLikes}}
                </blockquote>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-header">
                <b>Retweets</b>
              </div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <i class="fas fa-retweet text-success"></i>&nbsp;{{userData.totalRetweets}}
                </blockquote>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-header">
                <b>Replies</b>
              </div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <i class="far fa-comment text-info"></i>&nbsp;{{userData.totalReplies}}
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col">
        <div class="card">
          <div class="card-header">
            Recommendations Refused
          </div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">
            Recommendations Accepted
          </div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      userData: {},
      loading: false
    };
  },
  methods: {
    getResume: function() {
      this.$http
        .get("http://localhost:8080/twitter/resume")
        .then(function(response) {
          this.userData = response.body;
        });
    },
    updateInformations: function() {
      this.loading = true;

      this.$http
        .get("http://localhost:8080/twitter/extract-data")
        .then(function(response) {
          this.getResume();
          this.loading = false;
        });
    }
  },
  mounted() {
    this.getResume();
  }
};
</script>