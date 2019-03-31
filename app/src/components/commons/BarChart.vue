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
        var text = "U";
        labelsUsers.push(text.concat(index + 1));
      });

      var myConfig = {
        type: "bar",
        plot: {
          "value-box": {
            "font-size": 16
          }
        },
        plotarea: {
          adjustLayout: true
        },
        scaleY: {
          label: {
            text: "Frequência",
            "font-size": 18,
            fontColor: "#555555",
          },
          item: {
            "font-size": 18,
            fontColor: "#555555",
          }
        },
        scaleX: {
          item: {
            "font-size": 18,
            fontColor: "#555555",
          },
          label: {
            text: "Precisão",
             "font-size": 18,
             fontColor: "#555555",
          },
          labels: [
            "< 0.52",
            "0.52-0.58",
            "0.58-0.65",
            "0.65-0.71",
            "0.71-0.77",
            "0.77-0.83",
            "> 0.83"
          ]
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

