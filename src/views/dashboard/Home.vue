<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-sheet elevation="10">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>
                  <div class="display-2 mb-4">
                    Bienvenido!
                  </div>
                </v-list-item-title>
                <v-list-item-title class="text-h4 mb-2">
                  <div class="logo">
                    <strong>@Eventos App</strong>
                  </div>
                </v-list-item-title>
                Con esta aplicación podrás administrar todo tipo de eventos de
                una forma muy práctica y fácil.
                <!-- Es la Versión 1, Posteriormente añadiremos nuevas funcionalidad y
              módulos. -->
              </v-list-item-content>

              <v-list-item-avatar tile size="80" color="grey">
                <v-img src="@/assets/logo3.jpg" />
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-sheet>

        <!-- <v-sheet elevation="10">
          <v-card>
            <v-card-title>
              <v-row justify="center">
                <div class="display-2 mb-4 ma-3">
                  Tutorial
                </div>
              </v-row>
            </v-card-title>

            <v-card-subtitle>
              <v-row justify="center">
                <div class="logo display-1 mb-4 ma-3">
                  Sigue los siguientes pasos para utilizar la app.
                </div>
              </v-row>
            </v-card-subtitle>

            <v-card-text>
              <v-card-title>
                Paso 1. Crea tu evento.
              </v-card-title>

              <v-row justify="center">
                <v-img
                  src="https://picsum.photos/510/300?random"
                  max-width="500"
                  max-height="300"
                  class="ma-5"
                >
                </v-img>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-card-title>
                Paso 2. Agrega detalle a tu evento.
              </v-card-title>

              <v-row justify="center">
                <v-img
                  src="https://picsum.photos/510/300?random"
                  max-width="500"
                  max-height="300"
                  class="ma-5"
                >
                </v-img>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-card-title>
                Paso 3. Agrega participantes a tu evento.
              </v-card-title>

              <v-row justify="center">
                <v-img
                  src="https://picsum.photos/510/300?random"
                  max-width="500"
                  max-height="300"
                  class="ma-5"
                >
                </v-img>
              </v-row>
            </v-card-text>
          </v-card>
        </v-sheet> -->
      </v-col>
    </v-row>

    <!-- <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mx-auto" outlined>
          <v-card-title>
            <div class="display-2 text-center">
              Tutorial
            </div>
          </v-card-title>
          <v-card-subtitle>
            <div class="logo ma-2">
              <strong>Sigue los siguientes pasos para utilizar la app.</strong>
            </div>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row> -->
    <!-- <v-row>
      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="primary"
          icon="mdi-view-dashboard"
          title="Eventos Creados"
          value="350"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="primary"
          icon="mdi-account-group"
          title="Miembros"
          value="3,000"
          sub-icon="mdi-tag"
          sub-text="Tracked from Google Analytics"
        />
      </v-col>

      <!-- <v-carousel hide-delimiters>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel> 

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="primary"
          icon="mdi-store"
          title="Revenue"
          value="$ 34,245"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="primary"
          icon="mdi-sofa"
          title="Bookings"
          value="184"
          sub-icon="mdi-alert"
          sub-icon-color="red"
          sub-text="Get More Space..."
        />
      </v-col>
    </v-row>-->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- <v-row justify="space-around">
          <v-icon @click="model--">
            mdi-minus
          </v-icon>
          {{ model }}
          <v-icon @click="model++">
            mdi-plus
          </v-icon>
        </v-row> -->
        <v-sheet elevation="10">
          <v-carousel v-model="model">
            <v-carousel-item v-for="(color, i) in colors" :key="color">
              <v-sheet :color="color" height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                  <div class="text-h2">Slide {{ i + 1 }}</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      model: 0,
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De"
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },
      headers: [
        {
          sortable: false,
          text: "ID",
          value: "id"
        },
        {
          sortable: false,
          text: "Name",
          value: "name"
        },
        {
          sortable: false,
          text: "Salary",
          value: "salary",
          align: "right"
        },
        {
          sortable: false,
          text: "Country",
          value: "country",
          align: "right"
        },
        {
          sortable: false,
          text: "City",
          value: "city",
          align: "right"
        }
      ],

      tabs: 0,
      tasks: {
        0: [
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: true
          },
          {
            text:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            value: false
          },
          {
            text:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: false
          },
          {
            text: "Create 4 Invisible User Experiences you Never Knew About",
            value: true
          }
        ],
        1: [
          {
            text:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: true
          },
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: false
          }
        ],
        2: [
          {
            text:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            value: false
          },
          {
            text:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: true
          },
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: true
          }
        ]
      },
      list: {
        0: false,
        1: false,
        2: false
      }
    };
  },

  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    }
  }
};
</script>
<style scoped>
.logo {
  color: #f50057;
}
</style>
