<template>
  <div>
    <div id="myChart"></div>
    <div v-if="loading" class="text-center">
      Carregando&nbsp;<i class="fas fa-spinner fa-pulse align-middle"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: ["dataGraph", "loading"],
  data() {
    return { loadingKeywords: false };
  },
  methods: {
    create: function() {
      var myConfig = {
        type: "bar",
        plotarea: {
          adjustLayout: true
        },
         scaleY: {
          label: {
            text: "Precisão"
          }
        },
        scaleX: {
          label: {
            text: "Usuários"
          },
          labels: this.dataGraph.labels
        },
        series: [
          {
            values: this.dataGraph.values
          }
        ]
      };

      zingchart.render({
        id: "myChart",
        data: myConfig,
        height: "300px",
        width: "100%"
      });
    }
  },
  watch: {
    dataGraph: function(newValue) {
      this.loadingKeywords = newValue.length > 0;
      if (this.loading) this.create();
    },
    loading: function(newValue) {}
  }
};
</script>

