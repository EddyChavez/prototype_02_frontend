<template>
  <base-material-card>
    <template v-slot:heading>
      <div class="display-2 font-weight-light">
        {{ event.name }}
      </div>
    </template>

    <v-container
      class="py-0"
      v-for="detail in event.detail_event"
      :key="detail.id"
    >
      <br />
      <v-row>
        <v-col cols="12" md="12">
          <div v-html="detail.content"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-img
            :src="detail.image1"
            height="125"
            class="grey darken-4"
          ></v-img>
        </v-col>

        <v-col cols="12" md="6">
          <v-img
            :src="detail.image2"
            height="125"
            contain
            class="grey darken-4"
          ></v-img>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn class="ma-2" color="blue" :href="detail.file" download rounded>
          Descargar Archivo
        </v-btn>
      </v-row>
    </v-container>
  </base-material-card>
</template>

<script>
import apiEvents from "@/api/events/";

export default {
  name: "DetailEvent",
  data() {
    return {
      event: []
    };
  },
  computed: {
    idEvent() {
      return this.$route.params.id;
    }
  },
  mounted: function() {
    this.loadEvent();
  },
  methods: {
    loadEvent: function() {
      apiEvents.retrieve(this.idEvent).then(response => {
        this.event = response.data;
      });
    }
  }
};
</script>

<style></style>
