<template>
  <div class="d-flex align-center">
    <v-app-bar dark src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg">
      <v-app-bar-nav-icon
        v-if="this.$store.state.user != null"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute color="#212121">
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="item in componentes" :key="item.id" dark>
            <v-list-item-icon>
              <v-icon color="#FFCBA4" v-text="item.icono"></v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="goToComponente(item.ruta)">
              <v-list-item-title v-text="item.componente"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div class="pa-2">
        <v-btn block class="white" @click="outLogin()">
          Salir
        </v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    componentes: [
      {
        componente: "Lanzar dados",
        icono: "mdi-dice-multiple",
        ruta: "/dados"
      },
      {
        componente: "Crear Investigador",
        icono: "mdi-human-male",
        ruta: "/Investigador"
      },
      {
        componente: "Lista Investigadores",
        icono: "mdi-account-box-multiple-outline",
        ruta: "/listaInvestigadores"
      },
      { componente: "Inicio", icono: "mdi-folder-open", ruta: "/inicio" }
    ],
    drawer: false,
    group: null
  }),
  watch: {
    group() {
      this.drawer = false;
    }
  },
  methods: {
    outLogin() {
      this.$store.commit("outLogin");
      this.drawer = false;
    },
    goToComponente(rutaComponentes) {
      this.$store.commit("goToComponente", rutaComponentes);
    }
  }
};
</script>
