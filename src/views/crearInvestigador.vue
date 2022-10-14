<template>
  <v-layout fluid grid-list-md>
    <v-container container fluid grid-list-md>
      <h1>Seleccione la edición para generar la ficha del Investigador.</h1>
      <v-layout>
        <v-flex class="pa-0">
          <v-radio-group row v-model="edicion">
            <v-radio color="blue" label="5 edicion" value="5 edicion">
            </v-radio>

            <v-radio color="red" label="7 edicion" value="7 edicion"> </v-radio>

            <v-btn color="primary" @click="crearInvestigador()">
              Crear Investigador
            </v-btn>
          </v-radio-group>
        </v-flex>
      </v-layout>
      <v-container v-if="fuerza != null" fluid grid-list-md class="px-0">
        <v-card class="outlined py-4 px-5">
          <v-layout row wrap>
            <v-flex xs8 md10 lg10>
              <v-img height="auto" :src="fotoDeInvestigador()"> </v-img>
              <v-card-title>
                <span>
                  Puntos en físicos:{{ fuerza }}, {{ destreza }}, {{
                    constitucion
                  }}, {{ poder }}, {{ apariencia }}
                <div>
                  Puntos en segundarios:{{ inteligencia }}, {{ tamaño }}, {{
                  educacion
                }}
                </div>
                </span>
              </v-card-title>

              <v-card-text>
                <h2 class="py-2">Atributos fisicos</h2>
                <div>Nombre: {{ resultadoArray }}</div>
                <div>Fuerza: {{ fuerza }}</div>
                <div>Destreza: {{ destreza }}</div>
                <div>Constitución: {{ constitucion }}</div>
                <div>Poder: {{ poder }}</div>
                <div>Apariencia: {{ apariencia }}</div>
                <h2 class="py-2">Inteligencia, Tamaño y Educacion</h2>
                <div>Inteligencia: {{ inteligencia }}</div>
                <div>Tamaño: {{ tamaño }}</div>
                <div>Educación: {{ educacion }}</div>
                <h2 class="py-2">Terciaros atributos</h2>
                <div v-if="edicion == '5 edicion'">
                  <div>idea: {{ idea }}</div>
                  <div>Conocimientos: {{ conocimientos }}</div>
                  <div>edad: {{ edad }}</div>
                </div>
                <div>suerte: {{ suerte }}</div>
                <div>Cordura: {{ cordura }}</div>
                <div>Puntos de Vida: {{ puntosDeVida }}</div>
                <div>Puntos de Magia: {{ puntosDeMagia }}</div>
              </v-card-text>

              <v-card-actions>
                <v-flex xs12 md8>
                  <v-btn
                  color="warning"
                  @click="convertirFicha7Edicion()"
                  v-if="edicion == '5 edicion'"
                >
                  Convertir Ficha a 7Edicion
                </v-btn>
                <v-btn
                  color="warning"
                  @click="convertirFicha5Edicion()"
                  v-if="edicion == '7 edicion'"
                >
                  Convertir Ficha a 5Edicion
                </v-btn>
                <v-btn color="warning" @click="guardarFichasInvestigador()">
                  Guardar Investigador
                </v-btn>
                </v-flex>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      apariencia: null,
      atributoInvestigador: [],
      constitucion: null,
      conocimientos: null,
      cordura: null,
      destreza: null,
      edicion: "5 edicion",
      educacion: null,
      edad: null,
      fuerza: null,
      fotoInvestigadorHombre: [
        "https://thumbs.dreamstime.com/b/fotograf%C3%ADa-blanco-y-negro-de-un-hombre-mayor-66853796.jpg",
        "https://i.pinimg.com/originals/dc/8a/0e/dc8a0e8a275b6cbfee36a92df0154aa5.jpg",
        "https://i.pinimg.com/originals/49/dd/26/49dd269af01827a48b31c1efe16aa973.jpg",
        "https://i.pinimg.com/originals/6d/75/dd/6d75dd5eecdff7dd9c65c1b8e168ab5c.jpg"
      ],
      fotoInvestigadorMujer: [
        "https://us.123rf.com/450wm/dubova/dubova1712/dubova171200045/92489244-retrato-interior-de-hermosa-mujer-de-40-a%C3%B1os.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Violet_Jessop_in_Voluntary_Aid_Detachment_Uniform.jpg/800px-Violet_Jessop_in_Voluntary_Aid_Detachment_Uniform.jpg",
        "https://media.revistavanityfair.es/photos/60e835462961da12c30f7123/1:1/w_349,h_349,c_limit/211696.jpg",
        "https://ksassets.timeincuk.net/wp/uploads/sites/46/2016/07/Louise-Brooks-1.jpg",
        "https://i.etsystatic.com/5574001/r/il/5a96be/1503161857/il_570xN.1503161857_eqda.jpg",
        "https://ksassets.timeincuk.net/wp/uploads/sites/46/2015/10/wearing-Chanel29.jpg"
      ],
      idea: null,
      inteligencia: null,
      nombreInvestigadorHombre: ["Miguel", "Otero", "Marcos", "Jonathan"],
      nombreInvestigadorMujer: ["Ana", "Maria", "Juana", "Miguel", "Deus"],
      poder: null,
      puntosDeVida: null,
      puntosDeMagia: null,
      suerte: null,
      tamaño: null,
      resultadoArray: null
    };
  },
  created() {
    this.nombreInvestigador();
  },
  updated() {},
  methods: {
    calcularTerciaroAtributos() {
      this.edicion === "5 edicion" ? (this.edad = this.educacion + 6) : null;
      this.edicion === "5 edicion" ? (this.cordura = this.poder * 5):(this.cordura = this.poder);
      this.edicion === "5 edicion" ? (this.puntosDeVida = Math.round((this.constitucion + this.tamaño) / 2)) : (this.puntosDeVida = Math.floor( (this.tamaño + this.constitucion) / 10));
      this.edicion === "5 edicion"  ? (this.idea = this.inteligencia * 5)  : (this.idea = this.inteligencia * 2);
      this.crearAtributosDeInvestigador(2);
      this.edicion === "5 edicion" ? (this.suerte = this.poder * 5) : (this.suerte = this.atributoInvestigador * 5);
      this.edicion === "5 edicion" ? (this.conocimientos = this.educacion * 5) : null;
      this.edicion === "5 edicion" ? (this.puntosDeMagia = this.poder) : (this.puntosDeMagia = this.poder / 5);
    },
    crearInvestigador() {
      this.edicion === "5 edicion" ? this.guardarAtributos(1): this.guardarAtributos(5);
      this.calcularTerciaroAtributos();
    },
    crearAtributosDeInvestigador(numeroTiradas) {
      const variable = this;
      variable.atributoInvestigador = [];
      this.tiradaDeDados(numeroTiradas);
      let sumarAtributos = variable.atributoInvestigador.reduce(
        (a, b) => a + b,
        0
      );
      variable.atributoInvestigador = sumarAtributos;
    },
    convertirFicha7Edicion() {
      let convertirFuerza7Edicion = this.fuerza * 5;
      let convertirDestreza7Edicion = this.destreza * 5;
      let convertirConstitucion7Edicion = this.constitucion * 5;
      let convertirApariencia7Edicion = this.apariencia * 5;
      let convertirPoder7Edicion = this.poder * 5;
      let convertirTamaño7Edicion = this.tamaño * 5;
      let convertirInteligencia7Edicion = this.inteligencia * 5;
      let convertirEducacion7Edicion = (this.educacion + this.dadoDe6Caras() - 3 + 6) * 5;
      let convertirPuntosMagia7Edicicion = convertirPoder7Edicion / 5;
      this.fuerza = convertirFuerza7Edicion;
      this.destreza = convertirDestreza7Edicion;
      this.constitucion = convertirConstitucion7Edicion;
      this.poder = convertirPoder7Edicion;
      this.tamaño = convertirTamaño7Edicion;
      this.inteligencia = convertirInteligencia7Edicion;
      this.apariencia = convertirApariencia7Edicion;
      this.educacion = convertirEducacion7Edicion;
      this.puntosDeMagia = convertirPuntosMagia7Edicicion;
      this.crearAtributosDeInvestigador(2);
      this.suerte = this.atributoInvestigador * 5;
    },
    convertirFicha5Edicion() {
      let convertirFuerza5Edicion = this.fuerza / 5;
      let convertirDestreza5Edicion = this.destreza / 5;
      let convertirConstitucion5Edicion = this.constitucion / 5;
      let convertirApariencia5Edicion = this.apariencia / 5;
      let convertirPoder5Edicion = this.poder / 5;
      let convertirTamaño5Edicion = this.tamaño / 5;
      let convertirInteligencia5Edicion = this.inteligencia / 5;
      let convertirEducacion5Edicion = (this.educacion / 5 + this.dadoDe6Caras() - 6) + 3;
      this.fuerza = convertirFuerza5Edicion;
      this.destreza = convertirDestreza5Edicion;
      this.constitucion = convertirConstitucion5Edicion;
      this.poder = convertirPoder5Edicion;
      this.tamaño = convertirTamaño5Edicion;
      this.inteligencia = convertirInteligencia5Edicion;
      this.apariencia = convertirApariencia5Edicion;
      this.educacion = convertirEducacion5Edicion;
      this.puntosDeMagia = this.poder;
      this.idea = this.inteligencia * 5;
      this.suerte = this.poder * 5;
      this.conocimientos = this.educacion * 5;
    },
    dadoDe6Caras() {
      let dado6caras = Math.round(Math.random() * 6);
      if (dado6caras <= 0) {
        dado6caras++;
      }
      return dado6caras;
    },
    guardarAtributos(edicion) {
      const variable = this;
      this.crearAtributosDeInvestigador(2);
      variable.fuerza = variable.atributoInvestigador * edicion;
      this.crearAtributosDeInvestigador(2);
      variable.destreza = variable.atributoInvestigador * edicion;
      this.crearAtributosDeInvestigador(2);
      variable.constitucion = variable.atributoInvestigador * edicion;
      this.crearAtributosDeInvestigador(2);
      variable.poder = variable.atributoInvestigador * edicion;
      this.crearAtributosDeInvestigador(2);
      variable.apariencia = variable.atributoInvestigador * edicion;
      this.edicion === "5 edicion" ? this.crearAtributosDeInvestigador(2): this.crearAtributosDeInvestigador(1)
      this.edicion === "5 edicion" ? variable.educacion = (variable.atributoInvestigador  + 3): variable.educacion = (variable.atributoInvestigador  + 6) * edicion;
      this.crearAtributosDeInvestigador(1);
      variable.inteligencia = ( variable.atributoInvestigador + 6) * edicion;
      this.crearAtributosDeInvestigador(1);
      variable.tamaño = (variable.atributoInvestigador + 6) * edicion;
    },
    async guardarFichasInvestigador() {
      try {
        await this.$store.dispatch("guardarAtributosInvestigador", {
        nombre: this.resultadoArray,
        edicion: this.edicion,
        fuerza: "Fuerza:" +  '' + this.fuerza,
        destreza: "Destreza:" + '' + this.destreza,
        constitucion: "Constitucion:" + '' + this.constitucion,
        poder: "Poder:" + '' + this.poder,
        apariencia: "Apariencia:" + '' + this.apariencia,
        inteligencia: "Inteligencia:" + '' + this.inteligencia,
        tamaño: "Tamaño:" + '' + this.tamaño,
        educacion: "Educacion:" + '' + this.educacion,
        suerte: "Suerte:" + '' + this.suerte,
        cordura: "Cordura:" + '' + this.cordura,
        mp: "Puntos Magicos:" + '' + this.puntosDeMagia,
        hp: "Puntos:" + '' + this.puntosDeVida
      });
        this.mensaje(
          "success",
          "Investigador Creado",
          2020,
          "Se ha guardado los datos investigador de manera exitosa."
        );
      } catch (error) {
        this.mensaje(
          "error",
          "¡Ha ocurrido un error en el registro!",
          null,
          error.message
        );
      }
    },
    generarElementoRandomArray(indiceArray, array) {
      let numeroRandom = Math.round(Math.random() * indiceArray);
      let restaArray = array.length - numeroRandom;
      if (restaArray == array.length) {
        restaArray--;
      }
      let getElementoRandom = array[restaArray];
      this.resultadoArray = getElementoRandom;
    },
    fotoDeInvestigador() {
      let hombre = this.fotoInvestigadorHombre;
      let mujer = this.fotoInvestigadorMujer;
      let arrayFotoInvestigador = null;
      let sexo = Math.round(Math.random() * 1);
      if (sexo == 1) {
        arrayFotoInvestigador = hombre;
      } else {
        arrayFotoInvestigador = mujer;
      }
      let aleatorioNumero = Math.floor(
        Math.random() * arrayFotoInvestigador.length
      );
      let elementoRandomArray = arrayFotoInvestigador[aleatorioNumero];
      return elementoRandomArray;
    },
    mensaje(icono, titulo, tiempo, texto) {
      this.$swal.fire({
        icon: icono,
        title: titulo,
        timer: tiempo,
        text: texto
      });
    },
    nombreInvestigador() {
      let sexo = Math.round(Math.random() * 1);
      if (sexo == 1) {
        this.generarElementoRandomArray(
          this.nombreInvestigadorHombre.length,
          this.nombreInvestigadorHombre
        );
      } else {
        this.generarElementoRandomArray(
          this.nombreInvestigadorMujer.length,
          this.nombreInvestigadorMujer
        );
      }
    },
    tiradaDeDados(numeroTiradas) {
      for (let lanzarDados = 0; lanzarDados <= numeroTiradas; lanzarDados++) {
        let tirada3d6 = this.dadoDe6Caras();
        this.atributoInvestigador.push(tirada3d6);
      }
    }
  },
  computed: {}
};
</script>
