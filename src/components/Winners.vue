<template>
  <v-row>
    <v-col cols="12">
      <div>
        <v-text-field type="number" label="Groups" v-model="n" @change="setGroups" min="2" max="8"/>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-virtual-scroll :items="sorted" :height="600">
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
const n = ref(2)

const setGroups = ()=>{
  store.setGroups(n.value);
}

const sorted = computed(() => {
  const ret = groups.value.sort((a, b) => a.name.localeCompare(b.name));
  console.log(ret);
  return ret
})
</script>

<style>
</style>
