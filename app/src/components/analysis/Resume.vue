<template>
  <div id="Resume">
        <div class="jumbotron-clean mb-3">
        <h1 class="display-4">Resume total itens</h1>
        </div>
        <ul class="list-group">
            <li class="list-group-item"><b>Total users:</b> {{totalUsers}}</li>
            <li class="list-group-item"><b>Total Tweets:</b> {{totalTweets}}</li>
            <li class="list-group-item"><b>Total Recommendations:</b> {{totalRecommendations}}</li>
        </ul>
        <div class="jumbotron-clean mb-3 mt-3">
            <h1 class="display-4">Users registered</h1>
        </div>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Created At</th>
                    <th>Last Access</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td><img class="rounded-circle img-fluid" width="35" :src="user.profileImageUrl" />&nbsp;{{user.name}}</td>
                    <td>{{user.createdAt}}</td>
                    <td>{{user.lastAccess}}</td>
                </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-center">
                    <span v-if="loading">
                        <i class="fas fa-spinner fa-pulse fa-2x align-middle"></i>&nbsp;Loading
                    </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      message: { error: null, success: null },
      loading: false,
      totalUsers: 0,
      totalTweets: 0,
      totalRecommendations: 0
    };
  },
  methods: {
    getResume: function() {
      this.loading = true;

      this.$http
        .get(this.$APIUri("/resume/generate"))
        .then(response => response.json())
        .then(json => {
          this.totalUsers = json.totalUsers;
          this.totalTweets = json.totalTweets;
          this.totalRecommendations = json.totalRecommendations;
        })
        .catch(response => response.json())
        .then(response => {
          this.message.error = response;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getAllUsers: function() {
      this.loading = true;

      this.$http
        .get(this.$APIUri("/users/all"))
        .then(response => response.json())
        .then(json => {
          this.users = json;
        })
        .catch(response => response.json())
        .then(response => {
          this.message.error = response;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.getAllUsers();
    this.getResume();
  }
};
</script>