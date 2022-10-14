<template>
  <v-layout justify-center align-center>
    <v-container fluid grid-list-md class="px-0 pa-0 ">
      <v-card v-if="fichasInvestigador != null">
        <v-list>
          <v-list-group :value="true" prepend-icon="mdi-account-circle">
            <template v-slot:activator>
              <v-list-item-title>Investigadores</v-list-item-title>
            </template>
            <v-list-group
              :value="false"
              no-action
              sub-group
              v-for="item in fichasInvestigador"
              :key="item.id"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title
                    >Nombre: {{ item.atributosInvestigador.nombre }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-content>
                <v-list-item
                  ><v-icon class="pr-2">fas fa-eye</v-icon>
                  {{ item.atributosInvestigador.edicion }}
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-2">fas fa-dumbbell</v-icon>
                  {{ item.atributosInvestigador.fuerza }}
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-2">fas fa-sign-language</v-icon>
                  {{ item.atributosInvestigador.destreza }}
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-2">fas fa-user-tie</v-icon>
                  {{ item.atributosInvestigador.apariencia }}
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-2">fas fa-shield-alt</v-icon>
                  {{ item.atributosInvestigador.poder }}
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-2">fas fa-brain</v-icon>
                  {{ item.atributosInvestigador.inteligencia }}
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-2">fas fa-weight</v-icon>
                  {{ item.atributosInvestigador.tamaño }}
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-2">fas fa-book-reader</v-icon>
                  {{ item.atributosInvestigador.educacion }}
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-2">fas fa-dumbbell</v-icon>
                  {{ item.atributosInvestigador.suerte }}
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-2">fas fa-swimmer</v-icon>
                  {{ item.atributosInvestigador.constitucion }}
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-2">fas fa-heart</v-icon>
                  {{ item.atributosInvestigador.hp }}
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-2">fas fa-hat-wizard</v-icon>
                  {{ item.atributosInvestigador.mp }}
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-2">fas fa-head-side-virus</v-icon>
                  <span>{{ item.atributosInvestigador.cordura }}</span>
                </v-list-item>
              </v-list-content>
            </v-list-group>
          </v-list-group>
        </v-list>
      </v-card>
      <v-layout
        v-if="fichasInvestigador == null"
        align-center
        justify-center
        column
      >
        <v-flex xs4 sm6 md6>
          <v-img src="../assets/imagenes/sinDatos.png" width="550"></v-img>
        </v-flex>
        <v-flex xs4 sm6 md12>
          <h2>¡No hay datos disponibles!</h2>
          <div>El Usuario no tiene registrado ningun investigador.</div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.fichasInvestigador;
  },
  updated() {},
  methods: {},
  computed: {
    fichasInvestigador() {
      this.$store.commit("mostrarDatosInvestigador");
      return this.$store.state.fichasInvestigador;
    }
  }
};
</script>
