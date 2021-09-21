<template>
  <v-app>
    <br />
    <br />
    <br />
    <br />
    
    <v-carousel>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
      </v-carousel-item>
    </v-carousel>

    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <dashboard-core-settings />
  </v-app>
</template>

<script>
export default {
  name: "DashboardIndex",

  components: {
    DashboardCoreAppBar: () => import("./components/core/AppBar"),
    DashboardCoreDrawer: () => import("./components/core/Drawer"),
    DashboardCoreSettings: () => import("./components/core/Settings"),
    DashboardCoreView: () => import("./components/core/View"),
  },

  data: () => ({
    expandOnHover: false,
    items: [
      {
        src: "https://bevents-spain.com/wp-content/uploads/2019/09/Brunchbuffet-1080x675.jpg"
      },
      {
        src: "https://cdn.easy-rez.com/production/hotels/b76a095b5f4e87435421e8340813ab4f/public/.crops/salones/tmb_banquete.jpg_1920x1080_0-0.jpg",
      },
      {
        src: "https://saulemendez.com/wp-content/uploads/2018/03/cayala-eventos-1920x1080.jpg",
      },
      {
        src: "https://s.ineventos.com/mx/2021/08/128043/jardin-eventos-coyoacan-310816-i-1080w.jpg",
      },
    ],
  }),
};
</script>
