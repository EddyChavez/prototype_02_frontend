<template>
  <v-container fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <participants v-if="showUsers" />
        <edit-event v-else />
      </v-col>
      <v-col cols="12" md="4">
        <card-event />

        <v-card-text>
          <div class="text-center flex">
            <v-btn rounded color="blue" dark @click="addParticipants()">
              {{ button_text }}
            </v-btn>
          </div>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardEvent from "@/components/events/CardEvent.vue";
import EditEvent from "@/components/events/EditEvent.vue";
import Participants from "@/components/events/Participants.vue";

export default {
  name: "AdminEvent",
  components: {
    CardEvent,
    EditEvent,
    Participants
  },
  data() {
    return {
      showUsers: false,
      button_text: "Agregar Participantes"
    };
  },
  methods: {
    addParticipants() {
      this.showUsers = !this.showUsers;

      this.button_text = this.showUsers
        ? "Editar Detalle"
        : "Agregar Participantes";
    }
  }
};
</script>

<style></style>
