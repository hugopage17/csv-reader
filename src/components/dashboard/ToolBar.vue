<script lang="ts">
  import { defineComponent, toRefs } from 'vue'
  import { NInput } from 'naive-ui';
  import useAppStore from '../../store/appStore';

  export default defineComponent({
    components: { NInput },
    setup() {
      const appStore = useAppStore();
      const { projectName } = toRefs(appStore);
      return { projectName};
    },
  })
</script>

<template>
  <NInput
    v-model="projectName"
    placeholder="'Project Name'"
  />
</template>

<style>
    .root-wrapper {
        width: 100%;
        height: 100vh;
    }
</style>
