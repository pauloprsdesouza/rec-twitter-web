<template>
  <div>
    <div v-show="!loading && loadingKeywords" id="myChart"></div>
    <div v-if="loading" class="text-center">
      <i class="fas fa-spinner fa-pulse fa-2x align-middle"></i>&nbsp;Loading
    </div>
  </div>
</template>
<script>
export default {
  props: ["keyWords", "loading"],
  data() {
    return { loadingKeywords: false };
  },
  methods: {
    create: function() {
      var myConfig = {
        type: "wordcloud",
        options: {
          words: this.keyWords,
          minLength: 1,
          ignore: [],
          maxItems: 100,
          aspect: "flow-center",
          rotate: true,
          colorType: "palette",
          palette: [
            "#D32F2F",
            "#5D4037",
            "#1976D2",
            "#E53935",
            "#6D4C41",
            "#1E88E5",
            "#F44336",
            "#795548",
            "#2196F3",
            "#EF5350",
            "#8D6E63",
            "#42A5F5"
          ],

          style: {
            fontFamily: "Crete Round",

            hoverState: {
              backgroundColor: "#D32F2F",
              borderRadius: 2,
              fontColor: "white"
            },
            tooltip: {
              text: "%text: %hits",
              visible: true,

              alpha: 0.9,
              backgroundColor: "#1976D2",
              borderRadius: 2,
              borderColor: "none",
              fontColor: "white",
              fontFamily: "Georgia",
              textAlpha: 1
            }
          }
        },

        source: {
          text: "",

          fontColor: "#64B5F6",
          fontSize: 10,
          fontFamily: "Georgia",
          fontWeight: "normal",
          marginBottom: "10%"
        }
      };

      zingchart.render({
        id: "myChart",
        height: "300px",
        data: myConfig,
        width: "100%"
      });
    }
  },
  watch: {
    keyWords: function(newValue) {
      this.loadingKeywords = newValue.length > 0;
      if (this.loading) this.create();
    },
    loading: function(newValue) {}
  }
};
</script>

