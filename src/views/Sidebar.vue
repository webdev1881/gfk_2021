<template>
  <div ref="sidebar" :class="{toggle: isActive, sidebar: !isActive}">
    <img src="gfk_logo.png" alt />

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
      { title: "Главная", icon: "home", url: "/", exact: true },
      { title: "Кластеры", icon: "apps", url: "/clasters" },
      { title: "ASP", icon: "assessment", url: "/asp" },
      { title: "Brands", icon: "tv", url: "/brands" },
      { title: "settings", icon: "settings", url: "/test" },
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
  width: 110px;
  display: block;
  margin: 5px;
}

.a-togg {
  color: black;
  .lines {
    font-size: 30px;
    margin-left: 7px;
  }
}

.toggle {
  width: 47px;
  padding-right: 0;
  z-index: 1;
  min-width: 50px; // ______________________________
  margin-left: 3px;
  box-shadow: 2px 0px 0px gray;
  transition: all 0.25s;
  overflow: hidden;
}

.sidebar {
  z-index: 1;
  width: 140px;
  min-width: 115px; // ______________________________
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
.item:last-child > a {
  color: #9b9ea5;
}
</style>