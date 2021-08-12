<template>
  <v-card>
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
        <p class="font-weight-black">
          Creado por: {{ event.create_by.get_full_name }}
        </p>
      </div>

      <div>{{ event.description }}</div>
    </v-card-text>

    <!-- <v-card-text>
      <div class="text-center flex">
        <v-btn small rounded color="blue" dark @click="addParticipants()">
          Agregar Participantes
        </v-btn>
      </div>
    </v-card-text> -->

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
</template>

<script>
import moment from "moment";

import apiEvents from "@/api/events/";
import Participants from "@/components/events/Participants.vue";

export default {
  name: "CardEvent",
  data() {
    return {
      loading: false,
      event: []
    };
  },
  computed: {
    idEvent() {
      return this.$route.params.id;
    }
  },
  mounted: function() {
    this.RetrieveEvent();
  },
  methods: {
    RetrieveEvent() {
      apiEvents.retrieve(this.idEvent).then(response => {
        this.event = response.data;
      });
    }
  }
};
</script>

<style></style>
