<template>
  <div>
    <div id="myChart"></div>
    <div v-if="loading" class="text-center">
      Carregando&nbsp;
      <i class="fas fa-spinner fa-pulse align-middle"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: ["dataGraph", "loading"],
  data() {
    return {};
  },
  methods: {
    create: function() {
      var labelsUsers = [];

      this.dataGraph.values.forEach((item, index) => {
          var text = "U"
          labelsUsers.push(text.concat(index+1));
      });

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
            text: "Recomendações Por Usuários"
          },
          labels: labelsUsers
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
      if (this.loading) this.create();
    },
    loading: function(newValue) {}
  }
};
</script>

