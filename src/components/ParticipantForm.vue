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
      <v-text-field label="Nombre" v-model="text" @keydown.enter="onKeyUp"></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-virtual-scroll :items="participants" :height="600">
        <template v-slot:default="{ item }">
          <v-btn @click="removeMe(item)" icon="mdi-delete"></v-btn>{{ item.value }}
        </template>
      </v-virtual-scroll>
    </v-col>
    <v-col cols="2">
      <v-btn @click="reset">
        Reset
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {useAppStore} from '@/stores/app';
import {storeToRefs} from 'pinia';
const store = useAppStore();

const text = ref("")
const {participants, groups} = storeToRefs(store)
const n = ref(2)

function getDuplicates(arr, key) {
  return arr.filter((item, index, self) =>
      index !== self.findIndex((t) => (
        t[key] === item[key]
      ))
  );
}

function removeMe(current){
  store.removeParticipant(current)
}

const reset = ()=>{
  store.reset()
}

const onKeyUp = (event)=>{
  event.preventDefault()
  if( text.value.trim().length === 0){
    return;
  }
  store.add(text.value)
  let duplicates = getDuplicates(participants.value, 'value');
  while( duplicates.length ){
    duplicates[0].value = duplicates[0].value +"-I";
    duplicates = getDuplicates(participants.value, 'value');
  }
  text.value = ""
}

const setGroups = ()=>{
  store.setGroups(n.value);
}

</script>

<style>
</style>
