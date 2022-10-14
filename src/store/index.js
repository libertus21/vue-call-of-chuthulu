import Vue from "vue";
import Vuex from "vuex";
import { auth, database } from "../firebase.js";
import firebase from "firebase/app";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fuerza: [],
    destreza: [],
    apariencia: [],
    poder: [],
    constitucion: [],
    dado: [],
    atributo: [],
    fichasInvestigador: null,
    user: null,
    resultadoTirada: null,
    habilidad: null,
    habilidadMitaValor: null,
    habilidadCuartoValor: null,
    exitoOFracaso: 0,
    mensaje:null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    outLogin(state) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          state.user = null;
          router.push({ name: "login" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    guardarFichasInvestigador(state, atributosInvestigador) {
      let userId = state.user.uid;
      let listFichas = database.ref("fichasNew" + userId);
      let guardarFichas = listFichas.push();
      guardarFichas.set({ atributosInvestigador });
    },
    mostrarDatosInvestigador(state) {
      const userId = state.user.uid;
      database.ref("fichasNew" + userId).on("value", function(snapshot) {
        let datosInvestigador = snapshot.val();
        state.fichasInvestigador = datosInvestigador;
      });
    },
    goToComponente(state, rutaComponentes) {
      router.push(rutaComponentes);
    },
    tirarDado(state, numeroCaras) {
      let dado = Math.round(Math.random() * numeroCaras);
      if (dado <= 0) {
        dado++;
      }
      state.resultadoTirada = dado;
    },
    calcularDificultadDeTirada(state, habilidad) {
      state.habilidad = habilidad;
      state.habilidadMitaValor = habilidad / 2;
      state.habilidadCuartoValor = habilidad / 5;
    },
    isTiradaExitoOFracaso(state) {
      state.exitoOFracaso = null;
      let tiradaResultado = state.resultadoTirada;
      let exitoNormal = state.habilidad;
      let exitoDificil = state.habilidadMitaValor;
      let exitoCritico = state.habilidadCuartoValor;
      let critico = false;
      let pifa = false;
      if (tiradaResultado == 1) {
        critico = true;
        state.mensaje = "¡La tirada ha sido un critico!";
        state.exitoOFracaso = 4;
      }
      if (tiradaResultado <= exitoNormal && tiradaResultado > exitoDificil) {
        state.mensaje = "La tirada ha sido un exito normal";
        state.exitoOFracaso = 1;
      }
      if (tiradaResultado <= exitoDificil && tiradaResultado > exitoCritico) {
        state.mensaje = "La tirada ha sido un exito dificil";
        state.exitoOFracaso = 2;
      }
      if (tiradaResultado <= exitoCritico && tiradaResultado < exitoDificil && critico == false) {
        state.mensaje = "La tirada ha sido un exito extremo";
        state.exitoOFracaso = 3;
      }
      if (tiradaResultado >= 96 && tiradaResultado > exitoNormal) {
        pifa = true;
        state.exitoOFracaso = -1;
        state.mensaje = "¡La tirada ha sido una pifia!";
      }
      if (tiradaResultado > exitoNormal && pifa == false) {
        state.exitoOFracaso = -1;
        state.mensaje = "¡La tirada ha sido un fracaso!";
      }
    }
  },
  actions: {
    async loginFirebase({ commit }, { email, password }) {
      await auth.signInWithEmailAndPassword(email, password);
      commit("setUser", auth.currentUser);
    },
    async registrarFirebase({ commit }, { email, password }) {
      await auth.createUserWithEmailAndPassword(email, password);
      commit("setUser", auth.currentUser);
    },
    async guardarAtributosInvestigador({ commit }, atributosInvestigador) {
      commit("guardarFichasInvestigador", atributosInvestigador);
    }
  },
  modules: {}
});
