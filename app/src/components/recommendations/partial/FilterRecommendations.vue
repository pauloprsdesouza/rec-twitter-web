<template>
    <div class="card background-white">
        <div class="card-body">
            <h5 class="card-title">Filtro</h5>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>Usuário</label>
                        <input class="form-control" v-model="filter.userName" v-on:keyup.enter="search()"/>
                    </div>
                </div>
            </div>
            <button type="button" v-bind:disabled="loading" class="btn btn-outline-primary float-right" v-on:click="search()">
                <span v-if="loading">
                    <i class="fas fa-spinner fa-pulse"></i>&nbsp;Carregando</span>
                <span v-if="!loading">Buscar</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
  props: ["callback", "loading"],
  data() {
    return {
      filter: { toFollow: null, userName: null }
    };
  },
  methods: {
    search: function() {
      this.callback(this.filter);
    }
  }
};
</script>
