<template>
    <div id="Recommendations">
        <div class="alert alert-dismissible fade show" :class="{'alert-success': message.success, 'alert-danger': message.danger}" v-if="message.success || message.error " role="alert">
            <span v-if="message.success">{{message.success}}</span>
            <span v-if="message.error">{{message.error}}</span>
            <button type="button" class="close" v-on:click="clearMessage()">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="row align-items-center mt-4">
            <div class="col-md-12">
                <h1 class="display-4 float-left">Recommendations</h1>
                <button class="btn btn-primary btn-lg float-right" v-bind:disabled="loading">
                    <span v-if="loading">
                        <i class="fas fa-spinner fa-pulse"></i>&nbsp;Loading</span>
                    <span v-if="!loading">Generate</span>
                </button>
            </div>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>User</th>
                    <th class="text-center">Recommended to</th>
                    <th class="text-center">Evaluated on</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(recommendation, index) in recommendations" :key="index">
                    <td><img class="rounded-circle img-fluid" width="30" :src="recommendation.user.profileImageUrl" /> {{recommendation.user.name}}</td>
                    <td class="text-center">
                        <span class="badge badge-success" v-if="recommendation.toFollow">Follow</span>
                        <span class="badge badge-danger" v-if="!recommendation.toFollow">Unfollow</span>
                    </td>
                    <td class="text-center">
                        <span class="badge badge-success" v-if="recommendation.evaluationDate">{{recommendation.evaluationDate}}</span>
                        <span v-if="!recommendation.evaluationDate">-</span>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-outline-danger btn-sm">Refuse</button>
                        <button class="btn btn-primary btn-sm" data-toggle="modal" v-on:click="selectRecommendation(recommendation)">Evaluate</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="modalEvaluation" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">How do you Evaluate the recommendation
                            <b>{{recommendation.user.name}}</b>?
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
                                    <div class="col-auto" v-for="(classification,index) in question.classifications" :key="index">
                                        <div class="smiley" v-bind:class="[classification.classActive, classification.classHover]" v-on:click.prevent="setClassificationToQuestion(question,classification)">
                                            <img :src="classification.imageSrc" />
                                        </div>
                                        {{classification.note}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" v-on:click="saveEvaluation()" v-bind:disabled="!evaluationValidated">Save evaluation</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Recommendations",
  data() {
    return {
      loading: false,
      message: { error: null, success: null },
      questions: [],
      recommendations: [],
      recommendation: { user: { name: null } },
      evaluationValidated: false
    };
  },
  methods: {
    clearMessage: function() {
      this.message = { error: null, success: null };
    },
    getAll: function() {
      this.loading = true;
      this.$http
        .get("http://localhost:8080/recommendations/getAll")
        .then(function(response) {
          this.recommendations = response.body;
          this.loading = false;
        });
    },
    setClassActive: function(classification) {
      if (classification.active)
        this.$set(
          classification,
          "classActive",
          "active-" + classification.note
        );
      else this.$set(classification, "classActive", null);
    },
    getClassifications: function() {
      return [
        { note: 1, imageSrc: this.getImgUrl(1), classHover: "smiley-1" },
        { note: 2, imageSrc: this.getImgUrl(2), classHover: "smiley-2" },
        { note: 3, imageSrc: this.getImgUrl(3), classHover: "smiley-3" },
        { note: 4, imageSrc: this.getImgUrl(4), classHover: "smiley-4" },
        { note: 5, imageSrc: this.getImgUrl(5), classHover: "smiley-5" }
      ];
    },
    getEvaluationOfRecommendation: function() {
      this.$http
        .get(
          "http://localhost:8080/evaluations/recommendation?idRecommendation=" +
            this.recommendation.id
        )
        .then(function(response) {
          console.info(response);
        });
    },
    getImgUrl(index) {
      return require("../assets/note-" + index + ".png");
    },
    getQuestions: function() {
      this.$http
        .get("http://localhost:8080/evaluations/questions")
        .then(function(response) {
          this.questions = response.body;
        });
    },
    saveEvaluation: function() {
      var url = this.recommendation.evaluationDate ? "/update" : "/save";

      this.$http
        .post("http://localhost:8080/evaluations" + url, {
          answers: this.recommendation.questions,
          idRecommendation: this.recommendation.id
        })
        .then(function(response) {
          this.message.success = response.bodyText;

          $("#modalEvaluation").modal("hide");

          this.getAll();
        });
    },
    setClassificationToQuestion: function(question, classification) {
      this.$set(classification, "active", !classification.active);
      this.$set(
        question,
        "answer",
        classification.active ? classification.note : null
      );

      this.setClassActive(classification);

      question.classifications.forEach(currentClassification => {
        if (
          currentClassification.active &&
          currentClassification != classification
        ) {
          this.$set(currentClassification, "classActive", null);
          currentClassification.active = false;
        }
      });

      this.evaluationValidated = this.evaluationIsCompleted();
    },
    selectRecommendation: function(recommendation) {
      this.recommendation = recommendation;

      if (!recommendation.questions) {
        var questions = JSON.parse(JSON.stringify(this.questions));
        this.$set(recommendation, "questions", questions);
      }

      recommendation.questions.forEach(question => {
        if (!question.classifications)
          this.$set(question, "classifications", this.getClassifications());
      });

      if (recommendation.evaluationDate) {
        this.$http
          .get(
            "http://localhost:8080/evaluations/recommendation?idRecommendation=" +
              recommendation.id
          )
          .then(function(response) {
            recommendation.questions.forEach(question => {
              response.body.forEach(questionC => {
                if (questionC.idQuestion === question.idQuestion) {
                  question.answer = questionC.answer;

                  question.classifications.forEach(classification => {
                    if (classification.note === question.answer) {
                      this.$set(classification, "active", true);
                      this.setClassActive(classification);
                    }
                  });
                }
              });
            });
          });
      }

      this.evaluationValidated = this.evaluationIsCompleted();

      $("#modalEvaluation").modal("show");
    },
    evaluationIsCompleted: function() {
      var teste = 0;
      this.recommendation.questions.some(question => {
        teste = question.answer != null ? teste + 1 : teste - 1;
      });

      return teste === 3;
    }
  },
  mounted() {
    this.getQuestions();
    this.getAll();
  }
};
</script>