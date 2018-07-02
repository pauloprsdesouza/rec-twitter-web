<template>
    <div class="card">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
                <span v-if="globalization.en">Instructions of the experiment</span>
                <span v-if="globalization.pt">Instruções do experimento</span>
            </h5>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button class="btn btn-sm" v-on:click="changeGlobalizationPtBR()" v-bind:class="{'btn-outline-dark': globalization.en, 'btn-dark': globalization.pt}">
                    <span class="flag-icon flag-icon-br" style="font-size:20pt;"></span>
                </button>
                <button class="btn btn-sm" v-on:click="changeGlobalizationEN()" v-bind:class="{'btn-outline-dark': globalization.pt, 'btn-dark': globalization.en}">
                    <span class="flag-icon flag-icon-us" style="font-size:20pt;"></span>
                </button>
            </div>
        </div>
        <div class="modal-body">
            <p v-if="globalization.en" class="lead text-justify">
                This experiment aims to
                <mark>analyze the interactions</mark> with the tweets received on your timeline. Hence some criteria are required to realize this experiment such as shown below:
            </p>
            <p v-if="globalization.pt" class="lead text-justify">
                Este experimento visa
                <mark>analisar as interações</mark> com os tweets recebidos na sua timeline. Portanto alguns critérios são necessários para a realização deste experimento como mostrado abaixo:
            </p>
            <h1 class="display-6">
                <span v-if="globalization.en">Criteria</span>
                <span v-if="globalization.pt">Critérios</span>
            </h1>
            <ul class="list-group mb-5">
                <li class="list-group-item lead">
                    <i class="far fa-clock fa-2x align-middle"></i>&nbsp;
                    <span v-if="globalization.en">To use Twitter within a period of 24 hours</span>
                    <span v-if="globalization.pt">Usar o Twitter dentro de um período de 24 horas</span>
                </li>
                <li class="list-group-item lead">
                    <i class="fas fa-user fa-2x align-middle"></i>&nbsp;
                    <span v-if="globalization.en">To follow at least 20 accounts</span>
                    <span v-if="globalization.pt">Seguir pelo menos 20 contas</span>
                </li>
                <li class="list-group-item lead text-justify">
                    <i class="far fa-hand-pointer fa-2x align-middle"></i>&nbsp;
                    <span v-if="globalization.en">To interact at least with 20 received tweets on the timeline through any criteria of interaction for instance: retweet, like or reply</span>
                    <span v-if="globalization.pt">Interagir pelo menos com 20 tweets recebidos na sua timeline através de qualquer critério de interação por exemplo: retweet, like ou reposta</span>
                </li>
            </ul>

            <h1 class="display-6">
                <span v-if="globalization.en">Example of a tweet</span>
                <span v-if="globalization.pt">Exemplo de um tweet</span>
            </h1>
            <div class="card mb-5">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-1">
                            <i class="fas fa-user-circle fa-3x"></i>
                        </div>
                        <div class="col-md-11">
                            <span v-if="globalization.en">
                                <b>Steve Jobs</b> @stevejobs 31 dec 2017</span>
                            <span v-if="globalization.pt">
                                <b>Steve Jobs</b> @stevejobs 31 de dez de 2017</span>
                            <div class="div-message"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="div-message"></div>
                            <div class="div-message"></div>
                            <div class="div-message"></div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col">
                            <div class="btn-group">
                                <button class="btn btn-light">
                                    <i class="far fa-comment"></i>&nbsp;2</button>
                                <button class="btn btn-light">
                                    <i class="fas fa-retweet text-success"></i>&nbsp;
                                    <span class="text-success">5</span>
                                </button>
                                <button class="btn btn-light">
                                    <i class="fas fa-heart text-danger"></i>&nbsp;
                                    <span class="text-danger">8</span>
                                </button>
                                <button class="btn btn-light">
                                    <i class="far fa-envelope"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <p class="lead text-justify mt-4">
                        <span v-if="globalization.en">If you have have any doubt see the</span>
                        <span v-if="globalization.pt">Se você tiver alguma dúvida acesse</span>
                        <a href="https://help.twitter.com/pt/glossary">Twitter Glossary</a>
                    </p>
                </div>
            </div>

            <h1 class="display-6">
                <span v-if="globalization.en">Attention</span>
                <span v-if="globalization.pt">Atenção</span>
            </h1>
            <p v-if="globalization.en" class="lead text-justify">
                This system
                <mark>does not save any credentials</mark> of your account ex.: username and password. Remember only the data of the timeline and profile are used for the analysis and no data are published or shared with other applications.
            </p>
            <p v-if="globalization.pt" class="lead text-justify">
                Este sistema
                <mark>não salva nenhuma credencial</mark> da sua conta, por exemplo: nome do usuário e senha. Lembre-se, apenas os dados da timeline e do perfil são usados para a análise de modo que não são publicados ou compartilhados com outras aplicações.
            </p>
            <h1 class="display-6">
                RecTwitter Tutorial
            </h1>
            <div class="row justify-content-center video-tutorial">
                <div class="col-md-12 col-sm-12">
                    <div class="embed-responsive embed-responsive-16by9 mt-5" style="height:400px; margin-left:auto; margin-right:auto">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/HsScQwWdapg" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      globalization: { en: false, pt: true }
    };
  },
  methods: {
    changeGlobalizationEN: function() {
      this.globalization.en = true;
      this.globalization.pt = false;
    },
    changeGlobalizationPtBR: function() {
      this.globalization.pt = true;
      this.globalization.en = false;
    }
  }
};
</script>
