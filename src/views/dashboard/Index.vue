<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <alerts />

    <dashboard-core-view />

    <dashboard-core-settings />
  </v-app>
</template>

<script>
import apiUsers from "@/api/users";

export default {
  name: "Index",
  components: {
    DashboardCoreAppBar: () => import("./components/core/AppBar"),
    DashboardCoreDrawer: () => import("./components/core/Drawer"),
    DashboardCoreSettings: () => import("./components/core/Settings"),
    DashboardCoreView: () => import("./components/core/View"),
    Alerts: () => import("@/components/base/Alerts")
  },
  data: () => ({
    expandOnHover: false
  })
};
</script>
