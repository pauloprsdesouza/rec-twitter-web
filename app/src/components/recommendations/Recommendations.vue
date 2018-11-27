<template>
  <div id="Recommendations">
    <div class="alert alert-dismissible fade show" :class="{'alert-success': message.info, 'alert-danger': message.error}" v-if="message.info || message.error " role="alert">
      <span v-if="message.info">{{message.info}}</span>
      <span v-if="message.error">{{message.error}}</span>
      <button type="button" class="close" v-on:click="clearMessage()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="jumbotron jumbotron-fluid mb-3">
      <div class="container">
        <h1 class="display-5">Recomendações</h1>
        <p class="lead">Aqui são exibidas as recomendações dos tweets extraídos da sua timeline.</p>
        <p class="text-muted" v-if="rangeDate.initialDate">
          As recomendações foram geradas a partir dos tweets extraídos entre
          <b>{{rangeDate.initialDate}}</b> e
          <b>{{rangeDate.endDate}}</b>.
        </p>
      </div>
    </div>
    <div class="mb-3" v-if="!intructionsRequired">
      <filter-recommendations v-bind:callback="getAll" :loading="loading"></filter-recommendations>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col">
            <span>
              <i class="fas fa-list"></i>&nbsp;Recomendações
            </span>
          </div>
          <div class="col text-right">
            <button id="btnRecommendations" class="btn btn-primary align-middle" v-on:click="generate()" v-bind:disabled="generating || intructionsRequired" data-container="body" data-toggle="popover" data-placement="top" data-content="Hello, click here to generate recommendatons.">
              <span v-if="generating">
                <i class="fas fa-spinner fa-pulse"></i>&nbsp;Gerando</span>
              <span v-if="!generating">
                <i class="fas fa-plus-circle"></i>&nbsp;Gerar Recomendações</span>
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Usuário</th>
                <th class="text-center">Rcomendado</th>
                <th class="text-center">Avaliado</th>
                <th class="text-center">Aceita</th>
                <th class="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(recommendation, index) in recommendations" :key="index">
                <td><img class="rounded-circle img-fluid" width="35" :src="recommendation.user.profileImageUrl" /> {{recommendation.user.name}}
                  <span class="badge badge-dark" v-if="recommendation.isNew">Nova</span>
                </td>
                <td class="text-center">
                  <button class="btn btn-success btn-sm" v-on:click="showModalMessageRecommendedTo(recommendation, true)" v-if="recommendation.recommendedTo === 'F'" v-bind:disabled="recommendation.acceptanceDate || recommendation.cancelDate">Seguir</button>
                  <button class="btn btn-danger btn-sm" v-on:click="showModalMessageRecommendedTo(recommendation, false)" v-if="recommendation.recommendedTo === 'U'" v-bind:disabled="recommendation.acceptanceDate || recommendation.cancelDate">Deixar de Seguir</button>
                </td>
                <td class="text-center">
                  <span class="badge badge-dark" v-if="recommendation.evaluationDate">{{recommendation.evaluationDate}}</span>
                  <span v-if="!recommendation.evaluationDate">-</span>
                </td>
                <td class="text-center">
                  <span class="badge badge-dark" v-if="recommendation.acceptanceDate">{{recommendation.acceptanceDate}}</span>
                  <span v-if="!recommendation.acceptanceDate">-</span>
                </td>
                <td class="text-center">
                  <button class="btn btn-outline-danger btn-sm" v-on:click="showModalMessageRefuse(recommendation)" v-bind:disabled="recommendation.cancelDate">Recusar</button>
                  <button class="btn btn-outline-primary btn-sm" v-on:click="showModalEvaluation(recommendation)" v-bind:disabled="recommendation.loadingEvaluate">
                    <span v-if="recommendation.loadingEvaluate">
                      <i class="fas fa-spinner fa-pulse"></i>&nbsp;Carregando</span>
                    <span v-if="!recommendation.loadingEvaluate">Avaliar</span>
                  </button>
                  <button class="btn btn-outline-secondary btn-sm" v-on:click="showModalDetails(recommendation)">Detalhes</button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr v-if="recommendations > 0">
                <td colspan="6">
                  <pagination-component :update="getAll" :current-pagination="pagination"></pagination-component>
                </td>
              </tr>
              <tr v-if="recommendations == 0">
                <td colspan="6" class="text-center">
                  <em class="text-muted" v-if="!loading">Sem recomendações.</em>
                  <span v-if="loading">
                    <i class="fas fa-spinner fa-pulse fa-2x align-middle"></i>&nbsp;Carregando
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modalEvaluation" data-backdrop="static">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Como você avalia a recomendação
              <b>{{recommendation.user.name}}</b>?
            </h5>
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
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-primary" v-on:click="saveEvaluation()" v-bind:disabled="!evaluationValidated || loadingEvaluation">
              <span v-if="loadingEvaluation">
                <i class="fas fa-spinner fa-pulse"></i>&nbsp;Salvando</span>
              <span v-if="!loadingEvaluation">Salvar avaliação</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <modal-message v-bind:title="modal.title" v-bind:callback-yes="modal.callback" v-bind:message="modal.message" v-bind:loading="loading" v-bind:visible-yes="buttonYesMessage"></modal-message>
    <modal-details-recommendation :recommendation="recommendation"></modal-details-recommendation>
    <Modal-requirements-recommendation :message-information="messageRequirementsToGenerateRecommendation"></modal-requirements-recommendation>
  </div>
