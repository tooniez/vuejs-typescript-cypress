<template>
  <button @click="testClick">+1</button>
  <button @click="addHundred">100</button>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs, computed, ref, toRef, readonly, watchEffect} from 'vue';

export default defineComponent({
  name: 'TestComponent',
  props: ['test'],
  emits: ['close'],
  setup(props, context) {
    console.log('props', props.test);


    const addHundred = () => {
      console.log('addHundred');
      context.emit('close', 1000)
    }


    return {
      addHundred,
    }
  }
});
</script>