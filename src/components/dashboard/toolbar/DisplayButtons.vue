<script lang="ts">
    import { NButton, NSpace, NButtonGroup, NIcon } from 'naive-ui';
    import { defineComponent, toRefs } from 'vue';
    import { ChartArea, TableOfContents } from '@vicons/carbon';
    import useAppStore from '../../../store/appStore';

    export default defineComponent({
        components: { NButton, NSpace, NButtonGroup, NIcon, ChartArea, TableOfContents },
        setup(){
            const appStore = useAppStore();
            const { currentDisplay, displayOptions } = toRefs(appStore);
            return { currentDisplay, displayOptions };
        },
        methods: {
            setDisplay(displayOption: string) {
                this.currentDisplay = displayOption;
            },
        }
    })
</script>

<template>
    <NSpace>
        <NButtonGroup size="large">
            <NButton
                @click="setDisplay('Graph')"
                circle
            >
                <template #icon>
                    <NIcon>
                        <ChartArea/>
                    </NIcon>
                </template>
            </NButton>
            <NButton @click="setDisplay('Table')" circle>
                <template #icon>
                    <NIcon>
                        <TableOfContents/>
                    </NIcon>
                </template>
            </NButton>
        </NButtonGroup>
    </NSpace>
</template>
