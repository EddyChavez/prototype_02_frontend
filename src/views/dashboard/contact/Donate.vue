<template>
  <v-container id="upgrade" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card color="primary">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Donar a este proyecto
            </div>
          </template>
          <v-container>
            <v-row justify="center">
              <v-col cols="12" md="8">
                <div>
                  <p class="text-center">
                    Center aligned text on all viewport sizes. Center aligned
                    text on all viewport sizes. Center aligned text on all
                    viewport sizes.
                  </p>
                </div>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="12" md="8">
                <v-card v-show="showDonate" color="#F5F5F5" dense>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container class="py-0">
                      <v-row justify="center">
                        <v-col cols="12" md="8">
                          <v-text-field
                            v-model="amount"
                            :rules="AmountRules"
                            class="purple-input"
                            label="Monto"
                            type="number"
                            min="5"
                            prepend-icon="mdi-currency-usd"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                  <v-row justify="center">
                    <v-col cols="12" md="5" sm="5">
                      <div class="text-center">
                        <v-img
                          src="@/assets/logo_mercado_pago.png"
                          height="100%"
                        ></v-img>
                      </div>
                    </v-col>
                  </v-row>
                  <v-col cols="12" class="text-center">
                    <v-btn
                      :loading="loading"
                      rounded
                      color="blue"
                      dark
                      @click="checkout()"
                    >
                      Continuar
                    </v-btn>
                  </v-col>
                </v-card>
                <MercadoPago
                  v-if="!showDonate"
                  :amount="amount_format"
                  :preference_id="preference_id"
                />
                <v-col v-if="!showDonate" cols="12" class="text-center">
                  <v-btn small rounded color="blue" @click="cancel()">
                    <v-icon left>
                      mdi-arrow-left
                    </v-icon>
                    Volver
                  </v-btn>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiMercadoPago from "@/api/payments/mercadopago";
import MercadoPago from "@/components/base/MercadoPago.vue";

export default {
  name: "Donate",
  components: {
    MercadoPago
  },
  data() {
    return {
      valid: true,
      loading: false,
      amount: 0,
      showDonate: true,
      AmountRules: [
        v => !!v || "Monto es requerido",
        v => v >= 5 || "Para procesar pago la cantidad minima es $ 5.00"
      ],
      preference_id: null,
      amount_format: ""
    };
  },

  methods: {
    checkout() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        this.generateID();
        setTimeout(() => (this.loading = false), 2000);
        setTimeout(() => (this.showDonate = false), 2000);
      }
    },
    generateID: function() {
      let amount = parseFloat(this.amount).toFixed(2);
      this.amount_format = parseFloat(this.amount).toFixed(2);

      let data = {
        items: [
          {
            title: "Donacion",
            quantity: 1,
            unit_price: parseFloat(amount)
          }
        ],
        back_urls: {
          success: "http://localhost:8080",
          failure: "http://localhost:8080",
          pending: "http://localhost:8080"
        },
        auto_return: "approved"
      };

      apiMercadoPago
        .createPreference(JSON.stringify(data))
        .then(response => {
          this.preference_id = response.data.id;
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancel() {
      this.$refs.form.reset();

      this.showDonate = true;
      this.preference_id = null;
      this.amount = 0;
    }
  }
};
</script>

<style lang="sass">
#upgrade
  .v-data-table
    th, td
      border: none !important
</style>
