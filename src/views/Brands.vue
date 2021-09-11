<template>


 <div class="clusters_brands" >

  <div v-if="!isloadedBrandGfk" class="load">
   <Loader />
  </div>



    <div class="brands" v-show="isloadedBrandGfk">
        <div class="title">Brands</div>
        
        <div class="select" > 
            <select class="wrap" ref="select" v-model="brand" >
            <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
            </select>
            <label>Materialize Select</label>
        </div>

        <div class="charts">
            <BrandGfkClusters :brand="brand" @changeLoadingBrand="loadedBrandGfk" />
            <BrandYugClusters :brand="brand" @changeLoadingBrand="loadedBrandYug" />
        </div>
        <div class="arrows">
            <button class="waves-effect waves-light btn-small" @click="addWeeksClasterBrand">
            <i class="material-icons dp48">keyboard_arrow_left</i>
            </button>
            <button class="waves-effect waves-light btn-small" @click="removeWeeksClasterBrand">
            <i class="material-icons dp48">keyboard_arrow_right</i>
            </button>
        </div>
    </div>
  
  
 </div>
</template>

<script>

import BrandGfkClusters from "@/components/Clasters/BrandGfkClusters";
import BrandYugClusters from "@/components/Clasters/BrandYugClusters";

import brands from "../data/brands";

export default {
 name: "clasters",
 data: () => ({
  isloadedBrandGfk: true,
  isloadedBrandYug: true,
  brands: [],
  brand: "ERGO",
 }),

 async mounted() {

  this.brands = brands;
  Chart.defaults.global.plugins.datalabels.display = false

  setTimeout(() => this.select = M.FormSelect.init(this.$refs.select))
  setTimeout(() => this.select = M.Collapsible.init(this.$refs.collapsible))

 },


 methods: {
  loadedClastersGfk() {
   this.isLoadedClastersGfk = true;
  },
  loadedClastersYug() {
   this.isLoadedClastersYug = true;
  },

  loadedBrandGfk() {
   this.isloadedBrandGfk = true;
  },
  loadedBrandYug() {
   this.isloadedBrandYug = true;
  },

  addWeeksClasterBrand() {
   this.$children[0].add();
   this.$children[1].add()
  },
  removeWeeksClasterBrand() {
   this.$children[0].remove();
   this.$children[1].remove()
  },
 },

 components: {
  BrandGfkClusters,
  BrandYugClusters
 },
};
</script>

<style lang="scss" scoped>

.clusters_brands {
    padding: 7px;
}

.load {
 display: flex;
 justify-content: center;
 padding-top: 40px;
}

.arrows {
 display: flex;
 justify-content: center;
 // display: none;
}

.charts {
 width: 100%;
 display: flex;
 justify-content: space-around;
}

.title {
 font-size: 1.5rem;
 display: flex;
 justify-content: center;
 background-color: #dbdce2;
}

.arrows {
 display: flex;
 justify-content: center;
 // display: none;
}

hr {
 border: 0;
 height: 1px;
 background-image: linear-gradient(left, #f0f0f0, #8c8c8c, #f0f0f0);
}

.brands {
 width: 100%;
//  padding-top: 50px;
}

.brand {
 width: 50%;
}


.select {
    width: 370px;
    margin: 0 auto;
}


</style>