<template>
  <div>
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a
          class="nav-item nav-link active"
          id="nav-home-tab"
          data-toggle="tab"
          href="#nav-home"
          role="tab"
          aria-controls="nav-home"
          aria-selected="true"
        >Avaliação On-line</a>
        <a
          class="nav-item nav-link"
          id="nav-profile-tab"
          data-toggle="tab"
          href="#nav-profile"
          role="tab"
          aria-controls="nav-profile"
          aria-selected="false"
        >Avaliação Off-line</a>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
        <on-line></on-line>
      </div>
      <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
        <off-line></off-line>
      </div>
    </div>
  </div>
</template>
<script>
import OffLine from "@/components/evaluations/OffLine";
import OnLine from "@/components/evaluations/OnLine";

export default {
  data() {
    return {};
  },
  components: {
    OffLine,
    OnLine
  },
  methods: {}
};
</script>
