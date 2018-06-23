<template>
    <div class="modal fade" id="modalRecommendationsRefused">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Recommendaitions Refused</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
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
                                    <th>User</th>
                                    <th class="text-center">Recommended</th>
                                    <th class="text-center">Date</th>
                                    <th class="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="recommendation in recommendations" :key="recommendation.id">
                                    <td><img class="rounded-circle img-fluid" width="35" :src="recommendation.user.profileImageUrl" /> {{recommendation.user.name}}</td>
                                    <td class="text-center">
                                        <span class="badge badge-success" v-if="recommendation.toFollow">Follow</span>
                                        <span class="badge badge-danger" v-if="!recommendation.toFollow">Unfollow</span>
                                    </td>
                                    <td class="text-center">{{recommendation.cancelDate}}</td>
                                    <td class="text-center">
                                        <button class="btn btn-outline-primary" v-on:click="showModalMessageConfirmation(recommendation)">Recover</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="4">
                                        <pagination-component :pagination-begin="getRecommendations" :update="getRecommendations" :current-pagination="pagination"></pagination-component>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <h4 class="text-center" v-if="recommendations == 0">
                        <em>Without recommendations refused.</em>
                    </h4>
                </div>
            </div>
        </div>
        <modal-message v-bind:title="modalMessage.title" v-bind:callback-yes="modalMessage.callbackYes" v-bind:callback-no="modalMessage.callbackNo" v-bind:message="modalMessage.message"></modal-message>
    </div>
</template>

<script>
import PaginationComponent from "../../../components/commons/PaginationComponent";
import ModalMessage from "../../../components/commons/modal/ModalMessage";

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
      this.$http
        .post("http://localhost:8080/recommendations/refused", {
          pagination: this.pagination
        })
        .then(response => response.json())
        .then(json => {
          this.recommendations = json.recommendations;
          this.pagination = json.pagination;
        })
        .catch(response => response.text())
        .then(message => {
          this.message.error = message;
        });
    },
    recoverRecommendation: function() {
      this.loading = true;
      this.$http
        .post("http://localhost:8080/recommendations/recover", {
          idRecommendation: this.recommendation.id
        })
        .then(response => response.text())
        .then(message => {
          this.message.info = message;
          this.dismissModalMessage();
          this.getRecommendations();
        })
        .catch(response => response.text())
        .then(message => {
          this.message.error = message;
        })
        .finally(() => {
          this.loading = false;
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
  }
};
</script>

