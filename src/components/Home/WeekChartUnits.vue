<template>
  <div class="week">
    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";

export default {
  name: "WeekChartUnits",
  extends: Line,
  data: () => ({
    isLoading: true,
    weeksValueGfk: null,
    weeksValueYug: null,
    weeksGfk: [],
    weeksYug: [],
    urlGfk: "./gfk.json",
    urlYug: "./yug.json",
    num: 6,
    options: {
      responsive: true,

      annotation: {
        annotations: [
          {
            type: "line",
            mode: "vertical",
            scaleID: "x-axis-0",
            value: "36",
            borderColor: "red",
            label: {
              content: "TODAY",
              enabled: true,
              position: "top"
            }
          }
        ]
      },

      plugins: {
        datalabels: {
          id: 'y-axis-1',
          backgroundColor: function(context) {
            return context.dataset.backgroundColor
          },
          formatter: function(value, context) {
              return (value/1000).toFixed(1)
          },
          display: 'auto',
          anchor: 'start',
          align : 'top',
          color: 'white',
          value: {
            callback: function (label, index, labels) {
              return (value / 1000).toFixed(1) + "k";
            }
          },
        }
      },

      scales: {
        xAxes: [
          {
            id: "x-axis-0",
            ticks: {
              callback: function (label, index, labels) {          
                return label               
              },
              // fontColor: "purple",
              // backgroundColor: "red",
              fontSize: 14,
              stepSize: 1,
              beginAtZero: true,
            },
          },
        ],
        yAxes: [
          {
            id: "y-axis-1",
            ticks: {
              callback: function (label, index, labels) {
                return (label / 1000).toFixed(0) + "k";
              },
            },
            scaleLabel: {
              display: true,
              labelString: "1k = 1000",
            },
          },
          {
            id: "y-axis-2",
            position: "right",
            ticks: {
              callback: function (label, index, labels) {
                return (label / 1000).toFixed(1) + "k";
              },
            },
            scaleLabel: {
              display: false,
              labelString: "1k = 1000",
            },
          },
        ],
      },
    },
  }),

  async mounted() {
    this.weeksValueGfk = await this.$store.dispatch("fetchJson", this.urlGfk);
    this.weeksValueYug = await this.$store.dispatch("fetchJson", this.urlYug);
    this.render();
    this.isLoading = false;
    this.onInput();
  },

  methods: {
    onInput() {
      this.$emit("changeLoading", this.isLoading);
    },

    add() {
      let firstWeek = this.weeksGfk.length;
      let newDataGfk = this.weeksValueGfk[
        this.weeksValueGfk.length - 1 - firstWeek
      ];
      let newDataYug = this.weeksValueYug[
        this.weeksValueYug.length - 1 - firstWeek
      ];
      if (this.weeksGfk.length < this.weeksValueGfk.length) {
        this.weeksGfk.unshift(newDataGfk);
        this.weeksYug.unshift(newDataYug);
        this.$data._chart.data.labels.unshift(newDataGfk.week);
        this.$data._chart.data.datasets[0].data.unshift(newDataGfk.units);
        this.$data._chart.data.datasets[1].data.unshift(newDataYug.units);
        this.$data._chart.update();
      }
    },

    remove() {
      let firstWeek = this.weeksGfk.length;
      let newDataGfk = this.weeksValueGfk[
        this.weeksValueGfk.length - firstWeek
      ];
      let newDataYug = this.weeksValueGfk[
        this.weeksValueGfk.length - firstWeek
      ];
      if (
        this.weeksGfk.length <= this.weeksValueGfk.length &&
        this.weeksGfk.length > 2
      ) {
        this.weeksGfk.shift(newDataGfk);
        this.weeksYug.shift(newDataYug);
        this.$data._chart.data.labels.shift(newDataGfk.week);
        this.$data._chart.data.datasets[0].data.shift(newDataGfk.units);
        this.$data._chart.data.datasets[1].data.shift(newDataYug.units);
        this.$data._chart.update();
      }
    },

    render() {
      for (let i = this.num; i > 0; i--) {
        this.weeksGfk.push(this.weeksValueGfk[this.weeksValueGfk.length - i]);
      }
      for (let i = this.num; i > 0; i--) {
        this.weeksYug.push(this.weeksValueYug[this.weeksValueYug.length - i]);
      }
      this.renderChart(
        {
          labels: this.weeksGfk.map((w) => w.week) || null,
          datasets: [
            {
              label: "GFK Units",
              yAxisID: "y-axis-1",
              fill: false,
              backgroundColor: "rgb(63, 166, 236)",
              borderColor: "rgb(63, 166, 236)",
              data: this.weeksGfk.map((w) => w.units),
            },
            {
              label: "YUG Units",
              yAxisID: "y-axis-2",
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: this.weeksYug.map((w) => w.units),
            },
          ],
        },
        this.options
      );
    },
  },
  beforeDestroy() {
    this.$data._chart.destroy();
    console.log("Chart destroyed WeekChartUnits");
  },
};
</script>

<style lang="scss" >
.week {
  width: 50%;
}
.control {
  display: flex;
  justify-content: center;
  display: none;
}
.btn-small {
  margin: 0 10px 0 10px;
  i {
    font-size: 1.4rem !important;
  }
}
</style>