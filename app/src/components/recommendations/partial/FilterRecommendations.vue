<template>
    <div class="card background-white">
        <div class="card-body">
            <h5 class="card-title">Filter</h5>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>User</label>
                        <input class="form-control" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label>Recommended</label>
                        <select class="form-control">
                            <option>Select</option>
                            <option value="F">Follow</option>
                            <option value="U">Unfollow</option>
                        </select>
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-outline-primary float-right" v-on:click="save()">Search</button>
        </div>
    </div>
</template>

<script>
export default {
  props: ["title", "message", "callback"],
  data() {
    return {};
  },
  methods: {
    save: function() {
      this.callback();
    }
  }
};
</script>
