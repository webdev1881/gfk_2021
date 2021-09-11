<template>
  <div ref="sidebar" :class="{toggle: isActive}" class="sidebar">
    <img src="er.svg" alt />

    <a class="a-togg" href="#" @click.prevent="toggleNav">
      <i class="lines material-icons black-text">dehaze</i>
    </a>

    <ul class="ul-side">
      <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        class="item"
        active-class="active"
        :to="link.url"
        :exact="link.exact"
      >
        <a class="title">
          <i class="material-icons">{{link.icon}}</i>
          {{link.title}}
        </a>
      </router-link>
    </ul>
  </div>
</template>




<script>
export default {
  props: ["value"],
  data: () => ({
    links: [
      { title: "Главная", icon: "cloud", url: "/", exact: true },
      { title: "Кластеры", icon: "cloud", url: "/clasters" },
      { title: "ASP", icon: "cloud", url: "/asp" },
      { title: "Brands", icon: "cloud", url: "/brands" },
      { title: "TeST", icon: "cloud", url: "/test" },
    ],
    isActive: false
  }),
  methods: {
    toggleNav() {
      this.isActive = !this.isActive;
    }
  }
};
</script>



<style lang="scss" >
img {
  width: 133px;
  display: block;
  margin: 5px 0 5px 0;
}
.toggle {
  width: 47px !important;
  padding-right: 0 !important;
}
.a-togg {
  color: black;
  .lines {
    font-size: 30px;
    margin-left: 7px;
  }
}

.sidebar {
  z-index: 1;
  width: 152px; // ______________________________
  margin-left: 3px;
  box-shadow: 2px 0px 0px gray;
  transition: all 0.25s;
  overflow: hidden;
}

.ul-side {
  padding: 0;
}

.item {
  list-style-type: none;
  transition: all 0.2s;
  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
  .title {
    display: flex;
    align-items: center;
    white-space: nowrap;
    color: #094a69;
    text-decoration: none;
    padding: 0 8px;
    height: 45px;
    line-height: 1px;
    i {
      margin-right: 15px;
    }
  }
}
</style>