</template>
<script>
import ModalMessage from "@/components/commons/modal/ModalMessage";
import FilterRecommendations from "@/components/recommendations/partial/FilterRecommendations";
import PaginationComponent from "@/components/commons/PaginationComponent";
import ModalDetailsRecommendation from "@/components/recommendations/modal/ModalDetailsRecommendation";
import ModalRequirementsRecommendation from "@/components/recommendations/modal/ModalRequirementsRecommendation";

export default {
  data() {
    return {
      modal: { title: null, callback: Function, message: null },
      loading: false,
      loadingEvaluation: false,
      generating: false,
      intructionsRequired: true,
      message: { error: "", info: "" },
      questions: [],
      recommendations: [],
      recommendation: { user: { name: null } },
      evaluationValidated: false,
      rangeDate: {},
      pagination: {},
      buttonYesMessage: false,
      messageRequirementsToGenerateRecommendation: ""
    };
  },
  components: {
    ModalMessage,
    FilterRecommendations,
    PaginationComponent,
    ModalDetailsRecommendation,
    ModalRequirementsRecommendation
  },
  methods: {
    clearMessage: function() {
      this.message = { error: null, success: null };
    },
    createFriendship: function(recommendation) {
      this.loading = true;

      this.$http
        .get(
          this.$APIUri(
            "/twitter/createfriendship?idRecommendation=" +
              this.recommendation.id
          )
        )
        .then(response => response.json())
        .then(message => {
          this.message.info = message;
        })
        .catch(response => response.json())
        .then(response => {
          this.message.error = response;
        })
        .finally(() => {
          this.loading = false;

          $("#modalMessage").modal("hide");

          this.getAll();
        });
    },
    destroyFriendship: function() {
      this.loading = true;

      this.$http
        .get(
          this.$APIUri(
            "/twitter/destroyfriendship?idRecommendation=" +
              this.recommendation.id
          )
        )
        .then(response => response.json())
        .then(message => {
          this.message.info = message;
        })
        .catch(response => response.json())
        .then(response => {
          this.message.error = response;
        })
        .finally(() => {
          this.loading = false;

          $("#modalMessage").modal("hide");

          this.getAll();
        });
    },
    startTimeRequest: function() {
      var i = 0;
      var interval = setInterval(() => {
        var time = new Date(i++ * 1000);

        if (time.getSeconds() >= 30 && time.getMinutes() == 0) {
          this.message.info = "Quase terminando, os dados estão sendo analisados."
        }
      }, 1000);
    },
    generate: function() {
      if (!this.intructionsRequired) {
        this.generating = true;

        var timeRequest = this.startTimeRequest();

        this.$http
          .get(this.$APIUri("/recommendations/generate"))
          .then(response => response.json())
          .then(message => {
            this.message.info = message;
          })
          .catch(response => response.json())
          .then(response => {
            this.message.error = response;
          })
          .finally(() => {
            this.getAll();
            this.generating = false;
            clearInterval(timeRequest);
          });
      }
    },
    getAll: function(filter) {
      this.loading = true;
      this.$http
        .post(this.$APIUri("/recommendations/getAll"), {
          pagination: this.pagination,
          toFollow: filter ? filter.toFollow : null,
          userName: filter ? filter.userName : null
        })
        .then(response => response.json())
        .then(json => {
          this.recommendations = json.recommendations;
          this.pagination = json.pagination;
          this.rangeDate = json.rangeDate;

          this.intructionsRequired = false;
        })
        .catch(response => {
          this.intructionsRequired = response.status === 422;

          response.json().then(message => {
            this.messageRequirementsToGenerateRecommendation = message;
            $("#modalRequirementsRecommendation").modal("show");
          });
        })
        .finally(() => {
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
          this.$APIUri(
            "/evaluations/recommendation?idRecommendation=" +
              this.recommendation.id
          )
        )
        .then(response => response.json())
        .then(message => {
          this.message.info = message;
        })
        .catch(response => response.json())
        .then(message => {
          this.message.error = message;
        });
    },
    getImgUrl(index) {
      return require("../../assets/note-" + index + ".png");
    },
    getQuestions: function() {
      this.$http
        .get(this.$APIUri("/evaluations/questions"))
        .then(response => response.json())
        .then(json => {
          this.questions = json;
        })
        .catch(reseponse => response.json())
        .then(message => {
          this.message.error = message;
        });
    },
    refuse: function() {
      this.loading = true;

      this.$http
        .get(
          this.$APIUri(
            "/recommendations/refuse?idRecommendation=" + this.recommendation.id
          )
        )
        .then(response => response.json())
        .then(message => {
          this.message.info = message;

          var index = this.recommendations.indexOf(this.recommendation);
          this.recommendations.splice(index, 1);
        })
        .catch(reseponse => response.json())
        .then(message => {
          this.message.error = message;
        })
        .finally(() => {
          this.loading = false;

          $("#modalMessage").modal("hide");
        });
    },
    saveEvaluation: function() {
      this.loadingEvaluation = true;

      var url = this.recommendation.evaluationDate ? "/update" : "/save";

      this.$http
        .post(this.$APIUri("/evaluations" + url), {
          answers: this.recommendation.questions,
          idRecommendation: this.recommendation.id
        })
        .then(response => response.json())
        .then(message => {
          this.message.info = message;

          this.getAll();
        })
        .catch(reseponse => response.json())
        .then(message => {
          this.message.error = message;
        })
        .finally(() => {
          this.loadingEvaluation = false;

          $("#modalEvaluation").modal("hide");
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
    },
    showModalDetails: function(recommendation) {
      this.selectRecommendation(recommendation);

      $("#modalDetails").modal("show");
    },
    showModalEvaluation: function(recommendation) {
      this.selectRecommendation(recommendation);

      if (!recommendation.questions) {
        var questions = JSON.parse(JSON.stringify(this.questions));
        this.$set(recommendation, "questions", questions);
      }

      recommendation.questions.forEach(question => {
        if (!question.classifications)
          this.$set(question, "classifications", this.getClassifications());
      });

      if (recommendation.evaluationDate) {
        this.$set(recommendation, "loadingEvaluate", true);
        this.$http
          .get(
            this.$APIUri(
              "/evaluations/recommendation?idRecommendation=" +
                recommendation.id
            )
          )
          .then(response => response.json())
          .then(responseJson => {
            recommendation.questions.forEach(question => {
              responseJson.forEach(questionC => {
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
          })
          .catch(response => response.text())
          .then(message => {
            this.message.error = message;
          })
          .finally(() => {
            this.evaluationValidated = this.evaluationIsCompleted();
            recommendation.loadingEvaluate = false;
            $("#modalEvaluation").modal("show");
          });
      } else {
        this.evaluationValidated = this.evaluationIsCompleted();
        $("#modalEvaluation").modal("show");
      }
    },
    showModalMessageRefuse: function(recommendation) {
      this.buttonYesMessage = true;
      this.recommendation = recommendation;
      this.modal.title = "Recusar Recomendação";
      this.modal.message =
        "Deseja realmente recusar a recomendação " +
        recommendation.user.name +
        "?";
      this.modal.callback = this.refuse;

      $("#modalMessage").modal("show");
    },
    showModalMessageEmptyRecommendations: function() {
      this.buttonYesMessage = false;
      this.modal.title = "Olá";
      this.modal.message =
        "Você terminou suas interações? Se sim, envie um e-mail para paulo.prsdesouza@gmail.com para notificá-lo. Em breve, você receberá um e-mail para notificá-lo de que as recomendações foram geradas. Obrigado.";

      $("#modalMessage").modal("show");
    },
    showModalMessageRecommendedTo: function(recommendation, isFollow) {
      this.buttonYesMessage = true;
      this.recommendation = recommendation;

      var typeRecommendation = isFollow ? "Follow" : "Unfollow";

      if (isFollow) {
        this.modal.title = "Recommended to " + typeRecommendation;
        this.modal.callback = this.createFriendship;
      } else {
        this.modal.title = "Recommended to " + typeRecommendation;
        this.modal.callback = this.destroyFriendship;
      }

      this.modal.message =
        "Você realmente quer " +
        typeRecommendation +
        " " +
        recommendation.user.name +
        "?";

      $("#modalMessage").modal("show");
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
    this.getAll();
    this.getQuestions();
  }
};
</script>