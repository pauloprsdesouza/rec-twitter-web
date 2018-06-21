<template>
    <div id="RecommendationEvaluation">
        <div class="modal fade" id="modalEvaluation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">How do you Evaluate the recommendation
                            <b>{{recommendation}}</b>?
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="card mb-2" v-for="question in recommendation.questions" :key="question.id">
                            <div class="card-body">
                                <h5 class="card-title">{{question.description}}</h5>
                                <div class="row justify-content-center text-center">
                                    <div class="col-auto" v-for="(evaluation,index) in question.evaluations" :key="index">
                                        <div class="smiley" v-bind:class="{active1: evaluation.active}" v-on:click="selectEvaluation(question,evaluation)">
                                            <img :src="evaluation.imageSrc" />
                                        </div>
                                        {{evaluation.active}} {{evaluation.note}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "RecommendationEvaluation",
  //props: { testeRec: { type: Object, required: true, inherit: true } },
  props: ['size'],
  data() {
    return {
      recommendation: this.size,
      questions: {}
    };
  },
  methods: {
    testando: function() {
      alert("foi");
    },
    getQuestions: function() {
      this.$http
        .get("http://localhost:8080/evaluations/questions")
        .then(function(response) {
          this.questions = response.body;
        });
    },
    teste: function() {
      this.questions.forEach(question => {
        if (!question.evaluations) {
          question.evaluations = this.getEvaluation();
        }
      });

      this.$set(this.recommendation, "questions", this.questions);
    },
    getEvaluation: function() {
      return [
        { note: 1, imageSrc: this.getImgUrl(1), active: false },
        { note: 2, imageSrc: this.getImgUrl(2), active: false },
        { note: 3, imageSrc: this.getImgUrl(3), active: false },
        { note: 4, imageSrc: this.getImgUrl(4), active: false },
        { note: 5, imageSrc: this.getImgUrl(5), active: false }
      ];
    },
    getImgUrl(index) {
      return require("../../../assets/note-" + index + ".png");
    },
    selectEvaluation: function(question, evaluation) {
      question.answer = evaluation.note;
      this.$set(evaluation, "active", !evaluation.active);
    }
  },
  ready() {
    $("#modalEvaluation").on("show.bs.modal", () => {
      this.teste();
    });

    console.info(1);

    this.getQuestions();
  }
};
</script>