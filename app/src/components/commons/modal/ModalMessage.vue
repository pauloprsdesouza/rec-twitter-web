<template>
    <div class="modal fade" id="modalMessage" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        {{title}}
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    {{message}}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" v-on:click="no()">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="yes()" v-bind:disabled="loading">
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
  props: ["title", "message", "callbackYes", "callbackNo", "loading"],
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
