<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <base-material-card color="blue" :loading="isUpdating">
        <template v-slot:heading>
          <div class="display-2 font-weight-light">
            Crea grupos para gestionar mas rapidamente tu evento
          </div>
        </template>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="model"
                  :items="items"
                  :filter="customFilter"
                  :search-input.sync="search2"
                  hide-details
                  hide-selected
                  item-text="email"
                  label="Buscar participantes"
                  solo
                  prepend-icon="mdi-account-circle-outline"
                  @change="reset"
                >
                  <template v-slot:item="{ item }">
                    <v-list-item-avatar>
                      <v-img
                        v-if="item.avatar"
                        :alt="`${item.get_full_name} avatar`"
                        :src="item.avatar"
                      ></v-img>
                      <v-avatar color="indigo" v-else>
                        <span class="white--text text-h5">{{
                          item.get_initials
                        }}</span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.get_full_name"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="item.email"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" md="5">
                <v-text-field
                  label="Nombre"
                  class="purple-input"
                  prepend-icon="mdi-account-group"
                  v-model="group.name"
                  :rules="GroupRules"
                />
              </v-col>

              <v-col cols="12" md="7">
                <v-text-field
                  label="Descripcion"
                  class=" purple-input"
                  prepend-icon="mdi-notebook-outline"
                  v-model="group.description"
                ></v-text-field>
              </v-col>

              <v-row justify="center">
                <v-avatar v-if="CurrentAvatar" size="60">
                  <img alt="user" :src="CurrentAvatar" />
                </v-avatar>
                <v-avatar v-else size="60">
                  <img alt="user" src="@/assets/groups.jpg" />
                </v-avatar>
                <v-col cols="12" md="5">
                  <v-file-input
                    accept="image/*"
                    label="Logo"
                    v-model="newAvatarGroup"
                    @change="onFileSelected()"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-row>
            <v-row justify="center">
              <v-col cols="12">
                <v-card color="#FAFAFA" dense>
                  <v-row justify="center">
                    <v-col cols="12" md="8" class="text-center">
                      <h4>
                        <strong
                          >Participantes ({{ count_participants }})</strong
                        >
                      </h4>
                    </v-col>
                    <v-col cols="12" md="8" class="text-center">
                      <v-chip
                        v-for="user in members"
                        :key="user.email"
                        close
                        @click:close="remove(user)"
                      >
                        <v-avatar left v-if="user.avatar">
                          <v-img :src="user.avatar"></v-img>
                        </v-avatar>
                        <v-avatar color="indigo" left v-else>
                          <span class="white--text text-h5">{{
                            user.get_initials
                          }}</span>
                        </v-avatar>
                        <span v-if="user.get_initials">{{
                          user.get_full_name
                        }}</span>
                        <span v-else>{{ user.email }}</span>
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" class="text-center">
                <!-- <v-text-field
                  label="Buscar"
                  class=" purple-input"
                  prepend-icon="mdi-account-circle-outline"
                  v-model="kword"
                >
                </v-text-field>

                <v-list-item v-for="user in users" :key="user.id">
                  <v-list-item-avatar>
                    <v-img
                      v-if="user.avatar"
                      :alt="`${user.get_full_name} avatar`"
                      :src="user.avatar"
                    ></v-img>
                    <v-avatar color="red" v-else>
                      <span class="white--text text-h5">{{
                        user.get_initials
                      }}</span>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content @click="addMembers(user)">
                    <v-list-item-title
                      v-text="user.get_full_name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="user.email"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item> -->

                <!-- <v-chip
                  v-for="user in members"
                  :key="user.email"
                  close
                  @click:close="remove(user)"
                >
                  <v-avatar left v-if="user.avatar">
                    <v-img :src="user.avatar"></v-img>
                  </v-avatar>
                  <v-avatar color="red" left v-else>
                    <span class="white--text text-h5">{{
                      user.get_initials
                    }}</span>
                  </v-avatar>
                  {{ user.get_full_name }}
                </v-chip> -->

                <!-- <v-list dense>
                  <v-list-item v-for="user in users" :key="user.id">
                    <v-list-item-avatar>
                      <v-img
                        v-if="user.avatar"
                        :alt="`${user.get_full_name} avatar`"
                        :src="user.avatar"
                      ></v-img>
                      <v-avatar color="red" v-else>
                        <span class="white--text text-h5">{{
                          user.get_initials
                        }}</span>
                      </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content @click="addMembers(user)">
                      <v-list-item-title
                        v-text="user.get_full_name"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="user.email"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list> -->
              </v-col>
            </v-row>
          </v-form>

          <v-row justify="center">
            <v-btn
              :loading="isUpdating"
              rounded
              color="blue"
              dark
              @click="addGroup()"
              v-if="showAdd"
            >
              <v-icon>
                mdi-plus
              </v-icon>
              Agregar
            </v-btn>
            <v-btn
              v-if="!showAdd"
              :loading="isUpdating"
              rounded
              color="blue"
              dark
              @click="saveGroup(group.id)"
            >
              <v-icon>
                mdi-content-save-outline
              </v-icon>
              Guardar
            </v-btn>
            <v-btn
              v-if="!showAdd"
              class="mr-2"
              outlined
              color="red"
              fab
              small
              @click="cancel()"
            >
              <v-icon small>
                mdi-close
              </v-icon>
            </v-btn>
          </v-row>
        </v-card-text>

        <v-card-text class="text-center">
          <v-list dense>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item v-for="group in groups" :key="group.id">
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
                  <v-list-item-subtitle v-text="group.description">
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    ({{ group.sum_members }} Participantes)
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon @click="EditGroup(group)">
                    mdi-pencil
                  </v-icon>
                  <!-- <v-icon small @click="deleteItem(group.id)">
                    mdi-close
                  </v-icon> -->
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <!-- 
        <v-card>
          <v-card-title>
            Grupos
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="groups" :search="search">
            <template v-slot:item.avatar="{ item }">
              <v-avatar size="56">
                <img alt="user" :src="item.avatar" />
              </v-avatar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="EditGroup(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item.id)">
                mdi-close
              </v-icon>
            </template>
            <template v-slot:top>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Seguro que deseas borrar este Grupo?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog> </template
          ></v-data-table>
        </v-card> -->
      </base-material-card>
    </v-col>
    <v-col cols="12" md="4">
      <my-groups />
    </v-col>

    <alerts />
  </v-row>
