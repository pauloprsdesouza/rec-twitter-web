<template>
  <div>
    <div class="card">
      <div class="card-header"><b>Geral</b></div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item list-group-item-primary"><b>Análise das Recomendações</b></li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações
            <span
              v-if="!loading"
              class="badge badge-primary badge-pill"
            >{{evaluations.totalRecommendations}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações Para Seguir
            <span
              v-if="!loading"
              class="badge badge-success badge-pill"
            >{{evaluations.totalRecommendationsToFollow}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações Para Deixar de Seguir
            <span
              v-if="!loading"
              class="badge badge-danger badge-pill"
            >{{evaluations.totalRecommendationsToUnfollow}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Usuários Com Recomendações
            <span
              v-if="!loading"
              class="badge badge-primary badge-pill"
            >{{evaluations.totalUserWithRecommendations}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Usuários Com Limitação
            <span
              v-if="!loading"
              class="badge badge-warning badge-pill"
            >{{evaluations.totalUsersWithLimitations}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Média de Recomendações Por Usuário
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.meanRecommendationsPerUser}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
        </ul>

        <ul class="list-group mt-4">
          <li class="list-group-item list-group-item-primary"><b>Análise dos Tweets</b></li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Tweets
            <span
              v-if="!loading"
              class="badge badge-primary badge-pill"
            >{{evaluations.totalTweets}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Tweets com Interação
            <span
              v-if="!loading"
              class="badge badge-primary badge-pill"
            >{{evaluations.totalTweetsWithInteractions}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
        </ul>

        <ul class="list-group mt-4">
          <li class="list-group-item list-group-item-primary"><b>Qualidade das Recomendações</b></li>
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
        </ul>
      </div>
    </div>
    <div class="card mt-4">
      <div class="card-body">
        <h5 class="card-title">Gráfico</h5>
        <h6 class="card-subtitle mb-2 text-muted">Precisão X Recomendações Por Usuário</h6>
        <bar-chart :data-graph="evaluations.dataGraph" :text="{ok:'ok'}" :loading="loading"></bar-chart>
      </div>
    </div>
    <div class="card mt-4">
      <div class="card-header"><b>Análise Por Usuário</b></div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Total de Recomendações</th>
                <th>Recomendações Relevantes</th>
                <th>Precisão</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(evaluation, index) in evaluations.perUser" :key="index">
                <td>{{evaluation.user.id}}</td>
                <td>{{evaluation.user.name}}</td>
                <td>{{evaluation.total}}</td>
                <td>{{evaluation.relevants}}</td>
                <td>{{evaluation.precision}}</td>
                <td>
                  <span v-if="evaluation.status == 'X'" class="badge badge-danger">Com Limitação</span>
                  <span
                    v-if="evaluation.status == 'S'"
                    class="badge badge-primary"
                  >Sem Recomendações</span>
                  <span
                    v-if="evaluation.status == 'OK'"
                    class="badge badge-success"
                  >Com Recomendações</span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr v-if="loading" class="text-center">
                <td colspan="6">
                  <span>Carregando</span>&nbsp;
                  <i class="fas fa-spinner fa-pulse align-middle"></i>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BarChart from "@/components/commons/BarChart";

export default {
  data() {
    return {
      evaluations: {dataGraph: Object},
      loading: Boolean,
      message: { error: null, info: null }
    };
  },
  components: {
    BarChart
  },
  methods: {
    getEvaluations() {
      this.loading = true;

      this.$http
        .get(this.$APIUri("/evaluations/generate"))
        .then(response => response.json())
        .then(json => {
          this.evaluations = json;
          this.evaluations.perUser.slice().sort(function(a, b) {
            return a.precision - b.precision;
          });
        })
        .catch(reseponse => response.json())
        .then(message => {
          this.message.error = message;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.getEvaluations();
  }
};
</script>