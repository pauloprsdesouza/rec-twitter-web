<template>
  <div>
    <div class="card">
      <div class="card-header">
        <b>Geral</b>
        &nbsp;
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary" v-on:click="getEvaluations(2)">1-2</button>
          <button type="button" class="btn btn-secondary" v-on:click="getEvaluations(3)">1-3</button>
          <button type="button" class="btn btn-secondary" v-on:click="getEvaluations(4)">1-4</button>
          <button type="button" class="btn btn-secondary" v-on:click="getEvaluations(5)">1-5</button>
          <button type="button" class="btn btn-secondary" v-on:click="getEvaluations(6)">1-6</button>
        </div>
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item list-group-item-primary">
            <b>Análise das Recomendações</b>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações Iguais ao Método Online
            <span
              v-if="!loading"
              class="badge badge-primary badge-pill"
            >{{evaluations.totalRecommendations}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Novas Recomendações
            <span
              v-if="!loading"
              class="badge badge-primary badge-pill"
            >{{evaluations.totalNewRecommendations}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações Para Seguir
            <span
              v-if="!loading"
              class="badge badge-success badge-pill"
            >{{evaluations.totalRecommendationsToFollow}}&nbsp;&nbsp;({{calculatePercentualRecommendations(evaluations.totalRecommendationsToFollow)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações Para Deixar de Seguir
            <span
              v-if="!loading"
              class="badge badge-danger badge-pill"
            >{{evaluations.totalRecommendationsToUnfollow}}&nbsp;&nbsp;({{calculatePercentualRecommendations(evaluations.totalRecommendationsToUnfollow)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações Aceitas
            <span
              v-if="!loading"
              class="badge badge-success badge-pill"
            >{{evaluations.totalRecommendationsAccepted}}&nbsp;&nbsp;({{calculatePercentualRecommendations(evaluations.totalRecommendationsAccepted)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações Recusadas
            <span
              v-if="!loading"
              class="badge badge-danger badge-pill"
            >{{evaluations.totalRecommendationsCanceled}}&nbsp;&nbsp;({{calculatePercentualRecommendations(evaluations.totalRecommendationsCanceled)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
        </ul>

        <ul class="list-group mt-4">
          <li class="list-group-item list-group-item-primary">
            <b>Análise das Recomendações Por Usuário</b>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Média de Recomendações Por Usuário
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.meanRecommendationsPerUser}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Máximo de Recomendações Por Usuário
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.maxRecommendations}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Mínimo de Recomendações Por Usuário
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.minRecommendations}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Desvio Padrão de Recomendações Por Usuário
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.standardDeviationRecommendations}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
        </ul>

        <ul class="list-group mt-4">
          <li class="list-group-item list-group-item-primary">
            <b>Recomendações geradas através das regras semânticas</b>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Regra 1 - Para deixar de Seguir
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsRule1}}&nbsp;&nbsp;({{calculatePercentualRecommendations(evaluations.totalRecommendationsRule1)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Regra 2 - Para Seguir (Sem Interações)
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsRule2}}&nbsp;&nbsp;({{calculatePercentualRecommendations(evaluations.totalRecommendationsRule2)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Regra 3 - Para Seguir (Liked)
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsRule3}}&nbsp;&nbsp;({{calculatePercentualRecommendations(evaluations.totalRecommendationsRule3)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Regra 4 - Para Seguir (Retweet)
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsRule4}}&nbsp;&nbsp;({{calculatePercentualRecommendations(evaluations.totalRecommendationsRule4)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Regra 5 - Para Seguir (Replied)
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsRule5}}&nbsp;&nbsp;({{calculatePercentualRecommendations(evaluations.totalRecommendationsRule5)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Regra 6 - Para Seguir (Retweeted)
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsRule6}}&nbsp;&nbsp;({{calculatePercentualRecommendations(evaluations.totalRecommendationsRule6)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
        </ul>

        <ul class="list-group mt-4">
          <li class="list-group-item list-group-item-primary">
            <b>Qualidade das Recomendações</b>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Mean Reciprocal Rank (MRR)
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.MRR}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Média das Precisões
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.meanPrecisions}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Prec@1
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.precisionAt1}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Prec@2
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.precisionAt2}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Map@1
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.mapAt1}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Map@2
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.mapAt2}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: Boolean,
      message: { error: null, info: null },
      evaluations: {}
    };
  },
  components: {},
  methods: {
    getEvaluations(rule) {
      this.loading = true;

      this.$http
        .get(this.$APIUri("/evaluations/generate-offline-rules?rule=" + rule))
        .then(response => response.json())
        .then(json => {
          this.evaluations = json;
        })
        .catch(reseponse => response.json())
        .then(message => {
          this.message.error = message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    calculatePercentualRecommendations: function(value) {
      var percent = (value / this.evaluations.totalRecommendations) * 100;
      return (Math.round(percent * 100) / 100).toFixed(2).replace(/\.0+$/, "");
    },
    calculatePercentualUsers: function(value) {
      var percent = (value / this.evaluations.totalOfUsers) * 100;
      return (Math.round(percent * 100) / 100).toFixed(2).replace(/\.0+$/, "");
    },
    calculatePercentualTweets: function(value) {
      var percent = (value / this.evaluations.totalTweets) * 100;
      return (Math.round(percent * 100) / 100).toFixed(2).replace(/\.0+$/, "");
    }
  },
  mounted() {
    this.getEvaluations(2);
  }
};
</script>