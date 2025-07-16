<template>
  <v-container class="fill-height">
      <lucky-wheell @winner="weHaveWinner"></lucky-wheell>

      <v-dialog max-width="500" v-model="dialog">
        <template v-slot:default="{ isActive }">
          <v-card title="Toma, toma, toma">
            <v-img
              color="surface-variant"
              height="200"
              src="@/assets/minions.gif"
              cover
            ></v-img>
            <v-card-text>
              {{congratulationsMsg}}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text="Close Dialog"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useAppStore} from '@/stores/app';
const store = useAppStore();
const dialog = ref(false)
const congratulationsMsg = ref('')
const weHaveWinner = (winner)=>{
  //congratulationsMsg.value = `Enhorabuena ${winner.value}, te ha tocado`
  //dialog.value = true;
  store.addWinner(winner);
}
</script>
