<template>
  <v-app>
    <navbar/>
    <v-main>
      <RouterView/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/navbar';

export default {
  name: 'App',
  components: {
    Navbar
  },

  data: () => ({
    //
  }),
};
</script>
