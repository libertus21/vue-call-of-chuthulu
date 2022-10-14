<template>
  <div class="fondo-color">
    <v-layout align-center justify-center>
      <v-container>
        <v-card elevation="2" outlined shaped>
          <v-tabs background-color="#2F4583"></v-tabs>
          <v-card-text>
            <v-toolbar-title class="pb-4">Login </v-toolbar-title>
            <v-form v-model="formulario">
              <v-text-field
                label="Usuario"
                outlined
                prepend-inner-icon="mdi-card-account-details-star"
                v-model="correo"
                :rules="[rules.required, rules.email]"
                color="green"
              >
              </v-text-field>
              <v-text-field
                label="Contraseña"
                outlined
                :type="textPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-alert"
                color="green"
                v-model="contraseña"
                :rules="[rules.required, rules.password]"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="pl-4">
            <v-btn
              :disabled="formulario == false"
              color="#85650D"
              dark
              @click="login()"
            >
              Ingresar
            </v-btn>
            <v-btn
              :disabled="formulario == false"
              color="#2F3D65"
              dark
              @click="registrarse()"
            >
              Registrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      correo: null,
      contraseña: null,
      formulario: false,
      rules: {
        required: value => !!value || "Es obligatorio relleñar el campo.",
        password: value =>
          (value && value.length > 5) ||
          "La contraseña debe tener minimo 6 caracteres.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Correo electronico no valido.";
        }
      },
      textPassword: false,
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("loginFirebase", {
          email: this.correo,
          password: this.contraseña
        });
        this.mensaje("success", "Login exitoso", 1020);
        this.$router.push({ name: "Inicio" });
      } catch (error) {
        this.mensaje("error", "¡Ha ocurrido un error!", 0, error.message);
      }
    },
    mensaje(icono, titulo, tiempo, texto) {
      this.$swal.fire({
        icon: icono,
        title: titulo,
        timer: tiempo,
        text: texto
      });
    },
    async registrarse() {
      try {
        await this.$store.dispatch("registrarFirebase", {
          email: this.correo,
          password: this.contraseña
        });
        this.mensaje(
          "success",
          "¡Registro exitoso!",
          2020,
          "Su cuenta ya ha sido creada, ya puede ingresar al sistema."
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
  },
  computed: {}
};
</script>

<style>
.v-sheet.v-card.v-sheet--shaped {
  background-color: #fffc;
}
.v-application.primary {
  background-color: red !important;
}
</style>
<style scoped>
.fondo-color {
  background-image: linear-gradient(135deg, #8c6f1f 10%, #093775 100%);
  height: 100%;
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
