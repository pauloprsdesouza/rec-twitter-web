<template>
  <div>
    <div id="areaChartInteractionsGeral"></div>
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
      var colors = {
        gray: "#EBEBEB",
        grayDark: "#3F3F3F"
      };

      var myConfig = {
        type: "area",
        legend: {
          layout: "1x3",
          x: "15%",
          y: "2%"
        },
        plot: {
          aspect: "spline",
          animation: {
            delay: 400,
            effect: 3,
            speed: 500,
            method: "ANIMATION_BOUNCE_EASE_OUT",
            sequence: 0
          }
        },
        tooltip: {
          visible: true,
          text: "%kl<br><span style='color:%color'>%t: </span>%v<br>",
          backgroundColor: "white",
          borderColor: "#e3e3e3",
          borderRadius: "5px",
          bold: true,
          fontSize: "12px",
          fontColor: "#2f2f2f",
          textAlign: "left",
          padding: "15px",
          shadow: true,
          shadowAlpha: 0.2,
          shadowBlur: 5,
          shadowDistance: 4,
          shadowColor: "#a1a1a1"
        },
        scaleX: {
          lineColor: colors.gray,
          lineWidth: "1px",
          tick: {
            lineColor: "#C7C7C7",
            lineWidth: "1px"
          },
          guide: {
            lineStyle: "solid",
            lineColor: colors.gray,
            alpha: 1
          },
          item: {
            color: colors.grayDark,
            "font-size": 14
          },
          labels: [1, 2, 3, 4, 5],
          label: {
            text: "Ratings",
            fontColor: "#616161",
            "font-size": 14
          }
        },
        scaleY: {
          lineColor: colors.gray,
          lineWidth: "1px",
          step: 0.15,
          tick: {
            lineColor: "#C7C7C7",
            lineWidth: "1px"
          },
          guide: {
            lineStyle: "solid",
            lineColor: colors.gray,
            alpha: 1
          },
          item: {
            color: colors.grayDark,
            "font-size": 14
          },
          label: {
            text: "Interação",
            fontColor: "#616161",
            "font-size": 14
          }
        },
        series: [
          {
            values: this.dataGraph.question1,
            lineColor: "#4561c9",
            lineWidth: "2px",
            backgroundColor: "#4561c9",
            marker: {
              backgroundColor: "#4561c9"
            },
            text: "Precisão"
          },
          {
            values: this.dataGraph.question2,
            lineColor: "#d23622",
            lineWidth: "2px",
            backgroundColor: "#d23622",
            marker: {
              backgroundColor: "#d23622"
            },
            text: "Familiaridade"
          },
          {
            values: this.dataGraph.question3,
            lineColor: "#2e9722",
            lineWidth: "2px",
            backgroundColor: "#2e9722",
            marker: {
              backgroundColor: "#2e9722"
            },
            text: "Satisfação"
          }
        ]
      };

      zingchart.render({
        id: "areaChartInteractionsGeral",
        data: myConfig,
        height: "450px",
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

