<template>
  <div>
    <div id="header-portifolio" class="banner banner-backdrop backdrop-opace1 home text-center">
      <div class="banner-heading">
        <img src="../assets/rec-twitter-logo.png" class="mb-4 img-fluid img-logo" width="400" />
        <p class="font-size-sm">A Recommendation System For Twitter</p>
      </div>
      <div class="banner-body">
        <a class="btn btn-primary btn-lg" :href="this.$APIUri('/users/signin')" v-bind:disabled="loading" v-on:click="login()">
          <span v-if="loading">
            <i class="fas fa-spinner fa-pulse"></i>&nbsp;Carregando</span>
          <span v-if="!loading">Login Twitter</span>
        </a>
        <a class="btn btn-secondary btn-lg" href="/instructions" target="_blank">Instruções do Experimento
        </a>
        <div class="row justify-content-center video-tutorial">
          <div class="col-md-5 col-sm-12">
            <div class="embed-responsive embed-responsive-16by9 mt-5" style="height:400px; margin-left:auto; margin-right:auto">
              <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/ktYsCZJYArU" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-instructions></modal-instructions>
  </div>
</template>

<script>
import ModalInstructions from "@/components/instructions/Instructions";
import InstructionsBlackPage from "@/components/instructions/InstructionsBlankPage";

export default {
  name: "LoginTwitter",
  data() {
    return {
      loading: false
    };
  },
  components: {
    ModalInstructions,
    InstructionsBlackPage
  },
  methods: {
    login: function() {
      this.loading = true;
    }
  }
};
</script>