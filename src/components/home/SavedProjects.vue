<script lang="ts">
    import { defineComponent, toRefs } from 'vue'
    import { NModal, NCard, NButton, NDivider } from 'naive-ui'
    import router from "../../router";
    import useAppStore from '../../store/appStore'
    import type { Project } from '../../store/appStore'

    export default defineComponent({
        components: {
            NModal,
            NCard,
            NButton,
            NDivider
        },
        props: {
            show: {
                type: Boolean,
                default: false,
            },
        },
        setup() {
            const appStore = useAppStore()
            const { savedProjects } = toRefs(appStore);
            return { savedProjects };
        },
        methods: {
            openProject(project: Project) {
                const appStore = useAppStore()
                const { projectName, fileData, hasData } = toRefs(appStore);
                projectName.value = project.projectName;
                fileData.value = project.fileData;
                hasData.value = true;
                router.push('/dashboard');
            },
        }
    })
</script>

<template>
    <NModal v-model:show="show">
        <NCard
            style="width: 600px"
            title="Saved Projects"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
            <div v-if="savedProjects">
                <div
                    v-for="project in savedProjects"
                    :key="project.id"
                    class="each-project"
                >
                    <p>{{ project.projectName }}</p>
                    <NButton @click="() => openProject(project)">
                        Open
                    </NButton>
                </div>
            </div>
            
        </NCard>
    </NModal>
</template>

<style scoped>
    .each-project {
        display: grid;
        grid-template-columns: 1fr auto;
    }
</style>