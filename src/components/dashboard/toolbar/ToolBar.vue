<script lang="ts">
  import { defineComponent, toRefs } from 'vue'
  import { NInput, NButton, NIcon } from 'naive-ui';
  import { Save, Home } from '@vicons/carbon';
  import useAppStore from '../../../store/appStore';
  import DisplayButtons from './DisplayButtons.vue';

  export default defineComponent({
    components: { NInput, DisplayButtons, NButton, NIcon, Save, Home },
    setup() {
      const appStore = useAppStore();
      const { projectName, fileData, user } = toRefs(appStore);
      return { projectName, fileData, user };
    },
    methods: {
      saveProject() {
        const endpoint = import.meta.env.VITE_API_ENDPOINT;
        fetch(`${endpoint}/project`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          body: JSON.stringify({
            projectName: this.projectName,
            fileData: this.fileData,
            userId: this.user?.uid,
          }),
        }).then((res) => res.json()).then((res) => {
          console.log(res);
        });
      }
    }
  })
</script>

<template>
  <div class="root">
    <NButton circle>
      <template #icon>
        <NIcon @click="() => $router.push('/')"><Home /></NIcon>
      </template>
    </NButton>
    <NInput
      v-model:value="projectName"
      placeholder="Project Name"
    />
    <DisplayButtons/>
    <NButton circle>
      <template #icon>
        <NIcon @click="saveProject"><Save /></NIcon>
      </template>
    </NButton>
  </div>
</template>

<style>
  .root {
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    align-items: center;
  }
</style>
