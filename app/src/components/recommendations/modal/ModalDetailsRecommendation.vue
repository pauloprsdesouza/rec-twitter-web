<template>
    <div class="modal fade" id="modalDetails" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> {{recommendation.user.name}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <img class="rounded-circle img-thumbnail" width="150" :src="recommendation.user.profileImageUrl" />
                        </div>
                    </div>

                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <i class="fas fa-check" v-if="recommendation.toFollow"></i>
                            <i class="fas fa-times" v-if="!recommendation.toFollow"></i>
                            Recomendado para:
                            <span class="badge badge-success" v-if="recommendation.recommendedTo === 'F'" v-bind:disabled="recommendation.acceptanceDate">Follow</span>
                            <span class="badge badge-danger" v-if="recommendation.recommendedTo === 'U'" v-bind:disabled="recommendation.acceptanceDate">Unfollow</span>
                        </li>
                        <li class="list-group-item">
                            <i class="fab fa-twitter"></i> Total posts: {{recommendation.totalPosts}}</li>
                        <li class="list-group-item">
                            <i class="far fa-hand-pointer"></i> Você interagiu com: {{calculatePercentual(recommendation.totalInteractions)}}%</li>
                        <li class="list-group-item">
                            <i class="far fa-thumbs-up"></i> Percentual de contéudo publicado de seu interesse: {{recommendation.totalPreferences*100}}%</li>
                            <li class="list-group-item">
                            <i class="far fa-calendar-alt"></i> Registrado em: {{recommendation.registrationDate}}</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["title", "recommendation"],
  data() {
    return {};
  },
  methods: {
      calculatePercentual:function(value){
          var percent = (value / this.recommendation.totalPosts*100);
          return Math.round(percent * 100) / 100;
      }
  }
};
</script>
