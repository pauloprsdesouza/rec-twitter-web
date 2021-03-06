<template>
    <div class="modal fade" id="modalRecommendationsAccepted" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Recomendações aceitas</h5>
                </div>
                <div class="modal-body">
                    <div class="alert alert-dismissible fade show" :class="{'alert-success': message.info, 'alert-danger': message.error}" v-if="message.success || message.error " role="alert">
                        <span v-if="message.info">{{message.info}}</span>
                        <span v-if="message.error">{{message.error}}</span>
                        <button type="button" class="close" v-on:click="clearMessage()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Usuário</th>
                                    <th class="text-center">Recomendado para</th>
                                    <th class="text-center">Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="recommendation in recommendations" :key="recommendation.id">
                                    <td><img class="rounded-circle img-fluid" width="35" :src="recommendation.user.profileImageUrl" /> {{recommendation.user.name}}</td>
                                    <td class="text-center">
                                        <span class="badge badge-success" v-if="recommendation.recommendedTo == 'F'">Seguir</span>
                                        <span class="badge badge-danger" v-if="recommendation.recommendedTo == 'U'">Deixar de Seguir</span>
                                    </td>
                                    <td class="text-center">{{recommendation.acceptanceDate}}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr v-if="recommendations > 0">
                                    <td colspan="4">
                                        <pagination-component :update="getRecommendations" :current-pagination="pagination"></pagination-component>
                                    </td>
                                </tr>
                                <tr v-if="recommendations == 0">
                                    <td colspan="4" class="text-center">
                                        <em class="text-muted" v-if="!loading">Sem recomendações aceitas.</em>
                                        <span v-if="loading">
                                            <i class="fas fa-spinner fa-pulse fa-2x align-middle"></i>&nbsp;Carregando
                                        </span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PaginationComponent from "@/components/commons/PaginationComponent";

export default {
  data() {
    return {
      pagination: {},
      recommendations: [],
      message: { error: null, success: null },
      loading: false,
      recommendation: {}
    };
  },
  components: {
    PaginationComponent
  },
  methods: {
    clearMessage: function() {
      this.message = { error: null, success: null };
    },
    getRecommendations: function() {
      this.loading = true;

      this.$http
        .post(this.$APIUri("/recommendations/accepted"), {
          pagination: this.pagination
        })
        .then(response => response.json())
        .then(json => {
          this.recommendations = json.recommendations;
          this.pagination = json.pagination;
        })
        .catch(response => response.json())
        .then(message => {
            this.message.error = message;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    $("#modalRecommendationsAccepted").on("show.bs.modal", () => {
      this.getRecommendations();
    });
  }
};
</script>

