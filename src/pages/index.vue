<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Hackathon"></v-app-bar>

    <v-main class="">
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="2" xl="2" offset-lg="1">
          <participant-form></participant-form>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="4" xl="4">
          <hello-world></hello-world>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="2" xl="2">
          <winners></winners>
        </v-col>
      </v-row>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>

</script>
