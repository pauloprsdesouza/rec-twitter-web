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
            Recommendations Accepted
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th class="text-center">Recommended</th>
                  <th class="text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="recommendation in recommendationsAccepted" :key="recommendation.id">
                  <td><img class="rounded-circle img-fluid" width="30" :src="recommendation.user.profileImageUrl" /> {{recommendation.user.name}}</td>
                  <td class="text-center">
                    <span class="badge badge-success" v-if="recommendation.toFollow" v-bind:disabled="recommendation.acceptanceDate">Follow</span>
                    <span class="badge badge-danger" v-if="!recommendation.toFollow" v-bind:disabled="recommendation.acceptanceDate">Unfollow</span>
                  </td>
                  <td class="text-center">{{recommendation.acceptanceDate}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3">
                    <pagination-component :pagination-begin="getRecommendationAccepted" :update="getRecommendationAccepted" :current-pagination="paginationAccepted" :limit="5"></pagination-component>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">
            Recommendations Canceled
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th class="text-center">Recommended</th>
                  <th class="text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="recommendation in recommendationsRefused" :key="recommendation.id">
                  <td><img class="rounded-circle img-fluid" width="30" :src="recommendation.user.profileImageUrl" /> {{recommendation.user.name}}</td>
                  <td class="text-center">
                    <span class="badge badge-success" v-if="recommendation.toFollow" v-bind:disabled="recommendation.acceptanceDate">Follow</span>
                    <span class="badge badge-danger" v-if="!recommendation.toFollow" v-bind:disabled="recommendation.acceptanceDate">Unfollow</span>
                  </td>
                  <td class="text-center">{{recommendation.cancelDate}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3">
                    <pagination-component :pagination-begin="getRecommendationRefused" :update="getRecommendationRefused" :current-pagination="paginationRefused" :limit="5"></pagination-component>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationComponent from "../components/commons/PaginationComponent";
export default {
  name: "Dashboard",
  data() {
    return {
      userData: {},
      loading: false,
      recommendationsAccepted: [],
      recommendationsRefused: [],
      paginationRefused: {},
      paginationAccepted: {}
    };
  },
  components: {
    PaginationComponent
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
    },
    getRecommendationAccepted: function() {
      console.log(this.paginationAccepted);
      this.$http
        .post("http://localhost:8080/recommendations/accepted", {
          pagination: this.paginationAccepted
        })
        .then(function(response) {
          this.recommendationsAccepted = response.body.recommendations;
          this.paginationAccepted = response.body.pagination;
        });
    },
    getRecommendationRefused: function() {
      this.$http
        .post("http://localhost:8080/recommendations/refused", {
          pagination: this.paginationRefused
        })
        .then(function(response) {
          this.recommendationsRefused = response.body.recommendations;
          this.paginationRefused = response.body.pagination;
        });
    }
  },
  mounted() {
    this.getResume();
  }
};
</script>