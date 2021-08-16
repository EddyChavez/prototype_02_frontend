<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row justify="center">
      <div class="text-center">
        <v-chip-group active-class="primary--text">
          <v-chip @click="filter('EN PROCESO')">
            En Proceso
          </v-chip>
          <v-chip @click="filter('CONCLUIDO')">
            Concluidos
          </v-chip>
        </v-chip-group>
      </div>
    </v-row>

    <v-row v-if="list_events">
      <v-col
        cols="12"
        sm="6"
        lg="4"
        v-for="event in list_events"
        :key="event.id"
      >
        <v-sheet elevation="10">
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
              <v-chip
                class="ma-2"
                :color="event.status == 'EN PROCESO' ? 'orange' : 'red'"
                label
                text-color="white"
                x-small
              >
                {{ event.status }}
              </v-chip>

              <div class="my-4 text-subtitle-1">
                <p class="font-weight-black">
                  Creado por: {{ event.create_by.get_full_name }}
                </p>
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
              <v-row justify="center">
                <v-col cols="12" md="6">
                  <div class="text-subtitle-2">
                    <v-icon color="grey darken-2"> mdi-calendar </v-icon>
                    {{ event.date_start }}
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="text-subtitle-2 ">
                    <v-icon color="grey darken-2"> mdi-clock </v-icon>
                    {{ event.hour_start }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <div class="text-center">
          <br />
          <br />
          <h2>No hay Eventos Disponibles!</h2>
          <br />
          <br />
        </div>
      </v-col>
    </v-row>

    <br />
    <br />

    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="numPages"
        :total-visible="totalVisible"
        @input="changePage"
        circle
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import moment from "moment";
import apiEvents from "@/api/events/";

export default {
  name: "ListEvents",
  data() {
    return {
      list_events: [],
      loading: false,
      page: 1,
      numPages: 1,
      totalVisible: 7
    };
  },
  mounted: function() {
    this.filter("EN PROCESO");
    this.reserve();
  },
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    changePage() {
      apiEvents.list("EN PROCESO", this.page).then(response => {
        this.list_events = response.data.results;
        this.numPages = parseInt(response.data.count / 2 + 1);
      });
    },
    filter: function(status) {
      apiEvents.list(status, this.page).then(response => {
        this.list_events = response.data.results;
        this.numPages = parseInt(response.data.count / 2 + 1);
      });
    },
    showDetailPanel: function(idEvent) {
      this.$router.push({
        name: "Detalle del Evento",
        params: { id: idEvent }
      });
    }
  }
};
</script>

<style></style>
