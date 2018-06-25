<template>
  <div>
    <div id="myChart" class="mt-4"></div>
    <div class="text-center">
      <i v-if="loading" class="fas fa-spinner fa-pulse fa-4x align-middle"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: ["keyWords", "loading"],
  data() {
    return {
    };
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
        data: myConfig,
        width: "100%"
      });
    }
  },
  watch: {
    keyWords: function(newKeyWords) {
      this.create();
    }
  }
};
</script>

