<template>
  <v-app id="app">
    <v-content>
      <v-container fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="8"
          >
            <router-view />
          </v-col>
        </v-row>
      </v-container>
      <Snackbar />
    </v-content>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar/Snackbar.vue'
import { exceptions, userActions } from '@/data/constants'
import Service from '@/services/Service'

export default {
  name: 'App',
  components: { Snackbar }
}
</script>

<style>
.error-message {
  color: rgb(202, 60, 60) !important; /* this is a maroon */
}

.hidden {
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
}
</style>
