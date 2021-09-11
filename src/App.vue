<template>
  <div id="app">


    <div class="layout">

      <Sidebar />
      <div class="wrapper">
        <router-view />
      </div>
      

    </div>

  </div>
</template>



<script>
import Home from "@/views/Home";
import Sidebar from "@/views/Sidebar";


console.log(  );

export default {
  name: "app",
  components: {
    Sidebar,
    Home,  
  }
};
</script>

<style lang="scss">
// @import "~materialize-css/dist/css/materialize.min.css";

* {
  font-size: 14px;
}


#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.wrapper {
  width: 100%;
  padding: 10px;
}

.layout {
  display: flex;
  height: 900px;
}
.sidebar {
}
.home {
}
</style>
