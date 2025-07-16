<template>
  <v-row>
    <v-col cols="12">Grupos</v-col>
    <v-col cols="12">
      <v-virtual-scroll :items="groups" :height="600">
        <template v-slot:default="{ item }">
          <p>{{item.name}}:</p>
          <ul>
            <li v-for="p in item.participants" :key="p.id">
              {{p.value}}
            </li>
          </ul>
          <hr/>
        </template>
      </v-virtual-scroll>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {useAppStore} from '@/stores/app';
import {storeToRefs} from 'pinia';
const store = useAppStore();
const {groups} = storeToRefs(store)
</script>

<style>
</style>
