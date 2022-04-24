<script lang="ts">
  import { defineComponent, toRefs } from 'vue';
  import { NDivider } from 'naive-ui';
  import useAppStore from '../../store/appStore';
  import ToolBarComponent from './ToolBar.vue';
  import LoadFileComponent from './LoadFile.vue';

  export default defineComponent({
    components: {
      ToolBarComponent,
      NDivider,
      LoadFileComponent,
    },
    setup() {
      const appStore = useAppStore();
      const { hasData } = toRefs(appStore);
      return { hasData };
    },
  })
</script>

<template>
  <div v-if="hasData">
    <ToolBarComponent />
    <NDivider />
  </div>
  <div v-else>
    <LoadFileComponent />
  </div>
</template>

<style>
    .root-wrapper {
        width: 100%;
        height: 100vh;
    }
</style>