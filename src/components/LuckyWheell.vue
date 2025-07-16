<template>
  <div class="wrap" @click="launchWheel">
    <FortuneWheel
      ref="wheel"
      v-model="gift"
      :middle-circle="hasMiddleCircle"
      :img-params="logo"
      :data="participants"
      @done="done"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { FortuneWheel } from 'vue3-fortune-wheel';
import type { Data, ImgParams } from 'vue3-fortune-wheel';
import {useAppStore} from '@/stores/app';
import {storeToRefs} from 'pinia';

const emits = defineEmits(['winner']);

const wheel = ref<InstanceType<typeof FortuneWheel> | null>(null);

const store = useAppStore();
const {participants} = storeToRefs(store);

let gift = store.pickOne;

// Optional: Center image
const logo: ImgParams = {
  src: 'https://jmad.madridjug.es/files/logos/JMad.png',
  width: 100,
  height: 120
};

const hasMiddleCircle = true

const done = (result: Data) => {
  emits('winner', result);
  gift = store.pickOne
}

const launchWheel = () => {
  wheel.value?.spin()
}

</script>

<style>
.wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
