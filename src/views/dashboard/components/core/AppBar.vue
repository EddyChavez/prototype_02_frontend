<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <v-text-field
      :label="$t('Buscar Evento')"
      color="secondary"
      hide-details
      style="max-width: 500px;"
    >
      <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
        <v-btn class="mt-n2" elevation="1" fab small>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div class="mx-3" />

    <!-- <v-btn class="ml-2" min-width="0" text to="/">
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn> -->

    <!-- <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
          <v-badge color="red" overlap bordered>
            <template v-slot:badge>
              <span>5</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list :tile="false" nav>
        <div>
          <app-bar-item v-for="(n, i) in notifications" :key="`item-${i}`">
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu> -->

    <div v-if="getUser" class="subtitle-1">{{ getUser.email }}</div>

    <v-btn class="ml-2" min-width="0" text to="/pages/user">
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn class="ml-2" min-width="0" text @click="closeSession()">
      <v-icon>mdi-power</v-icon>

      Cerrar Sesion
    </v-btn>
  </v-app-bar>
</template>

<script>
import apiUsers from "@/api/users";
import { getTokenApi, deleteTokenApi } from "@/api/token";
//import { userMixin } from "@/mixins/users";

// Components
import { VHover, VListItem } from "vuetify/lib";

// Utilities
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardCoreAppBar",
  //mixins: [userMixin],
  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text secondary elevation-12": hover
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs
                  }
                },
                this.$slots.default
              );
            }
          }
        });
      }
    }
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    notifications: [
      "Mike John Responded to your email",
      "You have 5 new tasks",
      "You're now friends with Andrew",
      "Another Notification",
      "Another one"
    ],
    getUser: []
  }),
  computed: {
    //...mapGetters(["getUser"]),
    ...mapState(["drawer"])
  },
  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER"
    }),
    closeSession() {
      // deleteTokenApi();
      // sessionStorage.clear();
      // this.$router.push("/login");
      this.$store.dispatch("expireSession", true);
    }
  },
  beforeMount() {
    const user = this.$store.getters.getUser;
    if (user === null) {
      apiUsers
        .retrieve()
        .then(response => {
          this.$store.dispatch("retrieveUser", response.data);
          this.getUser = response.data;
        })
        .catch(error => {
          this.closeSession();
        });
    } else {
      this.getUser = user;
    }
  }
};
</script>

<style scoped>
@media print {
  #app-bar {
    display: none !important;
  }
}
</style>
