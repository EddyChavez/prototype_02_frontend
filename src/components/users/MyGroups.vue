<template>
  <base-material-card>
    <template v-slot:heading>
      <div class="display-2 font-weight-light">
        Grupos a los que perteneces
      </div>
    </template>
    <v-card-text class="text-center">
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="group in list_groups" :key="group.id">
            <v-list-item-avatar>
              <v-avatar left v-if="group.avatar">
                <v-img :src="group.avatar"></v-img>
              </v-avatar>
              <v-avatar left v-else>
                <v-img src="@/assets/groups.jpg"></v-img>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="group.name"></v-list-item-title>
              <v-list-item-subtitle>
                ({{ group.sum_members }} Participantes)
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon @click="showDetail(group)">
                mdi-eye
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>

    <v-dialog v-model="dialog" @click:outside="dialog = false" width="550px">
      <v-card>
        <v-container>
          <v-card-title>
            <v-row>
              <v-col cols="12" md="6">
                <v-avatar left v-if="detail.avatar">
                  <v-img :src="detail.avatar"></v-img>
                </v-avatar>
                <v-avatar left v-else>
                  <v-img src="@/assets/groups.jpg"></v-img>
                </v-avatar>
                <span class="text-h5">
                  <strong>Grupo: </strong>{{ detail.name }}</span
                >
              </v-col>

              <v-col v-if="detail.user" cols="12" md="6">
                <v-chip class="ma-2">
                  Creado por: {{ detail.user.get_full_name }}
                </v-chip>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-col cols="12" class="text-center">
              <strong>Descripción: </strong>{{ detail.description }}
            </v-col>
            <v-col cols="12" class="text-center">
              <h4>
                <strong>Participantes ({{ detail.sum_members }})</strong>
              </h4>
            </v-col>
          </v-card-text>
          <v-card-text class="text-center">
            <v-virtual-scroll
              :items="list_members"
              height="200"
              item-height="60"
            >
              <template v-slot:default="{ item }">
                <v-list dense>
                  <v-list-item :key="item.id">
                    <v-list-item-avatar>
                      <v-avatar left v-if="item.avatar">
                        <v-img :src="item.avatar"></v-img>
                      </v-avatar>
                      <v-avatar color="indigo" v-else>
                        <span
                          v-if="item.get_initials"
                          class="white--text text-h5"
                          >{{ item.get_initials }}</span
                        >
                        <v-img v-else src="@/assets/user_group.png"></v-img>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.get_full_name"
                      ></v-list-item-title>
                      <v-list-item-subtitle v-text="item.email">
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </template>
            </v-virtual-scroll>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </base-material-card>
</template>

<script>
import apiGroups from "@/api/groups";

export default {
  name: "MyGroups",
  data() {
    return {
      loading: false,
      dialog: false,
      selectedItem: -1,
      list_groups: [],
      detail: [],
      list_members: []
    };
  },
  beforeMount() {
    this.loadGroups();
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser.id;
    }
  },
  methods: {
    showDetail(group) {
      this.dialog = true;
      this.detail = group;

      apiGroups
        .getMembers(group.id)
        .then(response => {
          this.list_members = response.data[0].members;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadGroups() {
      apiGroups.myGroups(this.getUser).then(response => {
        this.list_groups = response.data;
      });
    }
  }
};
</script>
