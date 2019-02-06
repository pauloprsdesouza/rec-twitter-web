<template>
  <div id="Resume">
    <div class="jumbotron-clean mb-3">
      <h1 class="display-4">Resumo geral</h1>
    </div>
    <ul class="list-group">
      <li class="list-group-item">
        <b>Total de usuários:</b>
        {{totalUsers}}
      </li>
      <li class="list-group-item">
        <b>Total de tweets:</b>
        {{totalTweets}}
      </li>
      <li class="list-group-item">
        <b>Total de recomendações:</b>
        {{totalRecommendations}}
      </li>
      <li class="list-group-item">
        <b>Total de erros:</b>
        {{totalErrors}}
      </li>
    </ul>
    <div class="jumbotron-clean mb-3 mt-3">
      <h1 class="display-4">Usuários registrados</h1>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>User</th>
            <th class="text-center">Total de Tweets</th>
            <th class="text-center">Recomendações geradas</th>
            <th class="text-center">Avaliadas</th>
            <th>Último acesso</th>
            <th>Enviar e-mail para</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              <img class="rounded-circle img-fluid" width="35" :src="user.profileImageUrl">
              &nbsp;{{user.name}}
            </td>
            <td class="text-center">{{user.totalTweets}}</td>
            <td class="text-center">
              {{user.totalRecommendations}}
              <span
                class="badge badge-danger"
                v-if="user.totalRecommendations == 0"
              >Gerar</span>
            </td>
            <td class="text-center">
              <span
                v-if="user.recommendationsNotEvaluated > 0"
                v-bind:class="{'badge badge-warning': user.totalRecommendations != user.recommendationsNotEvaluated, 'badge badge-success': user.totalRecommendations == user.recommendationsNotEvaluated}"
              >{{user.recommendationsNotEvaluated}}</span>
              <span v-if="user.recommendationsNotEvaluated == 0" class="badge badge-danger">Nenhuma</span>
            </td>
            <td>{{user.lastAccess}}</td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  v-on:click="sendEmail(user, 'I')"
                  v-bind:disabled="user.sendingEmailI || user.hasEmail"
                >
                  <span v-if="!user.sendingEmailI">
                    <i class="fas fa-paper-plane"></i>&nbsp;Interação
                  </span>
                  <span v-if="user.sendingEmailI">
                    <i class="fas fa-spinner fa-pulse align-middle"></i>&nbsp;Enviando
                  </span>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-success btn-sm"
                  v-on:click="sendEmail(user, 'E')"
                  v-bind:disabled="user.sendingEmailE || user.hasEmail"
                >
                  <span v-if="!user.sendingEmailE">
                    <i class="fas fa-paper-plane"></i>&nbsp;Avaliação
                  </span>
                  <span v-if="user.sendingEmailE">
                    <i class="fas fa-spinner fa-pulse align-middle"></i>&nbsp;Enviando
                  </span>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  v-on:click="sendEmail(user, 'G')"
                  v-bind:disabled="user.sendingEmailG || user.hasEmail"
                >
                  <span v-if="!user.sendingEmailG">
                    <i class="fas fa-cogs"></i>&nbsp;Gerar Rec.
                  </span>
                  <span v-if="user.sendingEmailG">
                    <i class="fas fa-spinner fa-pulse align-middle"></i>&nbsp;Enviando
                  </span>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-warning btn-sm"
                  v-on:click="sendEmail(user, 'C')"
                  v-bind:disabled="user.sendingEmailC || user.hasEmail"
                >
                  <span v-if="!user.sendingEmailC">
                    <i class="fas fa-cloud-download-alt"></i>&nbsp;Extrair Tweets
                  </span>
                  <span v-if="user.sendingEmailC">
                    <i class="fas fa-spinner fa-pulse align-middle"></i>&nbsp;Enviando
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" class="text-center">
              <span v-if="loading">
                <i class="fas fa-spinner fa-pulse fa-2x align-middle"></i>&nbsp;Carregando
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
      totalRecommendations: 0,
      totalErrors: 0
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
          this.totalErrors = json.totalErrors;
          this.users = json.users;
        })
        .catch(response => response.json())
        .then(response => {
          this.message.error = response;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sendEmail: function(userAccount, typeMessage) {
      if (typeMessage == "I") {
        this.$set(userAccount, "sendingEmailI", true);
      } else if (typeMessage == "E") {
        this.$set(userAccount, "sendingEmailE", true);
      } else if (typeMessage == "G") {
        this.$set(userAccount, "sendingEmailG", true);
      } else {
        this.$set(userAccount, "sendingEmailC", true);
      }

      this.$http
        .get(
          this.$APIUri("/resume/sendEmail?idUser=") +
            userAccount.id +
            "&typeMessage=" +
            typeMessage
        )
        .then(response => response.json())
        .then(json => {
          this.message.info = json;
        })
        .catch(response => response.json())
        .then(response => {
          this.message.error = response;
        })
        .finally(() => {
          if (typeMessage == "I") {
            this.$set(userAccount, "sendingEmailI", false);
          } else if (typeMessage == "E") {
            this.$set(userAccount, "sendingEmailE", false);
          } else if (typeMessage == "G") {
            this.$set(userAccount, "sendingEmailG", false);
          } else {
            this.$set(userAccount, "sendingEmailC", false);
          }
        });
    }
  },
  mounted() {
    this.getResume();
  }
};
</script>