<template>
  <v-row justify="center">
    <v-dialog :value="dialog" @input="$emit('dialog')" width="600px">
      <!-- <template v-slot:activator="{ on, attrs }"> @click:outside="close()"
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title>
          <span class="text-h5">Grupo: {{ name }}</span>
        </v-card-title>
        <v-card-text>
          {{ description }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="closeDialog()">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import apiGroups from "@/api/groups";
import Groups from "@/components/users/Groups.vue";

export default {
  name: "DetailGroup",
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    id: {
      type: Number,
      default: 0
    },
    user: {
      type: Number,
      default: 0
    },
    sum_members: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    // showDialog() {
    //   return this.dialog;
    // }
  },
  methods: {
    closeDialog() {
      this.$emit("dialog");
    }
  }
};
</script>
