<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col v-if="!showCar" cols="12" md="8">
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
            <v-btn
              class="ma-2"
              color="blue"
              :href="detail.file"
              download
              rounded
            >
              Descargar Archivo
            </v-btn>
          </v-container>
        </base-material-card>
      </v-col>
      <v-col v-if="showCar" cols="12" md="8">
        <base-material-card color="warning" class="px-5 py-3">
          <template v-slot:heading>
            <v-row>
              <v-col cols="12" md="4">
                <div class="display-2 font-weight-bold">
                  Mi Pedido
                </div>
                <!-- <div class="subtitle-1 font-weight-light">
                  (Agrega tu pedido)
                </div> -->
              </v-col>
              <v-col cols="12" md="4">
                <div class="display-2 float-md-left font-weight-bold">
                  Cantidad: {{ cart.quantity }}
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="display-2 float-md-left font-weight-bold">
                  Total: $ {{ cart.amount }}
                </div>
              </v-col>
            </v-row>
          </template>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field
                    label="Producto"
                    class="purple-input"
                    prepend-icon="mdi-cart"
                    v-model="order.product"
                    :rules="CartRules"
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Descripcion"
                    class=" purple-input"
                    prepend-icon="mdi-notebook-outline"
                    v-model="order.description"
                    :rules="CartRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                    label="Precio"
                    type="number"
                    min="1"
                    value="00.00"
                    prepend-icon="mdi-currency-usd"
                    class="purple-input"
                    v-model="order.price"
                    :rules="CartRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="2">
                  <v-text-field
                    label="Cantidad"
                    type="number"
                    min="1"
                    value="1"
                    class="purple-input"
                    v-model="order.quantity"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>

            <v-row justify="center">
              <v-btn
                v-if="showAdd"
                rounded
                color="warning"
                dark
                @click="addOrder()"
              >
                <v-icon>
                  mdi-cart
                </v-icon>
                Agregar
              </v-btn>
              <v-btn
                v-if="!showAdd"
                rounded
                color="warning"
                dark
                @click="saveOrder(order.id)"
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
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Producto
                    </th>
                    <th class="text-left">
                      Descripcion
                    </th>
                    <th class="text-left">
                      Precio
                    </th>
                    <th class="text-left">
                      Cantidad
                    </th>
                    <th class="text-left">
                      Subtotal
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cart.items" :key="item.name">
                    <td>{{ item.product }}</td>
                    <td>{{ item.description }}</td>
                    <td>$ {{ item.price }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>
                      $ {{ subTotal(item.quantity, item.price).toFixed(2) }}
                    </td>
                    <td>
                      <v-icon small @click="EditOrder(item)">
                        mdi-pencil
                      </v-icon>
                      <v-icon small @click="deleteItem(item.id)">
                        mdi-close
                      </v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-row justify="center">
            <v-btn rounded color="primary" dark @click="showOrder(event.id)">
              Publicar
            </v-btn>
          </v-row>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="4">
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

          <div class="text-center flex">
            <v-btn rounded color="primary" dark @click="activeCar()">
              Participar
            </v-btn>
            <v-btn rounded color="primary" dark @click="showOrder(event.id)">
              Pedidos
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
import apiOrders from "@/api/orders/";

import moment from "moment";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "DetailEvents",
  component: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      valid: true,
      event: [],
      cart: [],
      order: {
        order: 0,
        product: "",
        description: "",
        price: 0.0,
        quantity: 1
      },
      CartRules: [v => !!v || "Este campo es requerido"],
      loading: false,
      selection: 1,
      idEvent: 0,
      showCar: false,
      showAdd: true,
      editor: ClassicEditor,
      editorData:
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>"
    };
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser.id;
    },
    getIdEvent() {
      return this.$route.params.id;
    }
  },
  mounted: function() {
    this.loadEvents();
    this.getOrder();
    this.reserve();
  },
  methods: {
    activeCar() {
      this.showCar = !this.showCar;
    },
    showOrder: function(idEvent) {
      this.$router.push({
        name: "Orden-Evento",
        params: { id: idEvent }
      });
    },
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    loadEvents: function() {
      apiEvents.listDetail(this.getIdEvent).then(response => {
        this.event = response.data;
        //console.log(this.event);
      });
    },
    getOrder() {
      apiOrders.byUser(this.getIdEvent, this.getUser).then(response => {
        this.cart = response.data[0];
      });
    },
    subTotal: function(quantity, price) {
      return quantity * price;
    },
    addOrder() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();

        formData.append("order", 4);
        formData.append("product", this.order.product);
        formData.append("description", this.order.description);
        formData.append("price", this.order.price);
        formData.append("quantity", this.order.quantity);

        apiOrders
          .addItem(formData)
          .then(response => {
            this.getOrder();
          })
          .catch(error => {
            console.log(error);
          });

        this.order.product = "";
        this.order.description = "";
        this.order.price = 0;
        this.order.quantity = 1;

        this.$refs.form.resetValidation();
      }
    },
    EditOrder(item) {
      this.showAdd = false;

      this.order.id = item.id;
      this.order.product = item.product;
      this.order.description = item.description;
      this.order.price = item.price;
      this.order.quantity = item.quantity;
    },
    cancel() {
      this.showAdd = true;

      this.order.product = "";
      this.order.description = "";
      this.order.price = 0;
      this.order.quantity = 1;

      this.$refs.form.resetValidation();
    },
    saveOrder(idOrder) {
      if (this.$refs.form.validate()) {
        const formData = new FormData();

        formData.append("order", 4);
        formData.append("product", this.order.product);
        formData.append("description", this.order.description);
        formData.append("price", this.order.price);
        formData.append("quantity", this.order.quantity);

        apiOrders
          .editItem(idOrder, formData)
          .then(response => {
            this.getOrder();
          })
          .catch(error => {
            console.log(error);
          });

        this.order.product = "";
        this.order.description = "";
        this.order.price = 0;
        this.order.quantity = 1;

        this.$refs.form.resetValidation();

        this.showAdd = true;
      }
    },

    deleteItem(idOrder) {
      apiOrders
        .removeItem(idOrder)
        .then(response => {
          this.getOrder();
        })
        .catch(error => {
          console.log(error);
        });
    },
    formatDate: function(date) {
      return moment(date).fromNow();
    }
  }
};
</script>

<style></style>
