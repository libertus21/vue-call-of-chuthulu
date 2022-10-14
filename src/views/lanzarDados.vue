<template>
  <v-container fluid grid-list-md  class="px-0 pa-0 ">
    <v-layout row wrap>
      <v-flex xs6 sm8 md10 class="pa-4">
        <v-form v-model="error">
          <v-text-field
            label="Ingresa el porcentaje de habilidad investigador"
            v-model="habilidad"
            :rules="[reglas.minimoValor, reglas.maximoValor, reglas.requerido]"
            outline
            solo
            prepend-inner-icon="mdi-shield"
          >
          </v-text-field>
          <v-text-field
            label="Ingresa el porcentaje de habilidad adversario"
            v-model="habilidadAdversario"
            :rules="[reglas.minimoValor, reglas.maximoValor, reglas.requerido]"
            solo
          >
          </v-text-field>
        </v-form>
        <v-btn
          color="primary"
          @click="iniciarSistemaChuthulu(habilidad)"
          :disabled="error == false"
        >
          Click para evaluar una habilidad
        </v-btn>
        <v-btn color="primary" @click="combate()">
          Click para simular combate 1d100.
        </v-btn>
        <div>Tirada: {{ resultadoTirada1d100 }}</div>
        <div>tu habilidad actual es:{{ habilidad }}</div>
        <div>Resultado tirada: {{ this.$store.state.mensaje }}</div>
        <div>Tirada Atacante: {{ mensajeCombateAtacante}}</div>
        <div>Tirada Defensor: {{ mensajeCombateDefensor}}</div>
        <h3 v-if="mensajeResultadoCombate != null">Resultado Combate: {{ mensajeResultadoCombate }}</h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dado: null,
      error: false,
      exitoNormal: null,
      exitoDificil: null,
      exitoExtremo: null,
      habilidad: null,
      habilidadAdversario: null,
      habilidadMitaValor: null,
      habilidadCuartoValor: null,
      mensajeResultadoCombate: null,
      mensajeCombateAtacante:null,
      mensajeCombateDefensor:null,
      resultadoTirada1d100: null,
      repetirTirada: null,
      reglas: {
        requerido: value => !!value || "Es obligatorio relleñar el campo.",
        minimoValor: value =>
          value >= 1 || "El valor no puede ser 0 ni llevar una letra",
        maximoValor: value =>
          value <= 100 || "El valor no puede ser mayor a 100"
      },
      tirada: null,
      tiradaDado: null
    };
  },
  created() {},
  updated() {},
  methods: {
    calcularDificultadDeTirada(habilidadInvestigador) {
      this.$store.commit("calcularDificultadDeTirada", habilidadInvestigador);
    },
    combate() {
      this.iniciarSistemaChuthulu(this.habilidad);
      let exitoOFracasoAtacante = this.$store.state.exitoOFracaso;
      this.mensajeCombateAtacante = this.$store.state.mensaje;
      this.iniciarSistemaChuthulu(this.habilidadAdversario);
      let exitoOFracasoDefensor = this.$store.state.exitoOFracaso;
      this.mensajeCombateDefensor = this.$store.state.mensaje;
      if (exitoOFracasoAtacante > exitoOFracasoDefensor) {
        this.mensajeResultadoCombate = "Ha ganado el atacante";
      }
      if (exitoOFracasoDefensor > exitoOFracasoAtacante) {
        this.mensajeResultadoCombate = "Ha ganado el defensor";
      }
      if (
        Math.sign(exitoOFracasoAtacante) == +1 &&
        Math.sign(exitoOFracasoDefensor) == +1 &&
        exitoOFracasoAtacante == exitoOFracasoDefensor
      ) {
        this.mensajeResultadoCombate =
          "Ha ocurrido un empate, gana quien tenga la habilidad mas alta";
      }
      if (
        Math.sign(exitoOFracasoAtacante) == -1 &&
        Math.sign(exitoOFracasoDefensor) == -1
      ) {
        this.mensajeResultadoCombate = "Ninguno de los 2 ha obtenido exito";
      }
    },
    iniciarSistemaChuthulu(habilidad) {
      this.tirarDado(100);
      this.calcularDificultadDeTirada(habilidad);
      this.isTiradaExitoOFracaso();
    },
    isTiradaExitoOFracaso() {
      this.$store.commit("isTiradaExitoOFracaso");
    },
    tirarDado(numeroCaras) {
      this.$store.commit("tirarDado", numeroCaras);
      this.resultadoTirada1d100 = this.$store.state.resultadoTirada;
    }
  },
  computed: {}
};
</script>
