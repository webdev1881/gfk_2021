<template>
  <div id="app">

    <div v-show="!log" class="pass">
      <input v-model="pass" type="password" placeholder="пароль" autofocus class="pass_inp">
    </div>

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


export default {
  name: "app",
  data: () => ({
    pass: '',
    log: false
  }),
  watch: {
    pass(val) {
      if( val === '0099' ) { this.log = true }
    }
  },
  components: {
    Sidebar,
    Home,  
  }
}
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
  height: 100vh;
}
.sidebar {
}
.home {
}
.pass {
  display: flex;
  flex-direction: column;
  padding: 200px;
  position: absolute;
  background-color: #294750;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
}
.pass_inp {
  caret-color: white;
  // width: 50%!important;
  // margin: 10px auto!important;
}
</style>
