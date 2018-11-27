<template>
    <div class="modal fade" id="modalRecommendationsRefused" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Recomendações recusadas</h5>
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
                                    <th class="text-center">Recomendado</th>
                                    <th class="text-center">Data</th>
                                    <th class="text-center">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="recommendation in recommendations" :key="recommendation.id">
                                    <td><img class="rounded-circle img-fluid" width="35" :src="recommendation.user.profileImageUrl" /> {{recommendation.user.name}}</td>
                                    <td class="text-center">
                                        <span class="badge badge-success" v-if="recommendation.toFollow">Seguir</span>
                                        <span class="badge badge-danger" v-if="!recommendation.toFollow">Deixar de Seguir</span>
                                    </td>
                                    <td class="text-center">{{recommendation.cancelDate}}</td>
                                    <td class="text-center">
                                        <button class="btn btn-outline-primary" v-on:click="showModalMessageConfirmation(recommendation)">Recuperar</button>
                                    </td>
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
                                        <em class="text-muted" v-if="!loading">Sem recomendações recusadas.</em>
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
        <modal-message v-bind:title="modalMessage.title" v-bind:callback-yes="modalMessage.callbackYes" v-bind:callback-no="modalMessage.callbackNo" v-bind:message="modalMessage.message" v-bind:loading="loadingRecover"></modal-message>
    </div>
</template>

<script>
import PaginationComponent from "@/components/commons/PaginationComponent";
import ModalMessage from "@/components/commons/modal/ModalMessage";

export default {
  data() {
    return {
      modalMessage: {
        title: null,
        callbackYes: Function,
        callbackNo: Function,
        message: null
      },
      pagination: {},
      recommendations: [],
      message: { error: null, info: null },
      loading: false,
      loadingRecover: false,
      recommendation: {}
    };
  },
  components: {
    PaginationComponent,
    ModalMessage
  },
  methods: {
    clearMessage: function() {
      this.message = { error: null, success: null };
    },
    getRecommendations: function() {
      this.loading = true;

      this.$http
        .post(this.$APIUri("/recommendations/refused"), {
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
    },
    recoverRecommendation: function() {
      this.loadingRecover = true;

      this.$http
        .post(this.$APIUri("/recommendations/recover"), {
          idRecommendation: this.recommendation.id
        })
        .then(response => response.json())
        .then(message => {
          this.message.info = message;
          this.dismissModalMessage();

          var index = this.recommendations.indexOf(this.recommendation);
          this.recommendations.splice(index, 1);
        })
        .catch(response => response.json())
        .then(message => {
          this.message.error = message;
        })
        .finally(() => {
          this.loadingRecover = false;
        });
    },
    dismissModalMessage: function() {
      $("#modalMessage").modal("hide");
    },
    showModalMessageConfirmation: function(recommendation) {
      this.recommendation = recommendation;

      this.modalMessage.title = "Recover recommendation ";
      this.modalMessage.callbackYes = this.recoverRecommendation;
      this.modalMessage.callbackNo = this.dismissModalMessage;

      this.modalMessage.message =
        "Do you really want to recover " +
        recommendation.user.name +
        " to receive recommendations in the future?";

      $("#modalMessage").modal("show");
    }
  },
  mounted() {
    $("#modalRecommendationsRefused").on("show.bs.modal", () => {
      if (this.recommendations.length == 0) {
        this.getRecommendations();
      }
    });
  }
};
</script>

