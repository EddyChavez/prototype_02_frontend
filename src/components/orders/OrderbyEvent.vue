<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="9">
        <base-material-card color="primary">
          <template v-slot:heading>
            <v-row>
              <!-- <v-col cols="12" md="6">
                <div class="display-2 font-weight-light">
                  Pedido del Evento
                </div>
              </v-col> -->
              <div class="subtitle-1 font-weight-light">
                Se muestran todos los pedidos de cada participante
              </div>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <div class="display-2 float-md-center font-weight-bold">
                  Propina: $ 60.00
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="display-2 float-md-center font-weight-bold">
                  Cantidad: {{ count }}
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="display-2 float-md-center font-weight-bold">
                  Total: $ {{ total }}
                </div>
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col cols="12">
                <div class="d-flex justify-space-around mb-12 pa-2">
                  <div class="display-2 font-weight-bold">
                    Propina: $ {{ total }}
                  </div>
                  <div class="display-2  font-weight-bold">
                    Cantidad: $ {{ count }}
                  </div>
                  <div class="display-2  font-weight-bold">
                    Total: $ {{ total }}
                  </div>
                </div>
              </v-col>
            </v-row> -->
          </template>

          <v-data-table
            :headers="orderstHeaders"
            :items="list_orders"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="user.id"
            show-expand
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Taquiza</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-switch
                  v-model="showDetail"
                  @change="expand()"
                  label="Expandir"
                  class="mt-2"
                ></v-switch>
              </v-toolbar>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-simple-table>
                  <thead>
                    <th>Producto</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </thead>
                  <tbody>
                    <tr v-for="detail in item.items" v-bind:key="detail.id">
                      <td>{{ detail.product }}</td>
                      <td>{{ detail.description }}</td>
                      <td class="text-center">{{ detail.quantity }}</td>
                      <td class="text-center">$ {{ detail.price }}</td>
                      <td class="text-center">
                        $
                        {{ subTotal(detail.quantity, detail.price).toFixed(2) }}
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </td>
            </template>
            <template v-slot:item.user.avatar="{ item }">
              <v-avatar size="50" left v-if="item.user.avatar">
                <v-img :src="item.user.avatar"></v-img>
              </v-avatar>
              <v-avatar color="indigo" v-else>
                <span
                  v-if="item.user.get_initials"
                  class="white--text text-h5"
                  >{{ item.user.get_initials }}</span
                >
                <v-img v-else src="@/assets/user_group.png"></v-img>
              </v-avatar>
            </template>
            <template v-slot:item.user.get_full_name="{ item }">
              <span v-if="item.user.get_full_name"
                >{{ item.user.get_full_name }}
              </span>
              <span v-else> {{ item.user.email }} </span>
            </template>
            <template v-slot:item.amount="{ item }">
              $ {{ item.amount }}
            </template>
            <template v-slot:item.quantity="{ item }">
              {{ item.quantity }}
            </template>
            <template v-slot:item.paid_out="{ item }">
              <v-icon large v-if="item.paid_out == false" color="red">
                mdi-cash-remove
              </v-icon>
              <v-icon large v-else color="green">
                mdi-cash-plus
              </v-icon>
            </template>

            <template v-slot:item.date="{ item }">
              {{ frontEndDateFormat(item.date) }}
            </template>
          </v-data-table>

          <!-- <v-data-table
            :headers="dessertHeaders"
            :items="desserts"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="name"
            show-expand
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Expandable Table</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-switch
                  v-model="singleExpand"
                  label="Single expand"
                  class="mt-2"
                ></v-switch>
              </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">More info about {{ item.name }}</td>
            </template>
          </v-data-table> -->
        </base-material-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-text>
            <v-row justify="center">
              Administrar
            </v-row>

            <v-row class="ma-6" justify="center">
              <v-btn class="ma-2" rounded color="green" dark>
                <v-icon left>
                  mdi-cash-multiple
                </v-icon>
                Agregar Pago
              </v-btn>

              <v-btn class="ma-2" rounded color="blue" dark>
                <v-icon left>
                  mdi-file-pdf-outline
                </v-icon>
                Descargar
              </v-btn>

              <v-btn class="ma-2" rounded color="gray" dark>
                <v-icon left>
                  mdi-printer
                </v-icon>
                Imprimir
              </v-btn>

              <v-btn class="ma-2" rounded color="red" dark>
                <v-icon left>
                  mdi-close-thick
                </v-icon>
                Concluir evento
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <base-material-card
      icon="mdi-clipboard-text"
      title="Orden"
      class="px-5 py-3"
    >
      <v-simple-table v-for="order in list_orders" v-bind:key="order.id">
        <thead>
          <th :colspan="5">
            <v-row justify="center" class="">
              <v-col cols="12" md="2">
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>

              <v-col cols="12" md="2">
                {{ order.user }}
              </v-col>
              <v-col cols="12" md="2">
                {{ frontEndDateFormat(order.date) }}
              </v-col>
              <v-col cols="12" md="2"> Cantidad:{{ order.quantity }} </v-col>
              <v-col cols="12" md="2"> Total: ${{ order.amount }} </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="12" md="12">
                <v-icon large v-if="order.paid_out" color="green">
                  mdi-cash-check
                </v-icon>
                <v-icon large v-else color="red">
                  mdi-cash-remove
                </v-icon>
              </v-col>
              <v-col cols="12" md="12">
                <v-icon large v-if="order.tip">
                  mdi-cash-plus
                </v-icon>
              </v-col>
            </v-row>
          </th>
        </thead>

        <thead>
          <th>Producto</th>
          <th>Descripcion</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Subtotal</th>
        </thead>
        <tbody>
          <tr v-for="detail in order.items" v-bind:key="detail.id">
            <td>{{ detail.product }}</td>
            <td>{{ detail.description }}</td>
            <td class="text-center">{{ detail.quantity }}</td>
            <td class="text-center">$ {{ detail.price }}</td>
            <td class="text-center">
              $ {{ subTotal(detail.quantity, detail.price).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card> -->
  </v-container>
</template>

<script>
import apiOrders from "@/api/orders";
import moment from "moment";

export default {
  name: "OrderbyEvent",
  data() {
    return {
      loading: false,
      orderstHeaders: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "user.avatar"
        },
        { text: "Usuario", value: "user.get_full_name" },
        // { text: "Fecha", value: "date" },
        { text: "Pagado", value: "paid_out" },
        { text: "Cantidad", value: "quantity" },
        { text: "Total", value: "amount" },
        { text: "", value: "data-table-expand" }
      ],
      list_orders: [],
      expanded: [],
      singleExpand: false,
      showDetail: false,
      total: 0,
      count: 0
    };
  },
  computed: {
    idEvent() {
      return this.$route.params.id;
    }
  },
  mounted: function() {
    this.loadOrder();
  },
  methods: {
    expand: function() {
      if (this.showDetail) {
        this.$data.expanded = this.$data.list_orders;
      } else {
        this.$data.expanded = [];
      }
    },
    subTotal: function(quantity, price) {
      return quantity * price;
    },
    loadOrder: function() {
      apiOrders.byEvent(this.idEvent).then(response => {
        this.list_orders = response.data;

        let count = [];
        let total = [];

        Object.entries(this.list_orders).forEach(([key, val]) => {
          count.push(val.quantity);
          total.push(parseFloat(val.amount));
        });

        this.count = count.reduce(function(count, num) {
          return count + num;
        }, 0);

        this.total = total.reduce(function(total, num) {
          return total + num;
        }, 0);
      });
    },
    frontEndDateFormat: function(date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    }
  }
};
</script>

<style lang="scss" scoped></style>
