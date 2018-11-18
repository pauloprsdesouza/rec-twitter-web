<template>
    <div class="modal fade" id="modalMessage" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        {{title}}
                    </h5>
                </div>
                <div class="modal-body">
                    {{message}}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" v-on:click="no()">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="yes()" v-bind:disabled="loading" v-if="visibleYes">
                        <span v-if="loading">
                            <i class="fas fa-spinner fa-pulse"></i>&nbsp;Saving</span>
                        <span v-if="!loading">Yes</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["title", "message", "callbackYes", "callbackNo", "loading", "visibleYes"],
  data() {
    return {};
  },
  methods: {
    yes: function() {
      this.callbackYes();
    },
    no: function() {
      if (this.callbackNo === Function) {
        this.callbackNo();
      } else {
        $("#modalMessage").modal("hide");
      }
    }
  }
};
</script>
