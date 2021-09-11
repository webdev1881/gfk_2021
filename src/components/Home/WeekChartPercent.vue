<template>
  <div class="week">
    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <canvas class="canvas" ref="canvas"></canvas>

  </div>
</template>

<script>
import { Bar } from "vue-chartjs"


export default {
  extends: Bar,
  data: () => ({
    isLoading: true,
    weeksValueGfk: null,
    weeksValueYug: null,
    weeksGfk: [],
    weeksYug: [],
    urlGfk: './gfk.json',
    urlYug: './yug.json',
    num: 6,
    options: {
      responsive: true,

      plugins: {
        datalabels: {
          id: 'y-axis-1',
        //   backgroundColor: function(context) {
        //     return context.dataset.backgroundColor
        //   },
          formatter: function(value, context) {
              return (value*100).toFixed(1) + "%"
          },
          display: 'auto',
          anchor: 'end',
          // clamp: true,
          align: 'end',
          color: 'black',
          value: {
            callback: function (label, index, labels) {
              return (value*100 ).toFixed(1) + "k";
            }
          },
        }
      },

      tooltips: {
        position: 'nearest',
        callbacks: {
          label: function(tooltipItem, data) {
            let value = +tooltipItem.value
            return (value*100).toFixed(1) + " %";
          }
        }
      },

      scales: {         
        yAxes: [
          {
            id: 'y-axis-1',        
            ticks: {
              max: 1,
              min: 0,
              callback: function (label, index, labels) {
                return (label*100).toFixed(0) + " %";
              },
            },
          },
        ],
      },
    },
  }),

  async mounted() {
    this.weeksValueGfk = await this.$store.dispatch("fetchJson", this.urlGfk);
    this.weeksValueYug = await this.$store.dispatch("fetchJson", this.urlYug);
    // console.log( this.weeksValueGfk )
    this.render();
    this.isLoading = false;
    this.onInput()
  },

  methods: {
    onInput(){
      this.$emit('changeLoading', this.isLoading);
    },

    add() {
      let firstWeek = this.weeksGfk.length;
      let newDataGfk = (this.weeksValueGfk[this.weeksValueGfk.length - 1 - firstWeek])
      let newDataYug = (this.weeksValueYug[this.weeksValueYug.length - 1 - firstWeek])

      console.log(newDataGfk);
      console.log(newDataYug);

      if (this.weeksGfk.length < this.weeksValueGfk.length) {  
        this.weeksGfk.unshift(newDataGfk)
        this.weeksYug.unshift(newDataYug)
        this.$data._chart.data.labels.unshift(newDataGfk.week)
        this.$data._chart.data.datasets[0].data.unshift(newDataYug.uah/newDataGfk.uah)
        // this.$data._chart.data.datasets[1].data.unshift(newDataYug.uah)
        this.$data._chart.update()     
      }
    },

    remove() {
      let firstWeek = this.weeksGfk.length;
      let newDataGfk = (this.weeksValueGfk[this.weeksValueGfk.length - firstWeek])
      let newDataYug = (this.weeksValueGfk[this.weeksValueGfk.length - firstWeek])
      if (this.weeksGfk.length <= this.weeksValueGfk.length && this.weeksGfk.length > 2) {       
        this.weeksGfk.shift(newDataGfk)
        this.weeksYug.shift(newDataYug)
        this.$data._chart.data.labels.shift(newDataGfk.week)
        this.$data._chart.data.datasets[0].data.shift(newDataYug.uah)
        // this.$data._chart.data.datasets[1].data.shift(newDataYug.uah)
        this.$data._chart.update()     
      }
    },

    render() {
      for (let i = this.num; i > 0; i--) {
        this.weeksGfk.push(this.weeksValueGfk[this.weeksValueGfk.length - i])
      }
      for (let i = this.num; i > 0; i--) {
        this.weeksYug.push(this.weeksValueYug[this.weeksValueYug.length - i])
      }
      this.renderChart(
        {
          labels: this.weeksGfk.map((w) => w.week) || null,
          datasets: [
            {
              label: "GFK UAH",
              yAxisID: 'y-axis-1',
              fill: true,
              backgroundColor: "#388181",
              borderColor: 'rgba(0, 0, 0, 0.1)',
              data: this.weeksYug.map((wy) => {
                  let perc = 0
                  this.weeksGfk.map((wg) => {      
                     wg.week === wy.week ?  perc = wy.uah/wg.uah : false              
                    } )
                return perc
                }),
            },
          ],
        }, 
        this.options);
    },


  },
  beforeDestroy () {
    this.$data._chart.destroy()
    console.log( 'Chart destroyed WeekChartUAH' );
  },
}
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