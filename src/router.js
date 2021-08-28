import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "Register",
      path: "/register",
      component: () => import("@/views/dashboard/users/RegisterPage")
    },
    {
      name: "Login",
      path: "/login",
      component: () => import("@/views/dashboard/users/LoginPage")
    },
    {
      name: "Reset",
      path: "/reset-password",
      component: () => import("@/views/dashboard/users/ResetPasswordPage")
    },
    {
      name: "Confirm",
      path: "/reset-password/confirm/:token",
      component: () => import("@/views/dashboard/users/ResetPasswordConfirm")
    },
    {
      path: "/",
      component: () => import("@/views/dashboard/Index"),
      children: [
        {
          name: "Eventos",
          path: "pages/events",
          component: () => import("@/views/dashboard/pages/Events")
        },
        // Detail Event
        {
          name: "Detalle del Evento",
          path: "pages/events/:id/detail/",
          component: () => import("@/views/dashboard/pages/ShowEvent")
        },
        // Order by Event
        {
          name: "Pedido del Evento",
          path: "pages/events/:id/orders/",
          component: () => import("@/views/dashboard/pages/Order")
        },

        {
          name: "Mis Eventos",
          path: "pages/my-events",
          component: () => import("@/views/dashboard/pages/MyEvents")
        },
        {
          name: "Administrar Evento",
          path: "pages/my-events/:id/admin/",
          component: () => import("@/views/dashboard/pages/AdminEvent")
        },
        {
          name: "ckeditor",
          path: "ckeditor",
          component: () => import("@/components/events/Editor")
        },
        //Eventos
        {
          name: "Home",
          path: "",
          component: () => import("@/views/dashboard/Home")
        },
        //Dashboard
        // {
        //   name: "Dashboard",
        //   path: "",
        //   component: () => import("@/views/dashboard/Dashboard")
        // },

        // Pages

        {
          name: "Perfil",
          path: "pages/user",
          component: () => import("@/views/dashboard/pages/UserProfile")
        },
        {
          name: "Administrar Grupos",
          path: "users/groups",
          component: () => import("@/views/dashboard/users/AdminGroups")
        },
        // {
        //   name: "Notifications",
        //   path: "components/notifications",
        //   component: () => import("@/views/dashboard/component/Notifications")
        // },
        // {
        //   name: "Icons",
        //   path: "components/icons",
        //   component: () => import("@/views/dashboard/component/Icons")
        // },
        // {
        //   name: "Typography",
        //   path: "components/typography",
        //   component: () => import("@/views/dashboard/component/Typography")
        // },
        // Tables
        // {
        //   name: "Regular Tables",
        //   path: "tables/regular-tables",
        //   component: () => import("@/views/dashboard/tables/RegularTables")
        // },
        // Maps
        // {
        //   name: "Google Maps",
        //   path: "maps/google-maps",
        //   component: () => import("@/views/dashboard/maps/GoogleMaps")
        // },
        // Mis Eventos

        // Mis Eventos
        // {
        //   name: "Mis Eventos 2",
        //   path: "components/my-events-2",
        //   component: () => import("@/views/dashboard/pages/MyEvents2")
        // },
        // Eventos

        // Upgrade
        {
          name: "Contacto",
          path: "contact",
          component: () => import("@/views/dashboard/contact/Contact")
        },
        {
          name: "Donate",
          path: "donate",
          component: () => import("@/views/dashboard/contact/Donate")
        }
      ]
    }
  ]
});
