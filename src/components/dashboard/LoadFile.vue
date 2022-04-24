<script lang="ts">
  import { defineComponent, toRefs, ref } from 'vue'
  import { NButton } from 'naive-ui';
  import useAppStore from '../../store/appStore';

  export default defineComponent({
    components: { NButton },
    setup() {
      const appStore = useAppStore();
      const { projectName, fileData } = toRefs(appStore);
      const fileInputRef = ref();
      return { projectName, fileInputRef, fileData };
    },
    updated() {
        console.log(this.fileData);
    },
    methods: {
        browseFile(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result as string;
                    const dataObject: Record<string, string[]> = {};
                    var allArray: string[][] = []
                    data.split('\n').forEach((eachEntry) => {
                        eachEntry.split(',').forEach((entry, entryIdx) => {
                            if (!allArray[entryIdx]) {
                                allArray[entryIdx] = []
                                allArray[entryIdx].push(entry);
                            } else {
                                allArray[entryIdx].push(entry);
                            }
                        })
                    });
                    allArray.forEach((array) => {
                        const key = array.shift().trim();
                        dataObject[key] = [] 
                        array.forEach((item) => {
                            dataObject[key].push(item);
                        });
                    });
                    this.fileData = dataObject; 
                };
                reader.readAsText(file);
            }
        },
    }
  })
</script>

<template>
    <NButton @click="() => fileInputRef.click()">
        Browse
    </NButton>
    <input type="file" ref="fileInputRef" :hidden="true" @change="(e) => browseFile(e)"/>
</template>

<style>
</style>
