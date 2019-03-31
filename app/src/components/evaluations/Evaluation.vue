<template>
  <div>
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a
          class="nav-item nav-link active"
          id="nav-online-tab"
          data-toggle="tab"
          href="#nav-online"
          role="tab"
          aria-controls="nav-online"
          aria-selected="true"
        >Avaliação Online</a>
        <a
          class="nav-offline nav-link"
          id="nav-offline-tab"
          data-toggle="tab"
          href="#nav-offline"
          role="tab"
          aria-controls="nav-offline"
          aria-selected="false"
        >Avaliação Offline (Spearman Correlation)</a>
        <a
          class="nav-offline-cosine nav-link"
          id="nav-offline-cosine-tab"
          data-toggle="tab"
          href="#nav-offline-cosine"
          role="tab"
          aria-controls="nav-offline-cosine"
          aria-selected="false"
        >Avaliação Offline (Cosine Similarity)</a>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="nav-online"
        role="tabpanel"
        aria-labelledby="nav-online-tab"
      >
        <on-line></on-line>
      </div>
      <div class="tab-pane fade" id="nav-offline" role="tabpanel" aria-labelledby="nav-offline-tab">
        <off-line></off-line>
      </div>
      <div
        class="tab-pane fade"
        id="nav-offline-cosine"
        role="tabpanel"
        aria-labelledby="nav-offline-cosine-tab"
      >
        <off-line-cosine></off-line-cosine>
      </div>
    </div>
  </div>
</template>
<script>
import OffLine from "@/components/evaluations/OffLine";
import OffLineCosine from "@/components/evaluations/OffLineCosine";
import OnLine from "@/components/evaluations/OnLine";

export default {
  data() {
    return {};
  },
  components: {
    OffLine,
    OffLineCosine,
    OnLine
  },
  methods: {}
};
</script>
