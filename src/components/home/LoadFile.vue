<script lang="ts">
  import { defineComponent, toRefs, ref } from 'vue'
  import { NButton, NIcon, NCard } from 'naive-ui';
  import { CopyFile, Save } from '@vicons/carbon';
  import useAppStore from '../../store/appStore';
  import router from '../../router';
  import type { DataObject } from '../../store/appStore';
  import SavedProjectsComponent from './SavedProjects.vue';

  export default defineComponent({
    components: { NButton, CopyFile, NIcon, Save, SavedProjectsComponent, NCard },
    setup() {
        const appStore = useAppStore();
        const { projectName, fileData, hasData } = toRefs(appStore);
        const fileInputRef = ref();
        const linkRef = ref();
        const showProjects = ref<boolean>(false);
        return { projectName, fileInputRef, fileData, hasData, linkRef, showProjects };
    },
    methods: {
        browseFile(e: any) {
            const file = e?.target?.files[0];
            this.projectName = file?.name;
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e?.target?.result as string;
                    const dataObject: Record<string, DataObject> = {};
                    const allArray: string[][] = []
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
                        const key = array?.shift()?.trim() as string;
                        dataObject[key] = { content: [], enabled: true, axisType: 'y-axis' }
                        array.forEach((item) => {
                            dataObject[key].content.push(item);
                        });
                    });
                    this.fileData = dataObject;
                };
                reader.readAsText(file);
                this.hasData = true;
                router.push('/dashboard');
            }
        },
    }
  })
</script>

<template>
    <NCard class="root">
        <NButton
            @click="() => fileInputRef.click()"
            class="button-selector"
        >
            Browse Local File
            <template #icon>
                <NIcon>
                    <CopyFile/>
                </NIcon>
            </template>
        </NButton>
        <NButton
            @click="showProjects = true"
            class="button-selector"
        >
            Open Saved File
            <template #icon>
                <NIcon>
                    <Save/>
                </NIcon>
            </template>
        </NButton>
        <input
            type="file"
            ref="fileInputRef"
            :hidden="true"
            @change="browseFile"
        />
        <SavedProjectsComponent :show="showProjects"/>
    </NCard>
</template>

<style scoped>
    .root {
        width: 50%;
        position: relative;
        left: 25%;
        bottom: 50%;
        height: 50vh;
    }
    .button-selector {
        height: 25vh;
        margin: 4px;
        font-size: 24px;
        position: relative;
        top: 25%;
    }
</style>
