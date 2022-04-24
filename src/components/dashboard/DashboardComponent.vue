<script lang="ts">
  import { defineComponent } from 'vue'
  import ToolBarComponent from './ToolBar.vue';

  export default defineComponent({
    components: {
      ToolBarComponent,
    },
  })
</script>

<template>
  <ToolBarComponent />
</template>

<style>
    .root-wrapper {
        width: 100%;
        height: 100vh;
    }
</style>