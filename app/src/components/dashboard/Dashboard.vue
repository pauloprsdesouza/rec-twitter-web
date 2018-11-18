<template>
  <div id="Dashboard">
    <div class="alert alert-dismissible fade show" :class="{'alert-success': message.info, 'alert-danger': message.error}" v-if="message.info || message.error " role="alert">
      <span v-if="message.info">{{message.info}}</span>
      <span v-if="message.error">{{message.error}}</span>
      <button type="button" class="close" v-on:click="clearMessage()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="jumbotron jumbotron-fluid mb-3">
      <div class="container">
        <h1 class="display-5">Dashboard</h1>
        <p class="lead">This shows the information over your account.</p>
        <p class="text-muted" v-if="userData.lastUpdate"> Last update at
          <b>{{userData.lastUpdate}}</b>
        </p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-sm-3">
        <button id="btnPopoverDashboard" class="btn btn-primary btn-lg btn-block pt-3 pb-3" v-on:click="updateInformations()" v-bind:disabled="loading || updating" data-container="body" data-toggle="popover" data-placement="top" data-content="Hello, welcome to Rectwitter click here to begin.">
          <span v-if="!loading && updating">
            <i class="fas fa-spinner fa-pulse fa-3x align-middle"></i>&nbsp;Updating</span>
          <span v-if="!updating && loading">
            <i class="fas fa-spinner fa-pulse fa-3x align-middle"></i>&nbsp;Loading</span>
          <span v-if="!loading && !updating">
            <i class="fas fa-cloud-download-alt fa-3x align-middle"></i>&nbsp;Update</span>
        </button>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-sm-3">
        <button class="btn btn-success btn-lg btn-block pt-3 pb-3" data-toggle="modal" data-target="#modalRecommendationsAccepted">
          <i class="fas fa-check-circle fa-3x align-middle"></i>
          Accepted
        </button>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-sm-3">
        <button class="btn btn-danger btn-lg btn-block pt-3 pb-3" data-toggle="modal" data-target="#modalRecommendationsRefused">
          <i class="fas fa-times-circle fa-3x align-middle"></i>&nbsp;Refused
        </button>
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Overview</h5>
        <div class="row justify-content-center text-center">
          <div class="col-lg-2 col-md-4 col-sm-4 col-xs-6 p-2">
            <div class="card">
              <div class="card-header">
                <b>Tweets</b>
              </div>
              <div class="card-body">
                <blockquote class="blockquote">
                  <i class="fab fa-twitter text-primary"></i> &nbsp;
                  <i v-if="loading || updating" class="fas fa-spinner fa-pulse align-middle"></i>
                  <span v-if="!loading && !updating">{{userData.totalTweets}}</span>
                </blockquote>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-4 col-sm-4 col-xs-6 p-2">
            <div class="card">
              <div class="card-header">
                <b>Followings</b>
              </div>
              <div class="card-body">
                <blockquote class="blockquote">
                  <i class="fas fa-users"></i>&nbsp;
                  <i v-if="loading || updating" class="fas fa-spinner fa-pulse align-middle"></i>
                  <span v-if="!loading && !updating">{{userData.totalFollowings}}</span>
                </blockquote>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-4 col-sm-4 col-xs-6 p-2">
            <div class="card">
              <div class="card-header">
                <b>Followers</b>
              </div>
              <div class="card-body">
                <blockquote class="blockquote">
                  <i class="fas fa-users"></i>&nbsp;
                  <i v-if="loading || updating" class="fas fa-spinner fa-pulse align-middle"></i>
                  <span v-if="!loading && !updating">{{userData.totalFollowers}}</span>
                </blockquote>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-4 col-sm-4 col-xs-6 p-2">
            <div class="card">
              <div class="card-header">
                <b>Likes</b>
              </div>
              <div class="card-body">
                <blockquote class="blockquote">
                  <i class="far fa-heart text-danger"></i>&nbsp;
                  <i v-if="loading || updating" class="fas fa-spinner fa-pulse align-middle"></i>
                  <span v-if="!loading && !updating">{{userData.totalLikes}}</span>
                </blockquote>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-4 col-sm-4 col-xs-6 p-2">
            <div class="card">
              <div class="card-header">
                <b>Retweets</b>
              </div>
              <div class="card-body">
                <blockquote class="blockquote">
                  <i class="fas fa-retweet text-success"></i>&nbsp;
                  <i v-if="loading || updating" class="fas fa-spinner fa-pulse align-middle"></i>
                  <span v-if="!loading && !updating">{{userData.totalRetweets}}</span>
                </blockquote>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-4 col-sm-4 col-xs-6 p-2">
            <div class="card">
              <div class="card-header">
                <b>Replies</b>
              </div>
              <div class="card-body">
                <blockquote class="blockquote">
                  <i class="far fa-comment text-info"></i>&nbsp;
                  <i v-if="loading || updating" class="fas fa-spinner fa-pulse align-middle"></i>
                  <span v-if="!loading && !updating">{{userData.totalReplies}}</span>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Frequency of the Keywords</h5>
        <h6 class="card-subtitle mb-2 text-muted">Tweet's keywords extracted from the timeline for you to understand the approached context better.</h6>
        <words-cloud :key-words="words" :text="textEmptyTweet" :loading="loading || updating"></words-cloud>
      </div>
    </div>
    <modal-recommendations-refused></modal-recommendations-refused>
    <modal-recommendations-accepted></modal-recommendations-accepted>
  </div>
</template>

<script>
import WordsCloud from "@/components/commons/WordsCloud";
import ModalRecommendationsRefused from "@/components/dashboard/modal/ModalRecommendationsRefused";
import ModalRecommendationsAccepted from "@/components/dashboard/modal/ModalRecommendationsAccepted";

export default {
  name: "Dashboard",
  data() {
    return {
      userData: {},
      loading: false,
      updating: false,
      message: { error: null, info: null },
      words: [],
      textEmptyTweet: ""
    };
  },
  components: {
    WordsCloud,
    ModalRecommendationsRefused,
    ModalRecommendationsAccepted
  },
  methods: {
    clearMessage: function() {
      this.message = { error: null, info: null };
    },
    getResume: function() {
      this.loading = true;

      this.$http
        .get(this.$APIUri("/users/resume"))
        .then(response => response.json())
        .then(json => {
          this.userData = json.data;
          this.words = json.words;

          if (this.userData.totalTweets == 0) {
            this.textEmptyTweet =
              "Update your information for generating keywords.";

            $("#btnPopoverDashboard").popover("show");
          } else {
            $("#btnPopoverDashboard").popover("hide");
          }
        })
        .catch(response => response.json())
        .then(message => {
            this.message.error = message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateInformations: function() {
      this.updating = true;

      this.$http
        .get(this.$APIUri("/twitter/extract-data"))
        .then(response => {
          this.getResume();
        })
        .catch(response => response.json())
        .then(message => {
            this.message.error = message;
        })
        .finally(() => {
          this.updating = false;
        });
    }
  },
  mounted() {
    this.getResume();
  }
};
</script>