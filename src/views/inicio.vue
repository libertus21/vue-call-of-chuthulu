<template>
  <v-layout fluid grid-list-md>
    <v-container fluid grid-list-md class="px-0 color-container">
      <v-container >
        <v-layout align-center justify-center>
          <h1>Bienvenido, por favor seleccione donde quiere ir.</h1>
        </v-layout>
        <v-layout row wrap>
          <template v-for="item in descripcion">
            <v-flex :key="item.id" d-flex xs12 sm6 md4 xl2 class="pa-2">
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  @click="goToComponente(item.ruta)"
                  class="ma-4 color-text-card"
                >
                  <v-img 
                    class=" color-imagen"
                    height="auto" 
                    :src="item.foto">
                  </v-img>
                  <v-card-title>
                    <span class="headline font-weight-black">{{
                      item.nombreComponente
                    }}</span>
                  </v-card-title>
                  <v-card-text>
                    <span
                      class="white--text body-1"
                      :class="{ caption: $vuetify.breakpoint.xs }"
                    >
                      {{ item.descripcion }}
                    </span>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-flex>
          </template>
        </v-layout>
      </v-container>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    descripcion: [
      {
        nombreComponente: "Lanzar Dados",
        descripcion:
          "Simule el sistema de combate, tiradas y persecución de Call of cthulhu.",
        foto: require("../assets/imagenes/In-House Finance Professional.png"),
        ruta: "/dados"
      },
      {
        nombreComponente: "Crear Investigador",
        descripcion:
          "Genera su investigador, usando las reglas de la 5 y 7 edición.",
        foto: require("../assets/imagenes/crearInvestigador.png"),
        ruta: "/Investigador"
      },
      {
        nombreComponente: "Lista Investigadores",
        descripcion:
          "Lista de todo los investigadores creado con su respectiva ficha.",
        foto: require("../assets/imagenes/listaInvestigadores.png"),
        ruta: "/listaInvestigadores"
      }
    ]
  }),
  methods: {
    goToComponente(rutaComponentes) {
      this.$store.commit("goToComponente", rutaComponentes);
    }
  }
};
</script>

<style scoped>
.color-imagen {
  background-image: linear-gradient(45deg, #dda130, #c9410b);
}
.color-text-card {
  background: #cc6540;
}
.color-container {
  background: whitesmoke;
}
</style>
