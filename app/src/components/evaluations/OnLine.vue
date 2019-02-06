<template>
  <div>
    <div class="card">
      <div class="card-header">
        <b>Geral</b>
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item list-group-item-primary">
            <b>Análise das Recomendações</b>
          </li>
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
            >{{evaluations.totalRecommendationsToFollow}}&nbsp;&nbsp;({{calculatePercentual(evaluations.totalRecommendationsToFollow)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações Para Deixar de Seguir
            <span
              v-if="!loading"
              class="badge badge-danger badge-pill"
            >{{evaluations.totalRecommendationsToUnfollow}}&nbsp;&nbsp;({{calculatePercentual(evaluations.totalRecommendationsToUnfollow)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações Aceitas
            <span
              v-if="!loading"
              class="badge badge-success badge-pill"
            >{{evaluations.totalRecommendationsAccepted}}&nbsp;&nbsp;({{calculatePercentual(evaluations.totalRecommendationsAccepted)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações Recusadas
            <span
              v-if="!loading"
              class="badge badge-danger badge-pill"
            >{{evaluations.totalRecommendationsCanceled}}&nbsp;&nbsp;({{calculatePercentual(evaluations.totalRecommendationsCanceled)}}%)</span>
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
          <li class="list-group-item list-group-item-primary">
            <b>Análise dos Tweets</b>
          </li>
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
          <li class="list-group-item list-group-item-primary">
            <b>Recomendações geradas através das regras semânticas</b>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Regra 1 - Para deixar de Seguir
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsRule1}}&nbsp;&nbsp;({{calculatePercentual(evaluations.totalRecommendationsRule1)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Regra 2 - Para Seguir (Sem Interações)
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsRule2}}&nbsp;&nbsp;({{calculatePercentual(evaluations.totalRecommendationsRule2)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Regra 3 - Para Seguir (Liked)
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsRule3}}&nbsp;&nbsp;({{calculatePercentual(evaluations.totalRecommendationsRule3)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Regra 4 - Para Seguir (Retweet)
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsRule4}}&nbsp;&nbsp;({{calculatePercentual(evaluations.totalRecommendationsRule4)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Regra 5 - Para Seguir (Replied)
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsRule5}}&nbsp;&nbsp;({{calculatePercentual(evaluations.totalRecommendationsRule5)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Regra 6 - Para Seguir (Retweeted)
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsRule6}}&nbsp;&nbsp;({{calculatePercentual(evaluations.totalRecommendationsRule6)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
        </ul>

        <ul class="list-group mt-4">
          <li class="list-group-item list-group-item-primary">
            <b>Total da avaliação por classificação</b>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações Com Avaliação
            <span
              v-if="!loading"
              class="badge badge-primary badge-pill"
            >{{evaluations.totalRecommendationsEvaluated}}&nbsp;&nbsp;({{calculatePercentual(evaluations.totalRecommendationsEvaluated)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Total de Recomendações Sem Avaliação
            <span
              v-if="!loading"
              class="badge badge-primary badge-pill"
            >{{evaluations.totalRecommendationsNotEvaluated}}&nbsp;&nbsp;({{calculatePercentual(evaluations.totalRecommendationsNotEvaluated)}}%)</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Classificação 1
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsEvaluated1}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Classificação 2
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsEvaluated2}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Classificação 3
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsEvaluated3}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Classificação 4
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsEvaluated4}}</span>
            <i v-if="loading" class="fas fa-spinner fa-pulse align-middle"></i>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Classificação 5
            <span
              v-if="!loading"
              class="badge badge-secondary badge-pill"
            >{{evaluations.totalRecommendationsEvaluated5}}</span>
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
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 col-sm-12">
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title">Gráfico</h5>
            <h6 class="card-subtitle mb-2 text-muted">Precisão X Recomendações Por Usuário</h6>
            <bar-chart :data-graph="evaluations.dataGraph" :text="{ok:'ok'}" :loading="loading"></bar-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-4">
      <div class="card-body">
        <h5 class="card-title">Gráficos Frequência de resposta X Ratings</h5>
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <div class="card mt-4">
              <div class="card-body">
                <h5 class="card-title">Gráfico</h5>
                <h6 class="card-subtitle mb-2 text-muted">Frequência X Ratings</h6>
                <area-chart
                  :data-graph="evaluations.evaluationsPerQuestion"
                  :name-chart="'area-chart-1'"
                  :loading="loading"
                ></area-chart>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-12">
            <div class="card mt-4">
              <div class="card-body">
                <h5 class="card-title">Precisão</h5>
                <area-chart-precision
                  :data-graph="evaluations.evaluationsPerQuestion"
                  :loading="loading"
                ></area-chart-precision>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-12">
            <div class="card mt-4">
              <div class="card-body">
                <h5 class="card-title">Familiaridade</h5>
                <area-chart-familiarity
                  :data-graph="evaluations.evaluationsPerQuestion"
                  :loading="loading"
                ></area-chart-familiarity>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-12">
            <div class="card mt-4">
              <div class="card-body">
                <h5 class="card-title">Satisfação</h5>
                <area-chart-satisfaction
                  :data-graph="evaluations.evaluationsPerQuestion"
                  :loading="loading"
                ></area-chart-satisfaction>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title">Gráfico</h5>
            <h6 class="card-subtitle mb-2 text-muted">Interações X Ratings</h6>
            <area-chart-interactions-general
              :data-graph="evaluations.evaluationsInteractionsPerQuestion"
              :loading="loading"
            ></area-chart-interactions-general>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12">
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="card-title">Gráfico</h5>
            <h6 class="card-subtitle mb-2 text-muted">Preferências X Ratings</h6>
            <area-chart-preferences-general
              :data-graph="evaluations.evaluationsPreferencesPerQuestion"
              :loading="loading"
            ></area-chart-preferences-general>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-4">
      <div class="card-header">
        <b>Análise Por Usuário</b>
      </div>
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
                <td>{{evaluation.user.name}}&nbsp;({{evaluation.user.screenName}})</td>
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
import AreaChart from "@/components/commons/AreaChart";
import AreaChartInteractionsGeneral from "@/components/commons/AreaChartInteractionsGeneral";
import AreaChartPreferencesGeneral from "@/components/commons/AreaChartPreferencesGeneral";

import AreaChartFamiliarity from "@/components/commons/AreaChartFamiliarity";
import AreaChartPrecision from "@/components/commons/AreaChartPrecision";
import AreaChartSatisfaction from "@/components/commons/AreaChartSatisfaction";

export default {
  data() {
    return {
      evaluations: { dataGraph: Object },
      loading: Boolean,
      message: { error: null, info: null }
    };
  },
  components: {
    BarChart,
    AreaChart,
    AreaChartInteractionsGeneral,
    AreaChartPreferencesGeneral,
    AreaChartFamiliarity,
    AreaChartPrecision,
    AreaChartSatisfaction
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
    },
    calculatePercentual: function(value) {
      var percent = (value / this.evaluations.totalRecommendations) * 100;
      return (Math.round(percent * 100) / 100).toFixed(2).replace(/\.0+$/, "");
    }
  },
  mounted() {
    this.getEvaluations();
  }
};
</script>