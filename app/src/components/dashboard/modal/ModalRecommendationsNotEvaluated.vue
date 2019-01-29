<template>
    <div class="modal fade" id="modalRecommendationsNotEvaluated" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Recomendações não avaliadas<br/>
                        <small>Por favor avalie as recomendações abaixo na tela de <a class="link" href="\recommendations">recomendações</a></small>
                    </h5>
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(recommendation, index) in recommendationsNotEvaluated" :key="index">
                                    <td><img class="rounded-circle img-fluid" width="35" :src="recommendation.user.profileImageUrl" /> {{recommendation.user.name}}</td>
                                    <td class="text-center">
                                        <span class="badge badge-success" v-if="recommendation.recommendedTo == 'F'">Seguir</span>
                                        <span class="badge badge-danger" v-if="!recommendation.recommendedTo == 'U'">Deixar de Seguir</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-outline-primary" href="\recommendations">Ir para recomendações</a>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["recommendationsNotEvaluated"],
  data() {
    return {
      message: { error: null, success: null },
      recommendation: {}
    };
  },
  methods: {
    clearMessage: function() {
      this.message = { error: null, success: null };
    }
  }
};
</script>