</template>

<script>
import apiGroups from "@/api/groups/";
import MyGroups from "@/components/users/MyGroups.vue";
import Alerts from "@/components/base/Alerts.vue";
import Participants from "@/components/events/Participants.vue";

export default {
  name: "Groups",
  components: {
    MyGroups,
    Alerts
  },
  data() {
    return {
      valid: true,
      loading: false,
      dialogDelete: false,
      count_participants: 0,
      selectedItem: -1,
      items: [],
      model: null,
      search2: null,
      groups: [],
      kword: "",
      members: [],
      users: [],
      selectedItem: 1,
      search: "",
      isUpdating: false,
      title: "The summer breeze",
      headers: [
        {
          text: "Grupo",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Logo", value: "avatar", sortable: false },
        { text: "Descripcion", value: "description" },
        { text: "Participantes", value: "sum_members" },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      GroupRules: [v => !!v || "Este campo es requerido"],
      showAdd: true,
      group: {
        id: 0,
        name: "",
        description: "",
        user: 0,
        avatar: null,
        members: []
      },
      newAvatarGroup: null,
      CurrentAvatar: null,
      idGroup: 0
    };
  },
  mounted() {
    this.RetrieveGroups();
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser.id;
    },
    parsedDirection() {
      return this.direction.split(" ");
    }
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 2000);
      }
    },
    kword: function(val) {
      this.SearchUsers(val);
    },
    search2(val) {
      if (this.items.length > 0) return;

      apiGroups.getUsers().then(response => {
        this.items = response.data;
      });
    }
  },

  methods: {
    customFilter(item, queryText, itemText) {
      const textOne = item.email.toLowerCase();
      const textTwo = item.get_full_name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    reset() {
      let index = this.items.findIndex(item => item.email === this.model);
      this.addMembers(this.items[index]);

      this.$nextTick(() => {
        this.model = null;
      });
    },
    onFileSelected() {
      return this.newAvatarGroup;
    },
    SearchUsers(kword) {
      apiGroups.members(kword).then(response => {
        this.users = response.data;
      });
    },
    addMembers(user) {
      if (this.members.indexOf(user) == -1) {
        this.members.push(user);
        this.group.members.push(user.id);
        this.count_participants = this.group.members.length;
      }
    },
    RetrieveGroups() {
      apiGroups.byUser(this.getUser).then(response => {
        this.groups = response.data;
      });
    },
    remove(item) {
      const index = this.members.indexOf(item);
      if (index >= 0) {
        this.members.splice(index, 1);
        this.group.members.splice(index, 1);

        this.count_participants = this.group.members.length;
      }
    },
    addGroup() {
      if (this.$refs.form.validate()) {
        this.isUpdating = true;

        let notification = {
          snackbar: true,
          direction: "top center",
          msg: "Grupo Creado Exitosamente!",
          color: "success"
        };
        let formData = new FormData();

        formData.append("name", this.group.name);
        formData.append("description", this.group.description);
        formData.append("user", this.getUser);

        if (this.newAvatarGroup !== null) {
          formData.append("avatar", this.onFileSelected());
        }

        this.group.members.forEach(item => {
          formData.append("members", item);
        });

        apiGroups
          .addGroup(formData)
          .then(response => {
            this.RetrieveGroups();

            this.$store.dispatch("showNotification", notification);
          })
          .catch(error => {
            console.log(error);
          });

        this.clearData();

        this.$refs.form.resetValidation();
      }
    },
    clearData() {
      this.group.id = 0;
      this.group.name = "";
      this.group.description = "";
      this.CurrentAvatar = null;
      this.group.members = [];
      this.members = [];
      this.newAvatarGroup = null;
      this.count_participants = 0;
    },
    EditGroup(item) {
      this.count_participants = 0;
      this.showAdd = false;

      this.group.id = item.id;
      this.group.name = item.name;
      this.group.description = item.description;
      this.CurrentAvatar = item.avatar;

      apiGroups
        .getMembers(item.id)
        .then(response => {
          this.members = response.data[0].members;

          this.members.forEach(element => {
            this.group.members.push(element.id);
          });

          this.count_participants = this.group.members.length;
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancel() {
      this.showAdd = true;
      this.clearData();
      this.$refs.form.resetValidation();
    },
    saveGroup(idGroup) {
      if (this.$refs.form.validate()) {
        this.isUpdating = true;

        let notification = {
          snackbar: true,
          direction: "top center",
          msg: "Grupo Actualizado Exitosamente!",
          color: "success"
        };
        let formData = new FormData();

        formData.append("name", this.group.name);
        formData.append("description", this.group.description);
        formData.append("user", this.getUser);

        if (this.newAvatarGroup !== null) {
          formData.append("avatar", this.onFileSelected());
        }

        this.group.members.forEach(item => {
          formData.append("members", item);
        });

        apiGroups
          .editGroup(idGroup, formData)
          .then(response => {
            this.RetrieveGroups();

            this.$store.dispatch("showNotification", notification);
          })
          .catch(error => {
            //console.log(error);

            let error_response = {
              snackbar: true,
              direction: "top center",
              msg: error,
              color: "error"
            };

            this.$store.dispatch("showNotification", error_response);
          });

        this.$refs.form.resetValidation();
        this.clearData();
        this.showAdd = true;
      }
    },

    closeDelete() {
      this.dialogDelete = false;
      this.idGroup = 0;
    },
    deleteItem(idGroup) {
      this.dialogDelete = true;
      this.idGroup = idGroup;
    },

    deleteItemConfirm() {
      if (this.idGroup !== 0) {
        let notification = {
          snackbar: true,
          direction: "top center",
          msg: "Grupo Eliminado Exitosamente!",
          color: "success"
        };

        apiGroups
          .removeGroup(this.idGroup)
          .then(response => {
            this.RetrieveGroups();

            this.$store.dispatch("showNotification", notification);
          })
          .catch(error => {
            console.log(error);
          });
      }

      this.closeDelete();
    }
  }
};
</script>

<style></style>
