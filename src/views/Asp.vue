<template>

 <div class="asps">
  <div class="title">ASP</div>
  <div class="charts">
   <div class="asp">
    <GfkASP @changeLoading="loadedUnits" />
   </div>
   <div class="asp">
    <YugASP @changeLoading="loadedUnits" />
   </div>
  </div>
 </div>

</template>

<script>

import GfkASP from "@/components/Asp/GfkASP";
import YugASP from "@/components/Asp/YugASP";

export default {
    name: "home",
    data: () => ({
    isLoadedUnits: false,
    isLoadedUah: false,
  }),


    methods: {
        loadedUnits(value) {
        this.isLoadedUnits = true;
        },
        loadedUah(value) {
        this.isLoadedUah = true;
        },
    },

    components: {
        GfkASP,
        YugASP,
    },

}
</script>



<style lang="scss" scoped >

    .title {
        font-size: 1.5rem;
        text-align: center;
    }
    .charts {
        width: 100%;
        display: flex;
        justify-content: space-around;
        }

    .asps {
        padding-top: 30px;
    }

    .asp {
        width: 50%;
    }

</style>








