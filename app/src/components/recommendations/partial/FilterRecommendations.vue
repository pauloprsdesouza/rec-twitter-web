<template>
    <div class="card background-white">
        <div class="card-body">
            <h5 class="card-title">Filter</h5>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>User</label>
                        <input class="form-control" v-model="filter.userName" v-on:keyup.enter="search()"/>
                    </div>
                </div>
            </div>
            <button type="button" v-bind:disabled="loading" class="btn btn-outline-primary float-right" v-on:click="search()">
                <span v-if="loading">
                    <i class="fas fa-spinner fa-pulse"></i>&nbsp;Loading</span>
                <span v-if="!loading">Search</span>
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
