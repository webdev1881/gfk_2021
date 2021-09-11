<template>
  <div class="week">

    <div class="title" v-show="!isLoading">GFK</div>

    <div v-if="isLoading" class="load">
      <Loader />
    </div>
   
    <div class="wr">
      <label v-show="!isLoading" class="check" ><input type="checkbox" checked="checked" @click.prevent="checkToggle" /><span>show / hide</span></label>
      <canvas class="canvas" ref="canvas"> </canvas> 
    </div>    
    
 

  </div>
</template>

<script>
import { Line } from "vue-chartjs"


export default {
  name: "WeekChartUnits",
  extends: Line,
  data: () => ({
    isLoading: true,
    weeksValue: null,
    weeks: [],
    url: './gfk.json',
    num: 6,
    options: {
      responsive: true,
      // maintainAspectRatio: false,

      plugins: {
        datalabels: {
          color: 'red',
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
          color: 'black',
          value: {
            callback: function (label, index, labels) {
              return (value / 1000).toFixed(1) + "k";
            }
          },
        }
      },

      scales: {
        yAxes: [
          {
            ticks: {
              backdropColor: 'black',
              callback: function (label, index, labels) {
                
                return (label / 1000).toFixed(0) + "k";
              },
            },
            scaleLabel: {
              display: true,
              labelString: "1k = 1000",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              callback: function (label, index, labels) {
                // console.log( this );
                if(index === 3) {
                  return label
                }
                // console.log( labels );
                return label
              },
            },
            scaleLabel: {
              // display: true,
            },
          },
        ],
      },
      
    },
  }),

  async mounted() {
    this.weeksValue = await this.$store.dispatch("fetchJson", this.url)
    this.render()
    this.isLoading = false
    this.onInput()
    // console.log( this.$data._chart.data.datasets )
  },

  methods: {
    onInput(){
      this.$emit('changeLoadingGfk', this.isLoading)
    },

    checkToggle(){
      this.$data._chart.data.datasets.forEach( ds => ds.hidden = !ds.hidden )
      this.$data._chart.update()
    },

    add() {
      let firstWeek = this.weeks.length;
      // console.log(firstWeek);
      let newData = (this.weeksValue[this.weeksValue.length - 1 - firstWeek])
      // console.log(newData);
      if (this.weeks.length < this.weeksValue.length) {  
        this.weeks.unshift(newData)
        this.$data._chart.data.labels.unshift(newData.week)
        this.$data._chart.data.datasets[0].data.unshift(newData.clasters['32'].UNITS)
        this.$data._chart.data.datasets[1].data.unshift(newData.clasters['43'].UNITS)
        this.$data._chart.data.datasets[2].data.unshift(newData.clasters['50'].UNITS)
        this.$data._chart.data.datasets[3].data.unshift(newData.clasters['60 >'].UNITS)

        this.$data._chart.update()
      }
    },

    remove() {
      let firstWeek = this.weeks.length;
      let newData = (this.weeksValue[this.weeksValue.length - firstWeek])
      if (this.weeks.length <= this.weeksValue.length && this.weeks.length > 2) {       
        this.weeks.shift(newData)
        this.$data._chart.data.labels.shift(newData.week)
        this.$data._chart.data.datasets[0].data.shift(newData.units)
        this.$data._chart.data.datasets[1].data.shift(newData.units)
        this.$data._chart.data.datasets[2].data.shift(newData.units)
        this.$data._chart.data.datasets[3].data.shift(newData.units)

        this.$data._chart.update()     
      }
    },

    render() {
      for (let i = this.num; i > 0; i--) {
        this.weeks.push(this.weeksValue[this.weeksValue.length - i])
      }

      this.renderChart(
        {
          labels: this.weeks.map((w) => w.week) || null,
          datasets: [
            {
              label: "32",
              fill: false,
              backgroundColor: "#75B34B",
              borderColor: "#75B34B",
              data: this.weeks.map((w,i) => w.clasters['32'].UNITS  ),
            },
            {
              label: "43",
              fill: false,
              backgroundColor: "#BAC658",
              borderColor: "#BAC658",
              data: this.weeks.map((w,i) => w.clasters['43'].UNITS ),
            },
            {
              label: "50",
              fill: false,
              backgroundColor: "#ffc107",
              borderColor: "#ffc107",
              data: this.weeks.map((w,i) => w.clasters['50'].UNITS ),
            },
            {
              label: "60 >",
              fill: false,
              backgroundColor: "#EC752C",
              borderColor: "#EC752C",
              data: this.weeks.map((w,i) => w.clasters['60 >'].UNITS ),
            },
          ]
        }, 
        this.options);
    },


  },
  beforeDestroy () {
    this.$data._chart.destroy()
    console.log( 'Chart destroyed WeekGfkClusters' );
  },
}
</script>

<style lang="scss" scoped >

.week {
  width: 50%;
}
.title {
  font-size: 1.3em;
  color: #0d34c5;
  display: flex;
  justify-content: center;
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

.check {
  margin-left: 50px;
}

</style>