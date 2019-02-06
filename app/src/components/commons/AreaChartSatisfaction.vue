<template>
  <div>
    <div id="chartSatisfaction"></div>
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
        legend: {},
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
            color: colors.grayDark
          },
          labels: [1, 2, 3, 4, 5],
          label: {
            text: "Ratings",
            fontColor: "#616161"
          }
        },
        scaleY: {
          lineColor: colors.gray,
          lineWidth: "1px",
          step: 100,
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
            color: colors.grayDark
          },
          label: {
            text: "Frequência %",
            fontColor: "#616161"
          }
        },
        series: [
          {
            values: this.dataGraph.question3,
            lineColor: "#3DB220",
            lineWidth: "2px",
            backgroundColor: "#3DB220",
            marker: {
              backgroundColor: "#3DB220"
            },
            text: "Satisfação"
          }
        ]
      };

      zingchart.render({
        id: "chartSatisfaction",
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

