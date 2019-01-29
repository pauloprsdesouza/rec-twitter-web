<template>
    <div class="modal fade" id="modalRegisterEmail" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Cadastrar de E-mail<br/>
                        <small>Por favor informe seu e-mail para possibilitar uma melhor comunicação.</small>
                    </h5>
                </div>
                <div class="modal-body">
                    <div class="alert alert-dismissible alert-danger fade show" v-if="message.error">
                        <span v-if="message.error">{{message.error}}</span>
                        <button type="button" class="close" v-on:click="clearMessage()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" class="form-control" v-model="user.email" v-bind:class="{'is-invalid': !user.email, 'is-valid': user.email}"/>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" v-on:click="save()" v-bind:disabled="loading || !user.email">
                        <span v-if="loading">
                            <i class="fas fa-spinner fa-pulse"></i>&nbsp;Salvando</span>
                        <span v-if="!loading">Salvar</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      loading: false,
      message: { error: null }
    };
  },
  methods: {
    clearMessage: function() {
      this.message = { error: null };
    },
    save: function() {
      this.loading = true;

      this.$http
        .post(this.$APIUri("/users/registeremail"), { email: this.user.email })
        .then(response => response.json())
        .then(message => {
          $("#modalRegisterEmail").modal("hide");
        })
        .catch(response => response.json())
        .then(response => {
          this.message.error = response;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>