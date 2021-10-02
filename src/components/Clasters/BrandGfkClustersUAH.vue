<template>
 <div class="week">

  <div v-if="isLoading" class="load">
   <Loader />
  </div>

  <div class="title" v-show="!isLoading">GFK uah</div>

  <div class="wr">
    <label v-show="!isLoading" class="check" ><input type="checkbox" checked="checked" @click.prevent="checkToggle" /><span>show / hide</span></label>
    <canvas class="canvas" ref="canvas"> </canvas> 
  </div>

 </div>
</template>


 </div>
</template>

<script>
import { Line } from "vue-chartjs";


export default {
 name: "BrandGfkClustersUAH",
 extends: Line,
 props: ['brand', 'smart'],
 data: () => ({
  isLoading: true,
  brandValueGfk: null,
  urlGfk: "./gfk.json",
  weeks: [],
  num: 6,
  lastWeek: 0,
  select: null,
  current: null,
  brands: [],
  idx: 'UAH',
  options: {
      responsive: true,

      legend: {
          align: "end",
          labels: {
              fontSize: 13,
          }
      },

      plugins: {
        datalabels: {
          color: 'red',
          id: 'y-axis-1',
          backgroundColor: function(context) {                 
            return context.dataset.backgroundColor
          },
          formatter: function(value, context) {
            return (value/1000000).toFixed(1)
          },
          display: 'auto',
          anchor: 'start',
          align : 'left',
          color: 'black',
          value: {
            callback: function (label, index, labels) {
              return (value).toFixed(1)
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
                return (label / 1000000).toFixed(1) + " M";
              },
            },
            scaleLabel: {
              display: true,
              // labelString: "1k = 100",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              callback: function (label, index, labels) {
                if(index === 3) {
                  return label
                }
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
   this.brands = await this.$root.$options.getAll
  // this.brands = await this.$store.dispatch("fetchBrandClusters",this.urlGfk)
  this.getBrandData()
  this.render()
  this.isLoading = false
  this.onInput()
 },

 watch: {
   brand(val) {
     this.brand = val
     this.getBrandData()
     this.brandValueGfk.length ? this.render() : this.$data._chart.clear()
   },
   smart(val) {
     this.smart = val

    if( this.smart === "Smart" ) {
      this.idx = "SmartUNITS"
    } else
    if( this.smart === "No Smart" ) {
      this.idx = "NoSmartUNITS"
    } else {
      this.idx = "UNITS"
    }
     this.brandValueGfk.length ? this.render() : this.$data._chart.clear()
   }
 },

 methods: {
  onInput() {
   this.$emit("changeLoadingBrand", this.isLoading)
  },

  checkToggle(){
    this.$data._chart.data.datasets.forEach( ds => ds.hidden = !ds.hidden )
    this.$data._chart.update()
  },

  getBrandData() {
    this.brandValueGfk = this.brands.filter((b) => {
      return b.brand === this.brand
    })
  },

  add() {
    let firstWeek = this.weeks.length
    let newData = (this.brandValueGfk[0].weeks[this.brandValueGfk[0].weeks.length - 1 - firstWeek])
    if (this.weeks.length < this.brandValueGfk[0].weeks.length) {  
        this.weeks.unshift(newData)
        this.$data._chart.data.labels.unshift(newData.week)
        this.$data._chart.data.datasets[0].data.unshift(newData.clasters['32'][this.idx])
        this.$data._chart.data.datasets[1].data.unshift(newData.clasters['43'][this.idx])
        this.$data._chart.data.datasets[2].data.unshift(newData.clasters['50'][this.idx])
        this.$data._chart.data.datasets[3].data.unshift(newData.clasters['60 >'][this.idx])

        this.$data._chart.update()
    }
  },

  remove() {
    let firstWeek = this.weeks.length;
      let newData = (this.brandValueGfk[0].weeks[this.brandValueGfk[0].weeks.length - firstWeek])
      if (this.weeks.length <= this.brandValueGfk[0].weeks.length && this.weeks.length > 2) {       
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
    this.weeks = []
   for (let i = this.num; i > 0; i--) {
    this.weeks.push( this.brandValueGfk[0].weeks[this.brandValueGfk[0].weeks.length - i] )
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
       data: this.weeks.map((w, i) => w.clasters["32"][this.idx]),
      },
      {
       label: "43",
       fill: false,
       backgroundColor: "#BAC658",
       borderColor: "#BAC658",
       data: this.weeks.map((w, i) => w.clasters["43"][this.idx]),
      },
      {
       label: "50",
       fill: false,
       backgroundColor: "#ffc107",
       borderColor: "#ffc107",
       data: this.weeks.map((w, i) => w.clasters["50"][this.idx]),
      },
      {
       label: "60",
       fill: false,
       backgroundColor: "#EC752C",
       borderColor: "#EC752C",
       data: this.weeks.map((w, i) => w.clasters["60 >"][this.idx]),
      },
     ],
    },
    this.options
   );
  },
 },
//  beforeDestroy () {
//    this.$data._chart.destroy()
//    console.log( 'Chart destroyed BrandGfkClusters' );
//  },
};
</script>

<style lang="scss" scoped >
.control {
 display: flex;
 justify-content: center;
 display: none;
}
.title {
  font-size: 1.3em;
  color: #0d34c5;
  display: flex;
  justify-content: center;
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