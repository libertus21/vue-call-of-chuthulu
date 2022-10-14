import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login.vue'
import inicio from "../views/inicio.vue"
import crearInvestigador from "../views/crearInvestigador.vue"
import LanzarDados from "../views/lanzarDados.vue"
import listaInvestigadores from "../views/listaInvestigadores.vue"
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: inicio
  },
  {
    path: '/investigador',
    name: 'crearInvestigador',
    component: crearInvestigador
  },
  {
    path: '/dados',
    name: 'lanzar-dados',
    component: LanzarDados
  },
  {
    path: '/listaInvestigadores',
    name: 'listaInvestigadores',
    component: listaInvestigadores
  }
]

const router = new Router({
  routes
})

export default router
