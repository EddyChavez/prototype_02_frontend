<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" sm="6" lg="4" v-for="event in list_data" :key="event.id">
        <v-card :loading="loading">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img max-height="150" height="250" :src="event.image"></v-img>

          <v-card-title>{{ event.name }}</v-card-title>

          <v-card-text>
            <v-chip class="ma-2" color="green" label text-color="white" x-small>
              {{ event.status }}
            </v-chip>

            <div class="my-4 text-subtitle-1">
              Creado por: {{ event.create_by }}
            </div>

            <div>{{ event.description }}</div>
          </v-card-text>

          <div class="text-center">
            <v-btn
              rounded
              color="primary"
              dark
              @click="showDetailPanel(event.id)"
            >
              Ver
            </v-btn>
          </div>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <v-icon color="grey darken-2">
              mdi-clock
            </v-icon>

            <span class="body-2 grey--text text-right font-weight-light">
              {{ formatDate(event.date_start) }}</span
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiEvents from "@/api/events/";
import moment from "moment";
//import DetailEvent from "@/components/events/DetailEvent.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ListEvents",
  components: {
    //DetailEvent
  },
  data() {
    return {
      list_data: [],
      loading: false,
      selection: 1,
      dialog: false
    };
  },
  computed: {},
  mounted: function() {
    this.loadEvents();
    this.reserve();
  },
  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    loadEvents: function() {
      apiEvents.list().then(response => {
        this.list_data = response.data;
        console.log(response.data);
      });
    },
    formatDate: function(date) {
      return moment(date).fromNow();
    },
    showDetailPanel: function(idEvent) {
      //this.$router.push("events/detail");

      this.$router.push({
        name: "Detalle-Evento",
        params: { id: idEvent }
      });
      //this.$store.commit("SET_DETAIL_EVENT", true);
    },
    hideDetailPanel: function() {
      console.log(this.showDetail);
      this.$store.commit("SET_DETAIL_EVENT", false);
    }
  }
};
</script>

<style></style>
