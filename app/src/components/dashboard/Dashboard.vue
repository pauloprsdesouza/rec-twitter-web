<template>
  <div id="Dashboard">
    <div class="alert alert-dismissible fade show" :class="{'alert-success': message.info, 'alert-danger': message.error}" v-if="message.success || message.error " role="alert">
      <span v-if="message.info">{{message.info}}</span>
      <span v-if="message.error">{{message.error}}</span>
      <button type="button" class="close" v-on:click="clearMessage()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-5">Dashboard</h1>
        <p class="lead">This show the information over his account.</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col mt-2">
        <button id="btnPopoverDashboard" class="btn btn-primary btn-lg btn-block pt-3 pb-3" v-on:click="updateInformations()" v-bind:disabled="loading" data-container="body" data-toggle="popover" data-placement="top" data-content="Hello, welcome to Rectwitter click here to begin.">
          <span v-if="loading">
            <i class="fas fa-spinner fa-pulse fa-3x align-middle"></i>&nbsp;Extracting information</span>
          <span v-if="!loading">
            <i class="fas fa-cloud-download-alt fa-3x align-middle"></i>&nbsp;Update Informations</span>
        </button>
      </div>
      <div class="col mt-2">
        <button class="btn btn-success btn-lg btn-block pt-3 pb-3" data-toggle="modal" data-target="#modalRecommendationsAccepted">
          <i class="fas fa-check-circle fa-3x align-middle"></i>
          Recommendations Accepted
        </button>
      </div>
      <div class="col mt-2">
        <button class="btn btn-danger btn-lg btn-block pt-3 pb-3" data-toggle="modal" data-target="#modalRecommendationsRefused">
          <i class="fas fa-times-circle fa-3x align-middle"></i>&nbsp;Recommendations Refused
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
                  <i class="fab fa-twitter text-primary"></i> &nbsp;
                  <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
                  <span v-if="!loading">{{userData.totalTweets}}</span>
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
                  <i class="fas fa-users"></i>&nbsp;
                  <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
                  <span v-if="!loading">{{userData.totalFollowings}}</span>
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
                  <i class="fas fa-users"></i>&nbsp;
                  <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
                  <span v-if="!loading">{{userData.totalFollowers}}</span>
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
                  <i class="far fa-heart text-danger"></i>&nbsp;
                  <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
                  <span v-if="!loading">{{userData.totalLikes}}</span>
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
                  <i class="fas fa-retweet text-success"></i>&nbsp;
                  <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
                  <span v-if="!loading">{{userData.totalRetweets}}</span>
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
                  <i class="far fa-comment text-info"></i>&nbsp;
                  <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
                  <span v-if="!loading">{{userData.totalReplies}}</span>
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
        <h6 class="card-subtitle mb-2 text-muted">Tweet's keywords extracted from the timeline for you better understand the approached context.</h6>
        <words-cloud :key-words="words" :text="textEmptyTweet" :loading="loading"></words-cloud>
      </div>
    </div>
    <modal-recommendations-refused></modal-recommendations-refused>
    <modal-recommendations-accepted></modal-recommendations-accepted>
  </div>
</template>

<script>
import WordsCloud from "../../components/commons/WordsCloud";
import ModalRecommendationsRefused from "../../components/dashboard/modal/ModalRecommendationsRefused";
import ModalRecommendationsAccepted from "../../components/dashboard/modal/ModalRecommendationsAccepted";

export default {
  name: "Dashboard",
  data() {
    return {
      userData: {},
      loading: false,
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
        .get(this.$APIUri("/twitter/resume"))
        .then(response => response.json())
        .then(json => {
          this.userData = json.data;
          this.words = json.words;

          if (this.userData.totalTweets == 0) {
            this.textEmptyTweet =
              "Update his information for generating keywords.";

            $("#btnPopoverDashboard").popover("show");
          } else {
            $("#btnPopoverDashboard").popover("hide");
          }
        })
        .catch(response => response.text())
        .then(message => {
          this.message.error = message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateInformations: function() {
      this.loading = true;

      this.$http
        .get(this.$APIUri("/twitter/extract-data"))
        .then(response => {
          this.getResume();
        })
        .catch(response => response.text())
        .then(message => {
          this.message.error = message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getRecommendationAccepted: function() {
      this.loadingRecommendationAccepted = true;

      this.$http
        .post(this.$APIUri("/recommendations/accepted"), {
          pagination: this.paginationAccepted
        })
        .then(response => response.json())
        .then(json => {
          this.recommendationsAccepted = json.recommendations;
          this.paginationAccepted = json.pagination;
        })
        .catch(response => response.text())
        .then(message => {
          this.message.error = message;
        })
        .finally(() => {
          this.loadingRecommendationAccepted = false;
        });
    }
  },
  mounted() {
    this.getResume();
  }
};
</script>